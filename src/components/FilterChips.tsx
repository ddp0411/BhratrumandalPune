import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';
import { colors, radius, spacing, type } from '../theme';

interface Filter {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
}

// Horizontal quick filters. Selected chip fills with brand red.
const FILTERS: Filter[] = [
  { label: 'Nearby', icon: 'location-outline' },
  { label: 'Verified', icon: 'shield-checkmark-outline' },
  { label: 'New', icon: 'sparkles-outline' },
  { label: 'Profession', icon: 'briefcase-outline' },
  { label: 'Education', icon: 'school-outline' },
  { label: 'Community', icon: 'people-outline' },
];

export default function FilterChips() {
  const [selected, setSelected] = useState(0);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}
    >
      {FILTERS.map((item, index) => {
        const active = index === selected;
        return (
          <Pressable
            key={item.label}
            onPress={() => setSelected(index)}
            style={[styles.chip, active && styles.chipActive]}
          >
            <Ionicons
              name={item.icon}
              size={16}
              color={active ? colors.white : colors.textSecondary}
            />
            <Text style={[styles.text, active && styles.textActive]}>{item.label}</Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.divider,
  },
  chipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  text: {
    ...type.caption,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  textActive: {
    color: colors.white,
  },
});
