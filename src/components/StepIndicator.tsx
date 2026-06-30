import { StyleSheet, View } from 'react-native';
import { colors, radius, spacing } from '../theme';

interface StepIndicatorProps {
  total: number;
  current: number; // 0-based index of the active step
}

// Slim segmented progress for the multi-step signup flow. The active and
// completed steps fill with brand red; upcoming steps stay light.
export default function StepIndicator({ total, current }: StepIndicatorProps) {
  return (
    <View style={styles.row}>
      {Array.from({ length: total }).map((_, i) => (
        <View
          key={i}
          style={[styles.segment, i <= current ? styles.active : styles.inactive]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  segment: {
    flex: 1,
    height: 6,
    borderRadius: radius.pill,
  },
  active: {
    backgroundColor: colors.primary,
  },
  inactive: {
    backgroundColor: colors.divider,
  },
});
