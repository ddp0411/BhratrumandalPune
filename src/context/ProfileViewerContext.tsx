import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import ProfileDetailScreen from '../screens/ProfileDetailScreen';
import { Profile } from '../types';

// Lets any ProfileCard open the full-screen detail view without threading
// callbacks through every tab screen. The provider renders the detail overlay
// itself (above the tab bar) when a profile is open.
interface ProfileViewerContextValue {
  open: (profile: Profile) => void;
  close: () => void;
}

const ProfileViewerContext = createContext<ProfileViewerContextValue | undefined>(undefined);

export function ProfileViewerProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<Profile | null>(null);

  const open = useCallback((p: Profile) => setProfile(p), []);
  const close = useCallback(() => setProfile(null), []);

  const value = useMemo(() => ({ open, close }), [open, close]);

  return (
    <ProfileViewerContext.Provider value={value}>
      {children}
      {profile ? <ProfileDetailScreen profile={profile} onClose={close} /> : null}
    </ProfileViewerContext.Provider>
  );
}

export function useProfileViewer(): ProfileViewerContextValue {
  const ctx = useContext(ProfileViewerContext);
  if (!ctx) {
    throw new Error('useProfileViewer must be used within a ProfileViewerProvider');
  }
  return ctx;
}
