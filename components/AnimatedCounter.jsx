import React from "react";

function AnimatedCounter({ value }) {
  const padded = String(value).padStart(3, "0").split("");

  return (
    <div className="flex space-x-1">
      {padded.map((digit, idx) => (
        <DigitColumn key={idx} digit={digit} />
      ))}
      <span className="text-white text-[4rem] font-light"></span>
    </div>
  );
}

function DigitColumn({ digit }) {
  const digits = Array.from({ length: 10 }, (_, i) => i.toString());
  return (
    <div
      className="relative h-[3.2rem] md:h-[4rem] w-[1.7rem] md:w-[2.3rem] overflow-hidden text-white font-light"
      style={{
        fontFamily:
          'ui-monospace, SFMono-Regular, "SF Mono", Monaco, Consolas, monospace',
      }}
    >
      <div
        className="transition-transform duration-300 ease-out"
        style={{ transform: `translateY(-${parseInt(digit) * 4}rem)` }}
      >
        {digits.map((d) => (
          <div
            key={d}
            className="h-[4rem] flex items-center tracking-[1px] justify-center text-[3.4rem] md:text-[4.5rem]"
          >
            {d}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AnimatedCounter;
