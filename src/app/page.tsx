'use client';

import { InputOTP } from '@/components/input-otp';
import { Button } from '@/components/button';
import * as React from 'react';
import type { VerificationState } from '@/types';

export default function Page() {
  const [value, setValue] = React.useState("");
  const [verificationState, setVerificationState] = React.useState<VerificationState>('idle');

  const handleVerify = async () => {
    if (value.length !== 6) return;
    
    setVerificationState('loading');
    await new Promise(resolve => setTimeout(resolve, 1000));
    const isSuccess = value === '123456';
    setVerificationState(isSuccess ? 'success' : 'error');
    setTimeout(() => setVerificationState('idle'), 2000);
  };

  return (
    <div className="w-full max-w-md grid gap-6 p-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold">Enter OTP</h1>
        <p className="text-muted-foreground">
          Please enter the 6-digit code sent to your device
        </p>
      </div>
      
        <InputOTP
          value={value}
          onChange={setValue}
          maxLength={6}
          disabled={verificationState === 'loading'}
          verificationState={verificationState}
        />
      
      <Button
        onClick={handleVerify}
        disabled={value.length !== 6 || verificationState === 'loading'}
        className="w-full"
      >
        {verificationState === 'loading' ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent" />
            Verifying...
          </>
        ) : (
          'Verify OTP'
        )}
      </Button>
    </div>
  );
}
