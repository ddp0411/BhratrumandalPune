import { Ionicons } from '@expo/vector-icons';
import { useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import { colors, radius, spacing, type, ANIM_DURATION, PRESS_SCALE } from '../theme';

type Variant = 'primary' | 'secondary' | 'text';

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  variant?: Variant;
  icon?: keyof typeof Ionicons.glyphMap;
  style?: ViewStyle;
}

// Buttons per spec: height 54, radius 16, bold label, gentle 0.97 press scale.
export default function PrimaryButton({
  title,
  onPress,
  disabled = false,
  variant = 'primary',
  icon,
  style,
}: PrimaryButtonProps) {
  const scale = useRef(new Animated.Value(1)).current;

  const animateTo = (toValue: number) =>
    Animated.timing(scale, {
      toValue,
      duration: ANIM_DURATION,
      useNativeDriver: true,
    }).start();

  const isText = variant === 'text';
  const isSecondary = variant === 'secondary';
  const labelColor = disabled
    ? colors.textSecondary
    : isPrimary(variant)
      ? colors.white
      : colors.primary;

  return (
    <Animated.View style={[{ transform: [{ scale }] }, style]}>
      <Pressable
        onPress={onPress}
        disabled={disabled}
        onPressIn={() => animateTo(PRESS_SCALE)}
        onPressOut={() => animateTo(1)}
        style={[
          styles.base,
          isText && styles.text,
          isSecondary && styles.secondary,
          isPrimary(variant) && styles.primary,
          disabled && styles.disabled,
        ]}
        accessibilityRole="button"
      >
        {icon ? (
          <Ionicons name={icon} size={20} color={labelColor} style={styles.icon} />
        ) : null}
        <Text style={[type.button, { color: labelColor }]}>{title}</Text>
      </Pressable>
    </Animated.View>
  );
}

function isPrimary(v: Variant) {
  return v === 'primary';
}

const styles = StyleSheet.create({
  base: {
    height: 54,
    borderRadius: radius.button,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.white,
    borderWidth: 1.5,
    borderColor: colors.divider,
  },
  text: {
    height: 44,
    backgroundColor: 'transparent',
  },
  disabled: {
    backgroundColor: colors.divider,
    opacity: 0.7,
  },
  icon: {
    marginRight: spacing.sm,
  },
});
