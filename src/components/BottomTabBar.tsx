import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radius, shadow, spacing, type } from '../theme';

export type TabKey = 'Home' | 'Search' | 'Matches' | 'Wishlist' | 'Profile';

interface TabDef {
  key: TabKey;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconActive: keyof typeof Ionicons.glyphMap;
}

export const TABS: TabDef[] = [
  { key: 'Home', label: 'Home', icon: 'home-outline', iconActive: 'home' },
  { key: 'Search', label: 'Search', icon: 'search-outline', iconActive: 'search' },
  { key: 'Matches', label: 'Matches', icon: 'heart-outline', iconActive: 'heart' },
  { key: 'Wishlist', label: 'Wishlist', icon: 'star-outline', iconActive: 'star' },
  { key: 'Profile', label: 'Profile', icon: 'person-outline', iconActive: 'person' },
];

interface BottomTabBarProps {
  active: TabKey;
  onChange: (key: TabKey) => void;
  /** Optional badge counts keyed by tab. */
  badges?: Partial<Record<TabKey, number>>;
}

// Floating, rounded bottom navigation with icon + label. The active tab is
// brand red; touch targets are a comfortable 44+.
export default function BottomTabBar({ active, onChange, badges }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.wrap, { paddingBottom: Math.max(insets.bottom, spacing.md) }]}>
      <View style={styles.bar}>
        {TABS.map((tab) => {
          const isActive = tab.key === active;
          const badge = badges?.[tab.key];
          return (
            <Pressable
              key={tab.key}
              style={styles.tab}
              onPress={() => onChange(tab.key)}
              accessibilityRole="tab"
              accessibilityState={{ selected: isActive }}
            >
              <View>
                <Ionicons
                  name={isActive ? tab.iconActive : tab.icon}
                  size={24}
                  color={isActive ? colors.primary : colors.textSecondary}
                />
                {badge ? (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{badge > 9 ? '9+' : badge}</Text>
                  </View>
                ) : null}
              </View>
              <Text style={[styles.label, isActive && styles.labelActive]}>{tab.label}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: spacing.base,
    backgroundColor: 'transparent',
  },
  bar: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: radius.sheet,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    ...shadow.float,
  },
  tab: {
    flex: 1,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
  },
  label: {
    ...type.caption,
    fontSize: 11,
    color: colors.textSecondary,
  },
  labelActive: {
    color: colors.primary,
    fontWeight: '600',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -8,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  badgeText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: '700',
  },
});
