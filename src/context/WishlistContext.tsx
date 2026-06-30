import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

// Lightweight prototype state for Like (❤️) and Shortlist (⭐) actions so the
// Wishlist tab reflects what the user shortlisted (and shows the empty state
// when nothing is saved yet). A real app would persist this server-side.
interface WishlistContextValue {
  liked: Set<string>;
  shortlisted: Set<string>;
  isLiked: (id: string) => boolean;
  isShortlisted: (id: string) => boolean;
  toggleLike: (id: string) => void;
  toggleShortlist: (id: string) => void;
}

const WishlistContext = createContext<WishlistContextValue | undefined>(undefined);

function toggle(set: Set<string>, id: string): Set<string> {
  const next = new Set(set);
  if (next.has(id)) {
    next.delete(id);
  } else {
    next.add(id);
  }
  return next;
}

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [liked, setLiked] = useState<Set<string>>(new Set());
  const [shortlisted, setShortlisted] = useState<Set<string>>(new Set());

  const toggleLike = useCallback((id: string) => setLiked((s) => toggle(s, id)), []);
  const toggleShortlist = useCallback(
    (id: string) => setShortlisted((s) => toggle(s, id)),
    [],
  );

  const value = useMemo<WishlistContextValue>(
    () => ({
      liked,
      shortlisted,
      isLiked: (id) => liked.has(id),
      isShortlisted: (id) => shortlisted.has(id),
      toggleLike,
      toggleShortlist,
    }),
    [liked, shortlisted, toggleLike, toggleShortlist],
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist(): WishlistContextValue {
  const ctx = useContext(WishlistContext);
  if (!ctx) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return ctx;
}
