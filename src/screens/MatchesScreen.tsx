import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import EmptyState from '../components/EmptyState';
import ProfileCard from '../components/ProfileCard';
import ScreenHeader from '../components/ScreenHeader';
import { useWishlist } from '../context/WishlistContext';
import { mockProfiles } from '../data/mockProfiles';
import { TabScreenProps } from '../navigation/tabTypes';
import { colors, spacing } from '../theme';

// Matches — profiles you liked (❤️). Empty until the user likes someone.
export default function MatchesScreen({ onNavigate }: TabScreenProps) {
  const { liked } = useWishlist();
  const matches = mockProfiles.filter((p) => liked.has(p.id));

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScreenHeader
        title="Matches"
        subtitle={matches.length ? `${matches.length} profile${matches.length > 1 ? 's' : ''} you liked` : undefined}
      />

      {matches.length === 0 ? (
        <EmptyState
          icon="heart-outline"
          title="No matches yet"
          subtitle="Like profiles from the home feed and they'll show up here."
          actionTitle="Browse profiles"
          onAction={() => onNavigate('Home')}
        />
      ) : (
        <ScrollView
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        >
          {matches.map((profile) => (
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
