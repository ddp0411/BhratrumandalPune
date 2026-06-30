import { Ionicons } from '@expo/vector-icons';
import { useEffect, useRef } from 'react';
import {
  Animated,
  BackHandler,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Avatar from '../components/Avatar';
import { useWishlist } from '../context/WishlistContext';
import { colors, radius, shadow, spacing, type, ANIM_DURATION } from '../theme';
import { Profile } from '../types';

interface ProfileDetailScreenProps {
  profile: Profile;
  onClose: () => void;
}

interface DetailItem {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
}

// Full-screen profile detail. Slides up over the tabs; the hero photo sits
// behind a rounded content sheet, with a sticky action bar at the bottom.
export default function ProfileDetailScreen({ profile, onClose }: ProfileDetailScreenProps) {
  const insets = useSafeAreaInsets();
  const { isLiked, isShortlisted, toggleLike, toggleShortlist } = useWishlist();
  const anim = useRef(new Animated.Value(0)).current;

  const liked = isLiked(profile.id);
  const shortlisted = isShortlisted(profile.id);

  const close = () => {
    Animated.timing(anim, {
      toValue: 0,
      duration: ANIM_DURATION,
      useNativeDriver: true,
    }).start(onClose);
  };

  useEffect(() => {
    Animated.timing(anim, {
      toValue: 1,
      duration: ANIM_DURATION,
      useNativeDriver: true,
    }).start();

    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      close();
      return true;
    });
    return () => sub.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const details: DetailItem[] = [
    { icon: 'calendar-outline', label: 'Age', value: `${profile.age} years` },
    { icon: 'people-outline', label: 'Community', value: profile.community },
    { icon: 'sparkles-outline', label: 'Religion', value: profile.religion },
    { icon: 'school-outline', label: 'Education', value: profile.education },
    { icon: 'briefcase-outline', label: 'Profession', value: profile.occupation },
    { icon: 'location-outline', label: 'City', value: profile.city },
  ];

  const firstName = profile.name.split(' ')[0];
  const about = `${firstName} is a ${profile.occupation.toLowerCase()} based in ${profile.city}. From the ${profile.community} community, ${profile.religion} by faith, and looking to connect with like-minded families.`;

  const translateY = anim.interpolate({ inputRange: [0, 1], outputRange: [40, 0] });

  return (
    <Animated.View style={[styles.overlay, { opacity: anim, transform: [{ translateY }] }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <View style={styles.hero}>
          <Avatar name={profile.name} tint={profile.tint} radius={0} fontSize={104} style={styles.heroPhoto} />

          <Pressable
            style={[styles.iconButton, { top: insets.top + spacing.sm, left: spacing.lg }]}
            onPress={close}
            hitSlop={8}
          >
            <Ionicons name="chevron-back" size={24} color={colors.text} />
          </Pressable>
          <Pressable
            style={[styles.iconButton, { top: insets.top + spacing.sm, right: spacing.lg }]}
            hitSlop={8}
          >
            <Ionicons name="share-outline" size={22} color={colors.text} />
          </Pressable>

          {profile.verified ? (
            <View style={styles.verified}>
              <Ionicons name="shield-checkmark" size={14} color={colors.white} />
              <Text style={styles.verifiedText}>Verified</Text>
            </View>
          ) : null}
        </View>

        <View style={styles.sheet}>
          <Text style={styles.name}>
            {profile.name}, {profile.age}
          </Text>
          <View style={styles.metaRow}>
            <Ionicons name="briefcase-outline" size={15} color={colors.textSecondary} />
            <Text style={styles.meta}>{profile.occupation}</Text>
            <Text style={styles.dot}>•</Text>
            <Ionicons name="location-outline" size={15} color={colors.textSecondary} />
            <Text style={styles.meta}>{profile.city}</Text>
          </View>

          <Text style={styles.sectionTitle}>Basic Details</Text>
          <View style={styles.detailGrid}>
            {details.map((item) => (
              <View key={item.label} style={styles.detailCell}>
                <View style={styles.detailIcon}>
                  <Ionicons name={item.icon} size={18} color={colors.primary} />
                </View>
                <View style={styles.detailText}>
                  <Text style={styles.detailLabel}>{item.label}</Text>
                  <Text style={styles.detailValue}>{item.value}</Text>
                </View>
              </View>
            ))}
          </View>

          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.about}>{about}</Text>
        </View>
      </ScrollView>

      <View style={[styles.actionBar, { paddingBottom: Math.max(insets.bottom, spacing.md) }]}>
        <Pressable
          style={styles.circleBtn}
          onPress={() => toggleLike(profile.id)}
          hitSlop={6}
        >
          <Ionicons
            name={liked ? 'heart' : 'heart-outline'}
            size={24}
            color={liked ? colors.primary : colors.textSecondary}
          />
        </Pressable>
        <Pressable
          style={styles.circleBtn}
          onPress={() => toggleShortlist(profile.id)}
          hitSlop={6}
        >
          <Ionicons
            name={shortlisted ? 'star' : 'star-outline'}
            size={24}
            color={shortlisted ? colors.warning : colors.textSecondary}
          />
        </Pressable>
        <Pressable style={styles.interestBtn} hitSlop={6}>
          <Ionicons name="mail-outline" size={20} color={colors.white} />
          <Text style={styles.interestText}>Send Interest</Text>
        </Pressable>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.background,
  },
  hero: {
    height: 420,
  },
  heroPhoto: {
    height: 420,
    width: '100%',
  },
  iconButton: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadow.soft,
  },
  verified: {
    position: 'absolute',
    bottom: spacing.xxl,
    left: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: colors.success,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.pill,
  },
  verifiedText: {
    ...type.caption,
    color: colors.white,
    fontWeight: '600',
  },
  sheet: {
    marginTop: -spacing.xl,
    backgroundColor: colors.background,
    borderTopLeftRadius: radius.sheet,
    borderTopRightRadius: radius.sheet,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
  },
  name: {
    ...type.screenTitle,
    color: colors.text,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginTop: spacing.sm,
  },
  meta: {
    ...type.body,
    color: colors.textSecondary,
  },
  dot: {
    color: colors.textSecondary,
    marginHorizontal: spacing.xs,
  },
  sectionTitle: {
    ...type.sectionHeading,
    color: colors.text,
    marginTop: spacing.xl,
    marginBottom: spacing.base,
  },
  detailGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  detailCell: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  detailIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailText: {
    flex: 1,
  },
  detailLabel: {
    ...type.caption,
    color: colors.textSecondary,
  },
  detailValue: {
    ...type.bodyMedium,
    color: colors.text,
    marginTop: 2,
  },
  about: {
    ...type.body,
    color: colors.textSecondary,
    lineHeight: 24,
  },
  actionBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.divider,
  },
  circleBtn: {
    width: 54,
    height: 54,
    borderRadius: radius.button,
    borderWidth: 1.5,
    borderColor: colors.divider,
    alignItems: 'center',
    justifyContent: 'center',
  },
  interestBtn: {
    flex: 1,
    height: 54,
    borderRadius: radius.button,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  interestText: {
    ...type.button,
    color: colors.white,
  },
});
