## OTP Verification Demo

An interactive OTP input experience built with Next.js. It showcases a custom OTP input component with animated caret, success/error styling, and an error-state vibration animation.

### Features

- **Custom OTP Input**: Built atop `input-otp` with a clean, centered layout
- **Controlled State**: `value` managed in page state and passed to the component
- **Verification Flow**: Simulated 1s server delay; `123456` is the only success OTP
- **Inline Feedback**: Success (green) and error (red) styling applied directly to slots
- **Vibration on Error**: CSS-only side-to-side shake on error state
- **Accessible Button**: Simplified shadcn-style primary button
- **Type-Safe**: Shared `VerificationState` type to avoid duplication

### Live Behavior

- Link: [https://otp-ofcljaved.vercel.app/](https://otp-ofcljaved.vercel.app/)
- Enter any 6 digits and press "Verify OTP".
- The app simulates a 1s verification delay.
- If the value is `123456`, the slots turn green (success). Otherwise, they turn red and vibrate (error).
- State automatically resets to idle after a short delay.

### Project Structure

```
src/
├── app/
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Page with state + verify logic
│   └── globals.css          # Tailwind v4 setup + custom animations
├── components/
│   ├── button.tsx           # Simplified primary button
│   └── input-otp.tsx        # Reusable OTP component with slot styling
├── lib/
│   └── utils.ts             # `cn` utility
└── types/
    └── index.ts             # Shared `VerificationState` type
```

### How It Works

- **State & Verify** (`app/page.tsx`)
  - Keeps `value` in `useState` and passes it to `InputOTP` via `value` and `onChange`.
  - On click of "Verify OTP", simulates a 1s delay, checks value against `123456`, and sets `verificationState` to `'success'` or `'error'`. Resets to `'idle'` after a short timeout.

- **Styling by Data Attribute** (`components/input-otp.tsx`)
  - Applies `data-verification-state` to the parent wrapper of the slots.
  - Uses Tailwind group selectors to style all slots based on the state:
    - `'success'`: `border-green-500` + subtle green background
    - `'error'`: `border-red-500` + subtle red background + vibration animation

- **Animations** (`app/globals.css`)
  - `--animate-caret-blink`: blinking caret used by the active slot
  - `--animate-vibrate`: CSS `@keyframes vibrate` for error shake on x-axis

### Tech

- Next.js 15
- React 19
- Tailwind CSS v4
- `input-otp` for OTP slot behavior

### Scripts

- `npm run dev` – Start dev server
- `npm run build` – Build
- `npm run start` – Start production server
- `npm run lint` – Lint

### Notes

- Success OTP is hardcoded to `123456` for demo purposes.
- Error vibration is implemented with CSS only; no additional animation libs are required.
