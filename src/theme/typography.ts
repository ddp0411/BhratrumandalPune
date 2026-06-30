import { TextStyle } from 'react-native';

// Typography hierarchy from the UI/UX spec. No fontFamily is set so the OS uses
// its system face — SF Pro Display on iOS, Roboto on Android — which is exactly
// the "SF Pro Display / System Font fallback" the spec asks for.
export const type = {
  largeTitle: { fontSize: 32, fontWeight: '700', letterSpacing: 0.2 } as TextStyle,
  screenTitle: { fontSize: 26, fontWeight: '700' } as TextStyle,
  sectionHeading: { fontSize: 20, fontWeight: '600' } as TextStyle,
  cardTitle: { fontSize: 18, fontWeight: '600' } as TextStyle,
  body: { fontSize: 16, fontWeight: '400' } as TextStyle,
  bodyMedium: { fontSize: 16, fontWeight: '600' } as TextStyle,
  button: { fontSize: 16, fontWeight: '700' } as TextStyle,
  caption: { fontSize: 13, fontWeight: '400' } as TextStyle,
} as const;
