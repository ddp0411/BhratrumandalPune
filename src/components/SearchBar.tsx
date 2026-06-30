import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { colors, radius, spacing, type } from '../theme';

interface SearchBarProps {
  placeholder?: string;
  /** When provided the bar acts as a button (read-only entry point). */
  onPress?: () => void;
  style?: ViewStyle;
}

// Rounded search field with a leading icon. Used as a tappable entry point on
// Home and as the search box on the Search tab.
export default function SearchBar({
  placeholder = 'Search Brides & Grooms',
  onPress,
  style,
}: SearchBarProps) {
  return (
    <Pressable
      style={[styles.bar, style]}
      onPress={onPress}
      accessibilityRole="search"
    >
      <Ionicons name="search" size={20} color={colors.textSecondary} />
      <Text style={styles.placeholder}>{placeholder}</Text>
      <View style={styles.filterBtn}>
        <Ionicons name="options-outline" size={18} color={colors.white} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  bar: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingLeft: spacing.base,
    paddingRight: spacing.sm,
    borderRadius: radius.input,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.divider,
  },
  placeholder: {
    ...type.body,
    color: colors.textSecondary,
    flex: 1,
  },
  filterBtn: {
    width: 40,
    height: 40,
    borderRadius: radius.input - 2,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
