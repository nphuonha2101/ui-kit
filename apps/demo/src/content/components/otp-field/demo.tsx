"use client";

import { OTPField } from "@nphuonha/ui-kit";

function OTPFieldDemo() {
  return (
    <div className="mx-auto w-full max-w-sm">
      <OTPField
        label="Verification code"
        description="Enter the 6-digit code we sent to your email."
      />
    </div>
  );
}

function OTPFieldMaskedDemo() {
  return (
    <div className="mx-auto w-full max-w-sm">
      <OTPField
        label="PIN"
        length={4}
        mask
        description="Enter your 4-digit PIN."
        size="lg"
      />
    </div>
  );
}

function OTPFieldErrorDemo() {
  return (
    <div className="mx-auto w-full max-w-sm">
      <OTPField
        label="Verification code"
        defaultValue="123"
        error="That code is incorrect. Try again."
      />
    </div>
  );
}

export const demo = OTPFieldDemo;
export const examples = {
  "otp-field-masked": OTPFieldMaskedDemo,
  "otp-field-error": OTPFieldErrorDemo,
};
