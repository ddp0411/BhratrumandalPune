import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { colors, type } from '../theme';

interface AvatarProps {
  name: string;
  /** Soft background tint; falls back to the brand soft tint. */
  tint?: string;
  /** Fixed square size. Omit to let `style` size the avatar (fill mode). */
  size?: number;
  /** Corner radius. Defaults to a circle when `size` is set, else 0. */
  radius?: number;
  /** Override the initials font size (useful in fill mode). */
  fontSize?: number;
  style?: ViewStyle;
}

function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? '';
  const last = parts.length > 1 ? parts[parts.length - 1][0] : '';
  return (first + last).toUpperCase();
}

// Stand-in for a portrait photo. Until real imagery exists we render large,
// rounded initials on a soft tint — clean and on-brand, never a broken image.
export default function Avatar({ name, tint, size, radius, fontSize, style }: AvatarProps) {
  const sized: ViewStyle = size
    ? { width: size, height: size, borderRadius: radius ?? size / 2 }
    : { borderRadius: radius ?? 0 };

  return (
    <View style={[styles.base, sized, { backgroundColor: tint ?? colors.primarySoft }, style]}>
      <Text
        style={[
          type.sectionHeading,
          { color: colors.primary, fontSize: fontSize ?? (size ? Math.round(size * 0.36) : 56) },
        ]}
      >
        {initials(name)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
