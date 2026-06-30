// Bhratrumandal Pune — design system colors (UI/UX spec v1.0).
// Calm, premium, trust-focused matrimonial palette. Avoid adding ad-hoc colors;
// extend this token set instead so every screen stays consistent.
export const colors = {
  // Primary — Deep Matrimony Red. CTAs, active icons/tabs, important actions.
  primary: '#C62828',
  primaryPressed: '#A81E1E',
  // Soft tint of primary for chips, avatars, subtle highlights.
  primarySoft: '#FBEAEA',

  // Surfaces
  background: '#FFFFFF', // main background
  surface: '#F8F8F8', // card / input background
  white: '#FFFFFF',

  // Text
  text: '#222222', // text primary
  textSecondary: '#666666',

  // Lines & states
  divider: '#ECECEC',
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#E53935',

  // Legacy alias kept so older imports keep compiling.
  grayText: '#666666',
  border: '#ECECEC',
} as const;
