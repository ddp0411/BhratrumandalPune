import { Ionicons } from '@expo/vector-icons';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Avatar from '../components/Avatar';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { colors, radius, shadow, spacing, type } from '../theme';

interface Row {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
}

const ROWS: Row[] = [
  { icon: 'person-outline', label: 'Edit profile' },
  { icon: 'shield-checkmark-outline', label: 'Verification' },
  { icon: 'notifications-outline', label: 'Notifications' },
  { icon: 'lock-closed-outline', label: 'Privacy & safety' },
  { icon: 'help-circle-outline', label: 'Help & support' },
];

// Profile — the user's own summary, quick stats, settings list, and logout.
export default function ProfileScreen() {
  const { logout } = useAuth();
  const { liked, shortlisted } = useWishlist();

  const confirmLogout = () =>
    Alert.alert('Log out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Log out', style: 'destructive', onPress: logout },
    ]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.profileCard}>
          <Avatar name="You" size={88} tint={colors.primarySoft} />
          <Text style={styles.name}>Your Profile</Text>
          <View style={styles.verifiedRow}>
            <Ionicons name="shield-checkmark" size={14} color={colors.success} />
            <Text style={styles.verifiedText}>Verified member</Text>
          </View>

          <View style={styles.stats}>
            <Stat value={liked.size} label="Liked" />
            <View style={styles.statDivider} />
            <Stat value={shortlisted.size} label="Shortlisted" />
            <View style={styles.statDivider} />
            <Stat value={98} label="Visitors" />
          </View>
        </View>

        <View style={styles.menu}>
          {ROWS.map((row, i) => (
            <Pressable
              key={row.label}
              style={[styles.row, i < ROWS.length - 1 && styles.rowBorder]}
            >
              <View style={styles.rowIcon}>
                <Ionicons name={row.icon} size={20} color={colors.primary} />
              </View>
              <Text style={styles.rowLabel}>{row.label}</Text>
              <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
            </Pressable>
          ))}
        </View>

        <Pressable style={styles.logout} onPress={confirmLogout}>
          <Ionicons name="log-out-outline" size={20} color={colors.error} />
          <Text style={styles.logoutText}>Log out</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    padding: spacing.lg,
    paddingBottom: 120,
  },
  profileCard: {
    backgroundColor: colors.white,
    borderRadius: radius.card,
    alignItems: 'center',
    padding: spacing.xl,
    ...shadow.soft,
  },
  name: {
    ...type.sectionHeading,
    color: colors.text,
    marginTop: spacing.base,
  },
  verifiedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginTop: spacing.xs,
  },
  verifiedText: {
    ...type.caption,
    color: colors.textSecondary,
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xl,
    alignSelf: 'stretch',
    justifyContent: 'space-around',
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    ...type.sectionHeading,
    color: colors.text,
  },
  statLabel: {
    ...type.caption,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: colors.divider,
  },
  menu: {
    backgroundColor: colors.white,
    borderRadius: radius.card,
    marginTop: spacing.lg,
    ...shadow.soft,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.base,
    gap: spacing.md,
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  rowIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowLabel: {
    ...type.body,
    color: colors.text,
    flex: 1,
  },
  logout: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    marginTop: spacing.lg,
    paddingVertical: spacing.base,
  },
  logoutText: {
    ...type.bodyMedium,
    color: colors.error,
  },
});
