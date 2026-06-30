import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import EmptyState from '../components/EmptyState';
import ProfileCard from '../components/ProfileCard';
import ScreenHeader from '../components/ScreenHeader';
import { useWishlist } from '../context/WishlistContext';
import { mockProfiles } from '../data/mockProfiles';
import { TabScreenProps } from '../navigation/tabTypes';
import { colors, spacing } from '../theme';

// Wishlist — profiles the user shortlisted (⭐). Shows the empty state from the
// spec when nothing is saved yet.
export default function WishlistScreen({ onNavigate }: TabScreenProps) {
  const { shortlisted } = useWishlist();
  const saved = mockProfiles.filter((p) => shortlisted.has(p.id));

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScreenHeader
        title="Wishlist"
        subtitle={saved.length ? `${saved.length} shortlisted` : undefined}
      />

      {saved.length === 0 ? (
        <EmptyState
          icon="star-outline"
          title="No shortlisted profiles yet"
          subtitle="Tap the ⭐ Shortlist button on a profile to save it here for later."
          actionTitle="Explore profiles"
          onAction={() => onNavigate('Home')}
        />
      ) : (
        <ScrollView
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        >
          {saved.map((profile) => (
            <ProfileCard key={profile.id} profile={profile} />
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  list: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: 120,
    gap: spacing.lg,
  },
});
