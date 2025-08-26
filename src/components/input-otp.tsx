'use client';
import { cn } from '@/lib/utils';
import { OTPInput, REGEXP_ONLY_DIGITS, SlotProps } from 'input-otp';
import * as React from 'react';
import type { VerificationState } from '@/types';

interface InputOTPProps {
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
  disabled?: boolean;
  verificationState: VerificationState;
}

export function InputOTP({ 
  value, 
  onChange, 
  maxLength = 6, 
  disabled = false,
  verificationState
}: InputOTPProps) {
  return (
    <OTPInput
      id="otp"
      value={value}
      onChange={onChange}
      maxLength={maxLength}
      pattern={REGEXP_ONLY_DIGITS}
      autoFocus={true}
      disabled={disabled}
      containerClassName="mx-auto"
      render={({ slots }) => {
        const activeIndex = slots.findIndex((slot) => slot.isActive);
        return (
          <div
            data-verification-state={verificationState}
            className={cn(
              "group flex items-center has-[:disabled]:opacity-30",
              "[--slot-width:calc(--spacing(12))] [--slot-gap:calc(--spacing(4))]"
            )}
            style={{ "--left": `calc((var(--slot-width) + var(--slot-gap)) * ${activeIndex}` } as React.CSSProperties}
          >
            <div className="flex gap-(--slot-gap)">
              {slots.map((slot, idx) => (
                <Slot key={idx} {...slot} />
              ))}
            </div>
            {activeIndex !== -1 && (
              <div
                className="absolute top-0 left-(--left) w-(--slot-width) h-14 border-2 border-blue-500 rounded-md pointer-events-none transition-all"
              />
            )}
          </div>
        )
      }}
    />
  );
}

function Slot(props: SlotProps) {
  return (
    <div
      data-active={props.isActive}
      className={cn(
        'relative w-(--slot-width) h-14 text-[2rem]',
        'flex items-center justify-center',
        'transition-all duration-300',
        'border-2 rounded-md',
        'group-hover:border-accent-foreground/20 group-focus-within:border-accent-foreground/20',
        'group-data-[verification-state=success]:border-green-500 group-data-[verification-state=success]:bg-green-50 dark:group-data-[verification-state=success]:bg-green-950/20',
        'group-data-[verification-state=error]:border-red-500 group-data-[verification-state=error]:bg-red-50 dark:group-data-[verification-state=error]:bg-red-950/20 group-data-[verification-state=error]:animate-vibrate',
      )}
    >
      {props.char !== null && <div>{props.char}</div>}
      {props.hasFakeCaret && <FakeCaret />}
    </div>
  )
}

function FakeCaret() {
  return (
    <div className="absolute pointer-events-none inset-0 flex items-center justify-center animate-caret-blink">
      <div className="w-px h-8 bg-white" />
    </div>
  )
}

