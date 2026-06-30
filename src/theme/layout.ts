import { ViewStyle } from 'react-native';

// Spacing scale — use ONLY these values for margins/padding/gaps. Never random
// spacing. Keys map to the raw numbers from the spec.
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  xxxl: 40,
  huge: 48,
  giant: 64,
} as const;

// Corner radii per component type.
export const radius = {
  button: 16,
  card: 20,
  input: 14,
  image: 20,
  sheet: 28,
  pill: 999,
} as const;

// Very soft shadow — opacity 0.08, blur 16, y-offset 6. No harsh shadows.
export const shadow = {
  soft: {
    shadowColor: '#000000',
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  } as ViewStyle,
  // Slightly tighter shadow for floating elements (tab bar, FAB).
  float: {
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 12,
  } as ViewStyle,
} as const;

// Standard animation timing — 250ms ease-in-out everywhere.
export const ANIM_DURATION = 250;
// Press feedback scale for buttons/cards.
export const PRESS_SCALE = 0.97;
