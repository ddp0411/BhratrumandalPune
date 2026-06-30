import React, { createContext, useContext, useMemo, useState } from 'react';

// Ported from ViewModels/AuthViewModel.swift.
//
// NOTE: This is MOCK auth for the UI prototype only. The OTP is hardcoded and
// `isLoggedIn` is client-controlled. Before shipping, OTP issuance/verification
// and session tokens must move to a trusted backend (Services/), with the token
// stored in SecureStore — not derived from a local boolean.
export const MOCK_OTP = '123456';

interface AuthContextValue {
  phone: string;
  setPhone: (value: string) => void;
  otp: string;
  setOtp: (value: string) => void;
  isLoggedIn: boolean;
  isNewUser: boolean;
  setIsNewUser: (value: boolean) => void;
  /** Returns true when the phone number is valid (10 digits). */
  sendOTP: () => boolean;
  /** Returns true and logs in when the OTP matches. */
  verifyOTP: () => boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);

  const value = useMemo<AuthContextValue>(
    () => ({
      phone,
      setPhone,
      otp,
      setOtp,
      isLoggedIn,
      isNewUser,
      setIsNewUser,
      sendOTP: () => phone.length === 10,
      verifyOTP: () => {
        const ok = otp === MOCK_OTP;
        if (ok) setIsLoggedIn(true);
        return ok;
      },
      login: () => setIsLoggedIn(true),
      logout: () => {
        setIsLoggedIn(false);
        setPhone('');
        setOtp('');
        setIsNewUser(false);
      },
    }),
    [phone, otp, isLoggedIn, isNewUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}
