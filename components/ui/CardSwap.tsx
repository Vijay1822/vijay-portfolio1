"use client";

import React, {
  Children,
  forwardRef,
  isValidElement,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  ReactNode,
} from "react";
import { motion, PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import "./CardSwap.css";

export interface CardSwapRef {
  next: () => void;
  prev: () => void;
  goTo: (index: number) => void;
  togglePlayPause: () => void;
  currentIndex: number;
  isPaused: boolean;
}

export interface CardSwapItem {
  id?: string;
  title: string;
  category?: string;
  tagline?: string;
  description?: string;
  image?: string;
  icon?: ReactNode;
  badge?: string;
  techStack?: string[];
  metrics?: { label: string; value: string }[];
  githubUrl?: string;
  liveDemoUrl?: string;
}

export interface CardSwapProps {
  items?: CardSwapItem[];
  children?: ReactNode;
  width?: number | string;
  height?: number | string;
  currentIndex?: number;
  initialIndex?: number;
  onChange?: (index: number) => void;
  onCardClick?: (index: number) => void;
  autoplay?: boolean;
  autoAdvanceInterval?: number; // Configurable interval in ms (default: 6000)
  pauseOnHover?: boolean;
  draggable?: boolean;
  showControls?: boolean;
  showSideControls?: boolean;
  showPagination?: boolean;
  showProgressBar?: boolean;
  adjacentPreviews?: boolean;
  cardRadius?: number;
  className?: string;
}

export const Card = forwardRef<
  HTMLDivElement,
  {
    className?: string;
    children: ReactNode;
    onClick?: () => void;
  }
>(({ className = "", children, onClick, ...rest }, ref) => (
  <div
    ref={ref}
    onClick={onClick}
    className={`card-swap-card-inner ${className}`}
    {...rest}
  >
    {children}
  </div>
));
Card.displayName = "Card";

export const CardSwap = forwardRef<CardSwapRef, CardSwapProps>(
  (
    {
      items,
      children,
      currentIndex: controlledIndex,
      initialIndex = 0,
      onChange,
      onCardClick,
      autoplay = true,
      autoAdvanceInterval = 6000, // 6-second default configurable auto-swap interval
      pauseOnHover = true,
      draggable = true,
      showControls = true,
      showSideControls = true,
      showPagination = true,
      showProgressBar = true,
      adjacentPreviews = true,
      cardRadius = 24,
      className = "",
    },
    ref
  ) => {
    // Collect child cards or build cards from items
    const cards = useMemo(() => {
      const childArray = Children.toArray(children).filter(isValidElement);
      if (childArray.length > 0) return childArray;
      if (items && items.length > 0) {
        return items.map((item, idx) => (
          <Card key={item.id ?? `item-${idx}`}>
            <div className="p-6">
              <h3 className="text-xl font-bold text-[#F8FAFC]">{item.title}</h3>
              {item.description && (
                <p className="mt-2 text-sm text-[#A7B4C7]">{item.description}</p>
              )}
            </div>
          </Card>
        ));
      }
      return [];
    }, [children, items]);

    const totalCount = cards.length;
    const [internalIndex, setInternalIndex] = useState(
      Math.min(Math.max(0, initialIndex), Math.max(0, totalCount - 1))
    );
    const [direction, setDirection] = useState<1 | -1>(1);

    // Interaction & visibility states for pause management
    const [isHovered, setIsHovered] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);
    const [isInView, setIsInView] = useState(true);
    const [isTabVisible, setIsTabVisible] = useState(true);
    const [isReducedMotion, setIsReducedMotion] = useState(false);
    const [progressKey, setProgressKey] = useState<number>(0);

    const containerRef = useRef<HTMLDivElement | null>(null);
    const dragStartedAt = useRef<number>(0);
    const lastActionTimestamp = useRef<number>(0);

    const activeIndex = controlledIndex !== undefined ? controlledIndex : internalIndex;

    // Detect prefers-reduced-motion
    useEffect(() => {
      if (typeof window === "undefined") return;
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setIsReducedMotion(mediaQuery.matches);
      if (mediaQuery.matches) {
        setIsAutoplayPaused(true);
      }
      const listener = (e: MediaQueryListEvent) => {
        setIsReducedMotion(e.matches);
        if (e.matches) setIsAutoplayPaused(true);
      };
      mediaQuery.addEventListener("change", listener);
      return () => mediaQuery.removeEventListener("change", listener);
    }, []);

    // Track tab visibility
    useEffect(() => {
      const handleVisibilityChange = () => {
        setIsTabVisible(document.visibilityState === "visible");
      };
      document.addEventListener("visibilitychange", handleVisibilityChange);
      return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
    }, []);

    // Track viewport intersection
    useEffect(() => {
      const el = containerRef.current;
      if (!el || typeof IntersectionObserver === "undefined") return;

      const observer = new IntersectionObserver(
        (entries) => {
          setIsInView(entries[0]?.isIntersecting ?? true);
        },
        { threshold: 0.25 }
      );
      observer.observe(el);
      return () => observer.disconnect();
    }, []);

    // Protected navigation functions with debounce against rapid clicks
    const canTransition = useCallback(() => {
      const now = performance.now();
      if (now - lastActionTimestamp.current < 260) {
        return false;
      }
      lastActionTimestamp.current = now;
      return true;
    }, []);

    const resetAutoplayTimer = useCallback(() => {
      setProgressKey((k) => k + 1);
    }, []);

    const goTo = useCallback(
      (newIndex: number) => {
        if (totalCount === 0 || !canTransition()) return;
        const boundedIndex = (newIndex + totalCount) % totalCount;
        setDirection(boundedIndex >= activeIndex ? 1 : -1);
        if (controlledIndex === undefined) {
          setInternalIndex(boundedIndex);
        }
        onChange?.(boundedIndex);
        resetAutoplayTimer();
      },
      [activeIndex, canTransition, controlledIndex, onChange, resetAutoplayTimer, totalCount]
    );

    const next = useCallback(() => {
      if (totalCount <= 1 || !canTransition()) return;
      setDirection(1);
      const nextIndex = (activeIndex + 1) % totalCount;
      if (controlledIndex === undefined) {
        setInternalIndex(nextIndex);
      }
      onChange?.(nextIndex);
      resetAutoplayTimer();
    }, [activeIndex, canTransition, controlledIndex, onChange, resetAutoplayTimer, totalCount]);

    const prev = useCallback(() => {
      if (totalCount <= 1 || !canTransition()) return;
      setDirection(-1);
      const prevIndex = (activeIndex - 1 + totalCount) % totalCount;
      if (controlledIndex === undefined) {
        setInternalIndex(prevIndex);
      }
      onChange?.(prevIndex);
      resetAutoplayTimer();
    }, [activeIndex, canTransition, controlledIndex, onChange, resetAutoplayTimer, totalCount]);

    const togglePlayPause = useCallback(() => {
      setIsAutoplayPaused((paused) => {
        const nextState = !paused;
        if (!nextState) {
          resetAutoplayTimer();
        }
        return nextState;
      });
    }, [resetAutoplayTimer]);

    useImperativeHandle(
      ref,
      () => ({
        next,
        prev,
        goTo,
        togglePlayPause,
        currentIndex: activeIndex,
        isPaused: isAutoplayPaused,
      }),
      [next, prev, goTo, togglePlayPause, activeIndex, isAutoplayPaused]
    );

    // Effective pause state considering hover, drag, visibility, and user pause
    const isEffectivelyPaused =
      !autoplay ||
      isAutoplayPaused ||
      (pauseOnHover && isHovered) ||
      isDragging ||
      !isInView ||
      !isTabVisible ||
      (isReducedMotion && isAutoplayPaused);

    // Configurable Autoplay Timer
    useEffect(() => {
      if (isEffectivelyPaused || totalCount <= 1) return;

      const timer = window.setTimeout(() => {
        next();
      }, Math.max(2000, autoAdvanceInterval));

      return () => clearTimeout(timer);
    }, [autoAdvanceInterval, isEffectivelyPaused, next, progressKey, totalCount]);

    // Keyboard navigation: ArrowLeft and ArrowRight when carousel is in view
    useEffect(() => {
      const handleGlobalKeyDown = (e: KeyboardEvent) => {
        const active = document.activeElement;
        // Don't intercept if user is typing into an input, terminal, or chatbot
        if (
          active &&
          (active.tagName === "INPUT" ||
            active.tagName === "TEXTAREA" ||
            active.getAttribute("contenteditable") === "true" ||
            active.closest("[role='dialog']") ||
            active.closest("#terminal-window") ||
            active.closest("#ai-assistant-modal"))
        ) {
          return;
        }

        if (!isInView) return;

        if (e.key === "ArrowRight") {
          e.preventDefault();
          next();
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          prev();
        }
      };

      window.addEventListener("keydown", handleGlobalKeyDown);
      return () => window.removeEventListener("keydown", handleGlobalKeyDown);
    }, [isInView, next, prev]);

    // Drag / Touch-Swipe handling
    const handleDragStart = () => {
      setIsDragging(true);
      dragStartedAt.current = performance.now();
    };

    const handleDragEnd = (
      _e: MouseEvent | TouchEvent | PointerEvent,
      info: PanInfo
    ) => {
      const offsetX = info.offset.x;
      const velocityX = info.velocity.x;
      setTimeout(() => setIsDragging(false), 50);

      const threshold = 45;
      const velocityThreshold = 350;

      if (offsetX < -threshold || velocityX < -velocityThreshold) {
        next();
      } else if (offsetX > threshold || velocityX > velocityThreshold) {
        prev();
      }
    };

    // Calculate relative slot positions: pure horizontal alignment, zero rotation, zero skew
    const getSlotState = (idx: number) => {
      let offset = idx - activeIndex;

      // Handle circular wrapping for adjacent previews
      if (totalCount > 2) {
        if (offset > totalCount / 2) offset -= totalCount;
        if (offset < -totalCount / 2) offset += totalCount;
      }

      if (offset === 0) {
        return {
          x: "0%",
          scale: 1,
          opacity: 1,
          zIndex: 20,
          pointerEvents: "auto" as const,
          isActive: true,
          isPreview: false,
          visible: true,
        };
      }

      if (offset === 1 && adjacentPreviews) {
        return {
          x: "calc(102% + 20px)",
          scale: 0.94,
          opacity: 0.35,
          zIndex: 10,
          pointerEvents: "auto" as const,
          isActive: false,
          isPreview: true,
          visible: true,
        };
      }

      if (offset === -1 && adjacentPreviews) {
        return {
          x: "calc(-102% - 20px)",
          scale: 0.94,
          opacity: 0.35,
          zIndex: 10,
          pointerEvents: "auto" as const,
          isActive: false,
          isPreview: true,
          visible: true,
        };
      }

      return {
        x: offset > 0 ? "160%" : "-160%",
        scale: 0.9,
        opacity: 0,
        zIndex: 0,
        pointerEvents: "none" as const,
        isActive: false,
        isPreview: false,
        visible: false,
      };
    };

    if (totalCount === 0) return null;

    // Smooth horizontal spring transition (380ms)
    const springTransition = {
      type: "spring",
      stiffness: 320,
      damping: 32,
      mass: 0.8,
    };

    return (
      <div
        ref={containerRef}
        className={`card-swap-wrapper ${className}`}
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-label="Straight card swap project showcase"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Stage Container: Flat viewport with zero 3D perspective distortion */}
        <div className="card-swap-stage w-full relative overflow-visible flex items-center justify-center">
          {/* Side Navigation Controls (Desktop): vertically centered at card sides */}
          {showSideControls && totalCount > 1 && (
            <>
              <button
                type="button"
                onClick={prev}
                aria-label="Previous project"
                title="Previous project (←)"
                className="card-swap-side-btn card-swap-side-btn-prev group"
              >
                <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
              </button>

              <button
                type="button"
                onClick={next}
                aria-label="Next project"
                title="Next project (→)"
                className="card-swap-side-btn card-swap-side-btn-next group"
              >
                <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </>
          )}

          {/* Cards Track */}
          {cards.map((card, idx) => {
            const slot = getSlotState(idx);
            if (!slot.visible && Math.abs(idx - activeIndex) > 1 && totalCount > 3) {
              return null;
            }

            return (
              <motion.div
                key={idx}
                className="card-swap-card-slot"
                data-active={slot.isActive}
                data-preview={slot.isPreview}
                style={{
                  position: slot.isActive ? "relative" : "absolute",
                  borderRadius: `${cardRadius}px`,
                  zIndex: slot.zIndex,
                  pointerEvents: slot.pointerEvents,
                }}
                animate={{
                  x: slot.x,
                  scale: slot.scale,
                  opacity: slot.opacity,
                  rotate: 0, // Zero default rotation (strictly straight)
                  skewX: 0, // Zero skew
                  skewY: 0, // Zero skew
                }}
                transition={springTransition}
                drag={slot.isActive && draggable ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.16}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onClick={() => {
                  if (isDragging) return;
                  if (slot.isPreview) {
                    goTo(idx);
                  } else if (slot.isActive) {
                    onCardClick?.(idx);
                  }
                }}
              >
                {card}
              </motion.div>
            );
          })}
        </div>

        {/* Carousel Controls Bar */}
        {showControls && (
          <div className="card-swap-controls">
            {/* Top Row: Autoplay Progress Bar (if enabled) */}
            {showProgressBar && autoplay && totalCount > 1 && (
              <div
                className="card-swap-progress-track"
                title={
                  isEffectivelyPaused
                    ? "Autoplay paused (hover/manual pause)"
                    : `Advancing automatically every ${Math.round(autoAdvanceInterval / 1000)}s`
                }
              >
                <motion.div
                  key={progressKey}
                  className="card-swap-progress-bar"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: isEffectivelyPaused ? 0 : 1 }}
                  transition={{
                    duration: isEffectivelyPaused ? 0 : autoAdvanceInterval / 1000,
                    ease: "linear",
                  }}
                />
              </div>
            )}

            {/* Main Controls Row */}
            <div className="card-swap-controls-inner">
              {/* Previous Button (Mobile/Bottom accessible) */}
              <button
                type="button"
                onClick={prev}
                disabled={totalCount <= 1}
                aria-label="Previous project"
                title="Previous project"
                className="card-swap-nav-btn group"
              >
                <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
              </button>

              {/* Play / Pause Toggle Button */}
              {autoplay && totalCount > 1 && (
                <button
                  type="button"
                  onClick={togglePlayPause}
                  aria-label={isAutoplayPaused ? "Resume automatic advancement" : "Pause automatic advancement"}
                  title={isAutoplayPaused ? "Resume auto-swap" : "Pause auto-swap"}
                  className="card-swap-play-btn"
                >
                  {isAutoplayPaused ? (
                    <Play className="w-3.5 h-3.5 ml-0.5 fill-current" />
                  ) : (
                    <Pause className="w-3.5 h-3.5 fill-current" />
                  )}
                </button>
              )}

              {/* Position Counter */}
              <span className="card-swap-counter">
                {String(activeIndex + 1).padStart(2, "0")} / {String(totalCount).padStart(2, "0")}
              </span>

              {/* Pagination Dots */}
              {showPagination && (
                <div className="card-swap-pagination hidden sm:flex" role="tablist" aria-label="Project slides">
                  {cards.map((_, dotIdx) => (
                    <button
                      key={dotIdx}
                      type="button"
                      role="tab"
                      aria-selected={dotIdx === activeIndex}
                      aria-label={`Jump to project ${dotIdx + 1}`}
                      data-active={dotIdx === activeIndex}
                      onClick={() => goTo(dotIdx)}
                      className="card-swap-dot"
                    />
                  ))}
                </div>
              )}

              {/* Next Button (Mobile/Bottom accessible) */}
              <button
                type="button"
                onClick={next}
                disabled={totalCount <= 1}
                aria-label="Next project"
                title="Next project"
                className="card-swap-nav-btn group"
              >
                <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
);

CardSwap.displayName = "CardSwap";
export default CardSwap;
