import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Avatar from '../components/Avatar';
import FilterChips from '../components/FilterChips';
import ProfileCard from '../components/ProfileCard';
import SearchBar from '../components/SearchBar';
import SkeletonCard from '../components/SkeletonCard';
import { useWishlist } from '../context/WishlistContext';
import { mockProfiles } from '../data/mockProfiles';
import { TabScreenProps } from '../navigation/tabTypes';
import { colors, spacing, type } from '../theme';

function greeting(): string {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

// Home — header (avatar / logo / notification + wishlist), greeting, search bar,
// quick filters, and the recommended profile feed. Skeleton cards show while
// the feed "loads" instead of a spinner.
export default function HomeScreen({ onNavigate }: TabScreenProps) {
  const [loading, setLoading] = useState(true);
  const { shortlisted } = useWishlist();

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1100);
    return () => clearTimeout(t);
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => onNavigate('Profile')} hitSlop={6}>
          <Avatar name="You" size={44} tint={colors.primarySoft} />
        </Pressable>

        <View style={styles.brand}>
          <Text style={styles.brandName}>Bhratrumandal</Text>
          <Text style={styles.brandCity}>PUNE</Text>
        </View>

        <View style={styles.headerIcons}>
          <Pressable style={styles.iconBtn} hitSlop={6}>
            <Ionicons name="notifications-outline" size={22} color={colors.text} />
            <View style={styles.dot} />
          </Pressable>
          <Pressable style={styles.iconBtn} onPress={() => onNavigate('Wishlist')} hitSlop={6}>
            <Ionicons name="heart-outline" size={22} color={colors.text} />
            {shortlisted.size > 0 ? (
              <View style={styles.countBadge}>
                <Text style={styles.countText}>{shortlisted.size}</Text>
              </View>
            ) : null}
          </Pressable>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.greeting}>{greeting()} 👋</Text>
        <Text style={styles.tagline}>Find your perfect match today</Text>

        <View style={styles.searchWrap}>
          <SearchBar onPress={() => onNavigate('Search')} />
        </View>

        <View style={styles.chips}>
          <FilterChips />
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recommended for you</Text>
          <Pressable onPress={() => onNavigate('Matches')} hitSlop={6}>
            <Text style={styles.seeAll}>See all</Text>
          </Pressable>
        </View>

        <View style={styles.list}>
          {loading
            ? [0, 1].map((i) => <SkeletonCard key={i} />)
            : mockProfiles.map((profile) => (
                <ProfileCard key={profile.id} profile={profile} />
              ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
  },
  brand: {
    flex: 1,
    alignItems: 'center',
  },
  brandName: {
    ...type.cardTitle,
    color: colors.primary,
  },
  brandCity: {
    ...type.caption,
    color: colors.textSecondary,
    letterSpacing: 3,
  },
  headerIcons: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  iconBtn: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    position: 'absolute',
    top: 11,
    right: 11,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
    borderWidth: 1.5,
    borderColor: colors.background,
  },
  countBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    paddingHorizontal: 3,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: '700',
  },
  scroll: {
    paddingTop: spacing.sm,
    paddingBottom: 120, // clear the floating tab bar
  },
  greeting: {
    ...type.largeTitle,
    color: colors.text,
    paddingHorizontal: spacing.lg,
  },
  tagline: {
    ...type.body,
    color: colors.textSecondary,
    paddingHorizontal: spacing.lg,
    marginTop: spacing.xs,
  },
  searchWrap: {
    paddingHorizontal: spacing.lg,
    marginTop: spacing.lg,
  },
  chips: {
    marginTop: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    marginTop: spacing.xl,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    ...type.sectionHeading,
    color: colors.text,
  },
  seeAll: {
    ...type.bodyMedium,
    color: colors.primary,
  },
  list: {
    paddingHorizontal: spacing.lg,
    gap: spacing.lg,
  },
});
