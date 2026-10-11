"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode, useState, useEffect } from "react";

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <motion.div
      key={pathname}
      initial={hasMounted ? { opacity: 0.85, y: 3 } : false}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0.85, y: -3 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className="w-full flex-1"
    >
      {children}
    </motion.div>
  );
}
