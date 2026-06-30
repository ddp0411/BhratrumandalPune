import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, type } from '../theme';

interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
}

// Consistent large-title header for the main tab screens.
export default function ScreenHeader({ title, subtitle }: ScreenHeaderProps) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.base,
  },
  title: {
    ...type.largeTitle,
    color: colors.text,
  },
  subtitle: {
    ...type.body,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
});
