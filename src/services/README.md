# Services

API / backend integration layer (ports the empty `Services/` folder from the
SwiftUI project). This is where real networking goes:

- **auth.ts** — `sendOtp(phone)` and `verifyOtp(sessionId, otp)` hitting a
  trusted backend, returning a session token to store in `expo-secure-store`.
- **profiles.ts** — fetch the match feed that currently comes from
  `src/data/mockProfiles.ts`.

Until these exist, the app uses mock auth (`MOCK_OTP` in `AuthContext.tsx`) and
local mock data.
