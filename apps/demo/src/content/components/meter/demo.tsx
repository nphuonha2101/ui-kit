"use client";

import { Meter } from "@nphuonha/ui-kit";

function MeterDemo() {
  return (
    <div className="mx-auto w-full max-w-sm">
      <Meter value={72} label="Storage used" showValue />
    </div>
  );
}

function MeterThresholdsDemo() {
  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-5">
      <Meter value={28} low={40} high={75} optimum={30} label="Healthy" showValue />
      <Meter value={58} low={40} high={75} optimum={30} label="Watch" showValue />
      <Meter value={92} low={40} high={75} optimum={30} label="Over quota" showValue />
    </div>
  );
}

function MeterSizesDemo() {
  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-5">
      <Meter
        value={4.2}
        max={10}
        size="sm"
        label="Upload"
        showValue
        formatValue={(_, value) => `${value} GB`}
      />
      <Meter
        value={7.8}
        max={10}
        label="Storage"
        showValue
        formatValue={(_, value) => `${value} GB of 10 GB`}
      />
      <Meter
        value={1250}
        max={2000}
        size="lg"
        label="Monthly requests"
        showValue
        formatValue={(_, value) => value.toLocaleString()}
      />
    </div>
  );
}

export const demo = MeterDemo;
export const examples = {
  "meter-thresholds": MeterThresholdsDemo,
  "meter-sizes": MeterSizesDemo,
};
