"use client";

import React, { useState, useEffect, useId } from "react";
import {
  Fan,
  Thermometer,
  Sliders,
  RotateCcw,
  Activity,
  Zap,
  Info,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

interface TelemetryPoint {
  time: string;
  temp: number;
  pwm: number;
  duty: number;
}

export function IotFanSimulator() {
  const [baseTemp, setBaseTemp] = useState<number>(26);
  const [threshold, setThreshold] = useState<number>(28);
  const [hysteresis] = useState<number>(1.5);
  const [noiseEnabled, setNoiseEnabled] = useState<boolean>(false);
  const [noiseOffset, setNoiseOffset] = useState<number>(0);
  const [isFanRunning, setIsFanRunning] = useState<boolean>(false);
  const [telemetry, setTelemetry] = useState<TelemetryPoint[]>([]);

  const tempSliderId = useId();
  const thresholdSliderId = useId();

  // Simulate subtle sensor reading noise (analog/quantization jitter ±0.4°C)
  useEffect(() => {
    if (!noiseEnabled) {
      setNoiseOffset(0);
      return;
    }
    const interval = setInterval(() => {
      // Gaussian-like pseudo-random jitter between -0.4 and +0.4
      const jitter = (Math.random() - 0.5) * 0.8;
      setNoiseOffset(parseFloat(jitter.toFixed(2)));
    }, 1200);

    return () => clearInterval(interval);
  }, [noiseEnabled]);

  const effectiveTemp = parseFloat((baseTemp + noiseOffset).toFixed(1));

  // Closed-loop control logic with 1.5°C hysteresis
  // Activation: Temp >= Threshold
  // Deactivation: Temp < (Threshold - Hysteresis)
  useEffect(() => {
    const deactivationPoint = threshold - hysteresis;

    if (!isFanRunning && effectiveTemp >= threshold) {
      setIsFanRunning(true);
    } else if (isFanRunning && effectiveTemp < deactivationPoint) {
      setIsFanRunning(false);
    }
  }, [effectiveTemp, threshold, hysteresis, isFanRunning]);

  // PWM calculation:
  // When running, linearly maps between deactivationPoint and maxTemp (42°C)
  const maxTemp = 42;
  const deactivationPoint = threshold - hysteresis;

  let pwm = 0;
  let dutyCycle = 0;
  let fanState: "OFF" | "LOW" | "MEDIUM" | "HIGH" = "OFF";

  if (isFanRunning) {
    const normalized = Math.min(
      1,
      Math.max(0.2, (effectiveTemp - deactivationPoint) / (maxTemp - deactivationPoint))
    );
    pwm = Math.round(normalized * 255);
    dutyCycle = Math.round((pwm / 255) * 100);

    if (pwm < 115) {
      fanState = "LOW";
    } else if (pwm < 195) {
      fanState = "MEDIUM";
    } else {
      fanState = "HIGH";
    }
  }

  // Update real-time rolling telemetry history
  useEffect(() => {
    const timestamp = new Date().toLocaleTimeString([], {
      minute: "2-digit",
      second: "2-digit",
    });

    setTelemetry((prev) => {
      const next = [...prev, { time: timestamp, temp: effectiveTemp, pwm, duty: dutyCycle }];
      return next.slice(-12); // keep last 12 readings
    });
  }, [effectiveTemp, pwm, dutyCycle]);

  const handleReset = () => {
    setBaseTemp(26);
    setThreshold(28);
    setNoiseEnabled(false);
    setNoiseOffset(0);
  };

  // Dynamic fan rotor spin animation duration in seconds
  const spinDuration = isFanRunning
    ? Math.max(0.18, 1.4 - (pwm / 255) * 1.15)
    : 0;

  return (
    <div className="rounded-2xl bg-[#091120] border border-[rgba(34,211,238,0.22)] p-5 sm:p-6 text-[#F8FAFC] shadow-xl">
      {/* Simulation Banner Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-[rgba(148,163,184,0.12)]">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-[#17253B] text-[#22D3EE] border border-[rgba(34,211,238,0.3)] mb-1.5">
            <Activity className="w-3 h-3 animate-pulse text-[#22D3EE]" />
            <span>INTERACTIVE HARDWARE SIMULATION</span>
          </div>
          <h4 className="text-base sm:text-lg font-bold text-[#F8FAFC]">
            Closed-Loop PWM Fan &amp; Hysteresis Controller
          </h4>
          <p className="text-xs text-[#A7B4C7]">
            Simulates the Arduino C++ firmware logic operating on the NodeMCU (ESP8266) &amp; DHT22 hardware.
          </p>
        </div>

        <button
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-[#A7B4C7] hover:text-[#F8FAFC] bg-[#0E1A2E] hover:bg-[#15243E] border border-[rgba(148,163,184,0.15)] active:scale-95 transition-all w-fit"
          title="Reset simulation parameters to default baseline"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Defaults</span>
        </button>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Interactive Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Temperature Slider */}
          <div className="p-4 rounded-xl bg-[#0E1A2E] border border-[rgba(148,163,184,0.12)]">
            <div className="flex items-center justify-between mb-2">
              <label
                htmlFor={tempSliderId}
                className="text-xs font-semibold text-[#A7B4C7] flex items-center gap-1.5"
              >
                <Thermometer className="w-3.5 h-3.5 text-[#22D3EE]" />
                <span>Ambient Temperature (Simulated DHT22)</span>
              </label>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold font-mono text-[#22D3EE]">
                  {effectiveTemp}°C
                </span>
                {noiseOffset !== 0 && (
                  <span className="text-[10px] font-mono text-[#F59E0B]">
                    ({noiseOffset > 0 ? `+${noiseOffset}` : noiseOffset}°C jitter)
                  </span>
                )}
              </div>
            </div>

            <input
              id={tempSliderId}
              type="range"
              min="15"
              max="50"
              step="0.5"
              value={baseTemp}
              onChange={(e) => setBaseTemp(parseFloat(e.target.value))}
              aria-label="Simulated ambient temperature slider"
              aria-valuemin={15}
              aria-valuemax={50}
              aria-valuenow={effectiveTemp}
              className="w-full h-2 rounded-lg bg-[#17253B] appearance-none cursor-pointer accent-[#22D3EE] focus:outline-none focus:ring-2 focus:ring-[#22D3EE]/40"
            />

            <div className="flex justify-between text-[10px] font-mono text-[#64748B] mt-1">
              <span>15°C (Cool)</span>
              <span>28°C (Threshold)</span>
              <span>50°C (Extreme)</span>
            </div>

            {/* Quick Test Presets */}
            <div className="mt-3 pt-3 border-t border-[rgba(148,163,184,0.08)] flex flex-wrap items-center gap-1.5">
              <span className="text-[10px] text-[#64748B] font-mono mr-1">Presets:</span>
              <button
                type="button"
                onClick={() => setBaseTemp(21)}
                className={`px-2 py-1 rounded-lg text-[10px] font-mono border transition-all ${
                  baseTemp === 21
                    ? "bg-[#22D3EE]/20 text-[#22D3EE] border-[#22D3EE]"
                    : "bg-[#091120] text-[#A7B4C7] border-[rgba(148,163,184,0.15)] hover:text-white"
                }`}
              >
                21°C (Sub-threshold)
              </button>
              <button
                type="button"
                onClick={() => setBaseTemp(29)}
                className={`px-2 py-1 rounded-lg text-[10px] font-mono border transition-all ${
                  baseTemp === 29
                    ? "bg-[#F59E0B]/20 text-[#F59E0B] border-[#F59E0B]"
                    : "bg-[#091120] text-[#A7B4C7] border-[rgba(148,163,184,0.15)] hover:text-white"
                }`}
              >
                29°C (Trigger ON)
              </button>
              <button
                type="button"
                onClick={() => setBaseTemp(39)}
                className={`px-2 py-1 rounded-lg text-[10px] font-mono border transition-all ${
                  baseTemp === 39
                    ? "bg-[#EF4444]/20 text-[#EF4444] border-[#EF4444]"
                    : "bg-[#091120] text-[#A7B4C7] border-[rgba(148,163,184,0.15)] hover:text-white"
                }`}
              >
                39°C (Max RPM)
              </button>
            </div>
          </div>

          {/* Configurable Threshold & Hysteresis */}
          <div className="p-4 rounded-xl bg-[#0E1A2E] border border-[rgba(148,163,184,0.12)]">
            <div className="flex items-center justify-between mb-2">
              <label
                htmlFor={thresholdSliderId}
                className="text-xs font-semibold text-[#A7B4C7] flex items-center gap-1.5"
              >
                <Sliders className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span>Activation Threshold (T_act)</span>
              </label>
              <span className="text-sm font-bold font-mono text-[#F59E0B]">
                {threshold}°C
              </span>
            </div>

            <input
              id={thresholdSliderId}
              type="range"
              min="22"
              max="35"
              step="0.5"
              value={threshold}
              onChange={(e) => setThreshold(parseFloat(e.target.value))}
              aria-label="Fan activation threshold"
              aria-valuemin={22}
              aria-valuemax={35}
              aria-valuenow={threshold}
              className="w-full h-2 rounded-lg bg-[#17253B] appearance-none cursor-pointer accent-[#F59E0B] focus:outline-none focus:ring-2 focus:ring-[#F59E0B]/40"
            />

            {/* Hysteresis Math Breakdown */}
            <div className="mt-3 p-2.5 rounded-lg bg-[#091120] border border-[rgba(148,163,184,0.08)] text-[11px] font-mono text-[#A7B4C7] flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <span>Turn ON Threshold:</span>
                <span className="text-[#38D9E8] font-bold">≥ {threshold.toFixed(1)}°C</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Turn OFF Threshold (Hysteresis -1.5°C):</span>
                <span className="text-[#F59E0B] font-bold">&lt; {(threshold - hysteresis).toFixed(1)}°C</span>
              </div>
              <div className="text-[10px] text-[#64748B] mt-0.5">
                * Prevents rapid on/off oscillation (relay chatter) near the boundary.
              </div>
            </div>
          </div>

          {/* Sensor Noise Toggle */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-[#0E1A2E] border border-[rgba(148,163,184,0.12)]">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#22D3EE]" />
              <div>
                <div className="text-xs font-semibold text-[#F8FAFC]">Simulate Sensor Noise (±0.4°C)</div>
                <div className="text-[10px] text-[#64748B]">
                  Models physical DHT22 quantization noise &amp; ambient thermal drift
                </div>
              </div>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={noiseEnabled}
              onClick={() => setNoiseEnabled(!noiseEnabled)}
              className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#22D3EE] ${
                noiseEnabled ? "bg-[#22D3EE]" : "bg-[#1E293B]"
              }`}
            >
              <span
                aria-hidden="true"
                className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                  noiseEnabled ? "translate-x-4" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Right Column: Visual Fan Actuator & Telemetry Readout (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Visual Fan Motor Card */}
          <div className="p-5 rounded-xl bg-[#0E1A2E] border border-[rgba(148,163,184,0.12)] flex flex-col items-center justify-center relative overflow-hidden">
            {/* Fan Status Indicator Badge */}
            <div className="w-full flex items-center justify-between mb-4">
              <span className="text-xs font-mono font-medium text-[#64748B]">MOTOR ACTUATOR</span>
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-bold tracking-wider ${
                  fanState === "OFF"
                    ? "bg-slate-800 text-slate-400 border border-slate-700"
                    : fanState === "LOW"
                    ? "bg-cyan-950 text-cyan-300 border border-cyan-700"
                    : fanState === "MEDIUM"
                    ? "bg-amber-950 text-amber-300 border border-amber-700"
                    : "bg-rose-950 text-rose-300 border border-rose-700 animate-pulse"
                }`}
              >
                STATUS: {fanState}
              </span>
            </div>

            {/* Rotating Fan SVG Visual */}
            <div className="relative w-32 h-32 flex items-center justify-center my-2">
              {/* Outer Protective Grille */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-[rgba(148,163,184,0.25)]" />
              <div className="absolute inset-2 rounded-full border border-[rgba(148,163,184,0.15)]" />

              {/* Fan Rotor */}
              <div
                className="w-24 h-24 flex items-center justify-center transition-all"
                style={{
                  animation: isFanRunning ? `spin ${spinDuration}s linear infinite` : "none",
                }}
              >
                <Fan
                  className={`w-20 h-20 transition-colors ${
                    fanState === "OFF"
                      ? "text-slate-600"
                      : fanState === "LOW"
                      ? "text-[#22D3EE]"
                      : fanState === "MEDIUM"
                      ? "text-[#F59E0B]"
                      : "text-[#EF4444]"
                  }`}
                />
              </div>

              {/* Center Hub */}
              <div className="absolute w-6 h-6 rounded-full bg-[#091120] border-2 border-[#22D3EE] flex items-center justify-center">
                <div
                  className={`w-2 h-2 rounded-full ${
                    isFanRunning ? "bg-[#22D3EE] animate-ping" : "bg-slate-600"
                  }`}
                />
              </div>
            </div>

            {/* Simulated PWM Telemetry Box */}
            <div className="w-full mt-4 grid grid-cols-2 gap-2 text-center">
              <div className="p-2.5 rounded-lg bg-[#091120] border border-[rgba(148,163,184,0.08)]">
                <div className="text-[10px] font-mono text-[#64748B]">PWM VALUE (8-bit)</div>
                <div className="text-lg font-bold font-mono text-[#22D3EE]">
                  {pwm} <span className="text-xs font-normal text-[#64748B]">/ 255</span>
                </div>
              </div>
              <div className="p-2.5 rounded-lg bg-[#091120] border border-[rgba(148,163,184,0.08)]">
                <div className="text-[10px] font-mono text-[#64748B]">DUTY CYCLE</div>
                <div className="text-lg font-bold font-mono text-[#F59E0B]">
                  {dutyCycle}%
                </div>
              </div>
            </div>
          </div>

          {/* Rolling Telemetry History Mini-Chart */}
          <div className="p-4 rounded-xl bg-[#0E1A2E] border border-[rgba(148,163,184,0.12)]">
            <div className="flex items-center justify-between text-xs font-semibold text-[#A7B4C7] mb-2">
              <span className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span>Live Telemetry Stream</span>
              </span>
              <span className="text-[10px] font-mono text-[#64748B]">
                {telemetry.length} readings
              </span>
            </div>

            {/* SVG Telemetry Polyline */}
            <div className="h-20 w-full bg-[#091120] rounded-lg p-2 border border-[rgba(148,163,184,0.08)] flex items-end">
              {telemetry.length > 1 ? (
                <div className="w-full h-full flex items-end gap-1.5 pt-2">
                  {telemetry.map((pt, i) => {
                    const heightPercent = Math.min(100, Math.max(10, (pt.temp / 50) * 100));
                    const isOver = pt.temp >= threshold;
                    return (
                      <div
                        key={i}
                        className="flex-1 flex flex-col items-center justify-end h-full group relative"
                      >
                        <div
                          style={{ height: `${heightPercent}%` }}
                          className={`w-full rounded-t transition-all ${
                            isOver ? "bg-[#22D3EE]" : "bg-slate-700"
                          }`}
                        />
                        {/* Hover Tooltip */}
                        <div className="absolute bottom-full mb-1 hidden group-hover:block z-20 px-1.5 py-0.5 rounded bg-black/90 text-[9px] font-mono text-white whitespace-nowrap border border-slate-700">
                          {pt.temp}°C | {pt.duty}% PWM
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[10px] font-mono text-[#64748B]">
                  Streaming sensor telemetry...
                </div>
              )}
            </div>
            <div className="flex justify-between items-center text-[9px] font-mono text-[#64748B] mt-1.5">
              <span>Cyan = Temperature Active</span>
              <span>Slate = Sub-threshold</span>
            </div>
          </div>
        </div>
      </div>

      {/* Firmware Control Logic Documentation */}
      <div className="mt-6 pt-4 border-t border-[rgba(148,163,184,0.12)] bg-[#0A1324] rounded-xl p-4">
        <h5 className="text-xs font-bold text-[#F8FAFC] flex items-center gap-1.5 mb-2">
          <Info className="w-3.5 h-3.5 text-[#22D3EE]" />
          <span>Embedded Firmware Mathematics (ESP8266 Arduino C++)</span>
        </h5>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-[11px] text-[#A7B4C7]">
          <div className="p-2.5 rounded-lg bg-[#0E1A2E] border border-[rgba(148,163,184,0.08)]">
            <span className="font-bold text-[#22D3EE] block mb-0.5">1. Hysteresis Loop</span>
            <span>
              If state is OFF, turn ON when <code>T ≥ {threshold}°C</code>. If ON, turn OFF only when <code>T &lt; {(threshold - hysteresis).toFixed(1)}°C</code>.
            </span>
          </div>
          <div className="p-2.5 rounded-lg bg-[#0E1A2E] border border-[rgba(148,163,184,0.08)]">
            <span className="font-bold text-[#F59E0B] block mb-0.5">2. Proportional PWM</span>
            <span>
              <code>PWM = clamp(round(((T - T_off) / (42 - T_off)) * 255), 0, 255)</code> modulates MOSFET gate voltage.
            </span>
          </div>
          <div className="p-2.5 rounded-lg bg-[#0E1A2E] border border-[rgba(148,163,184,0.08)]">
            <span className="font-bold text-[#34D399] block mb-0.5">3. Energy Savings</span>
            <span>
              Avoids full-speed 100% dissipation during mild room temperature periods, saving ~34% electrical load.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
