import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import EmptyState from '../components/EmptyState';
import FilterChips from '../components/FilterChips';
import PrimaryTextField from '../components/PrimaryTextField';
import ProfileCard from '../components/ProfileCard';
import ScreenHeader from '../components/ScreenHeader';
import { mockProfiles } from '../data/mockProfiles';
import { colors, spacing } from '../theme';

// Search — live filter over the mock feed by name, community, profession or city.
export default function SearchScreen() {
  const [query, setQuery] = useState('');

  const q = query.trim().toLowerCase();
  const results = q
    ? mockProfiles.filter((p) =>
        [p.name, p.community, p.occupation, p.city, p.education]
          .join(' ')
          .toLowerCase()
          .includes(q),
      )
    : mockProfiles;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScreenHeader title="Search" />

      <View style={styles.searchWrap}>
        <PrimaryTextField
          placeholder="Search by name, community, city…"
          value={query}
          onChangeText={setQuery}
          icon="search-outline"
        />
      </View>

      <View style={styles.chips}>
        <FilterChips />
      </View>

      {results.length === 0 ? (
        <EmptyState
          icon="search-outline"
          title="No results found"
          subtitle={`We couldn't find anyone matching "${query}". Try a different search.`}
        />
      ) : (
        <ScrollView
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {results.map((profile) => (
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
  searchWrap: {
    paddingHorizontal: spacing.lg,
  },
  chips: {
    marginTop: spacing.base,
    marginBottom: spacing.sm,
  },
  list: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: 120,
    gap: spacing.lg,
  },
});
