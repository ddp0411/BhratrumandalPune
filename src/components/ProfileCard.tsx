import { Ionicons } from '@expo/vector-icons';
import { useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { useProfileViewer } from '../context/ProfileViewerContext';
import { useWishlist } from '../context/WishlistContext';
import { colors, radius, shadow, spacing, type, ANIM_DURATION } from '../theme';
import { Profile } from '../types';
import Avatar from './Avatar';

interface ProfileCardProps {
  profile: Profile;
}

// Profile card per spec: large photo (~65% of card), name/age/community/
// profession/city, then three actions — Like, Shortlist, View. The heart
// "bursts" on like for a small moment of delight. Tapping the photo or View
// opens the full profile.
export default function ProfileCard({ profile }: ProfileCardProps) {
  const { open } = useProfileViewer();
  const { isLiked, isShortlisted, toggleLike, toggleShortlist } = useWishlist();
  const liked = isLiked(profile.id);
  const shortlisted = isShortlisted(profile.id);
  const burst = useRef(new Animated.Value(1)).current;

  const onLike = () => {
    toggleLike(profile.id);
    if (!liked) {
      burst.setValue(0.6);
      Animated.spring(burst, { toValue: 1, friction: 4, useNativeDriver: true }).start();
    }
  };

  return (
    <View style={styles.card}>
      <Pressable style={styles.photoWrap} onPress={() => open(profile)}>
        <Avatar name={profile.name} tint={profile.tint} radius={0} style={styles.photo} />
        {profile.verified ? (
          <View style={styles.verified}>
            <Ionicons name="shield-checkmark" size={14} color={colors.white} />
            <Text style={styles.verifiedText}>Verified</Text>
          </View>
        ) : null}
      </Pressable>

      <View style={styles.body}>
        <Text style={styles.name}>
          {profile.name}, {profile.age}
        </Text>
        <Text style={styles.meta}>
          {profile.community} • {profile.occupation}
        </Text>
        <View style={styles.locationRow}>
          <Ionicons name="location-outline" size={14} color={colors.textSecondary} />
          <Text style={styles.location}>{profile.city}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.actions}>
          <Pressable style={styles.action} onPress={onLike} hitSlop={6}>
            <Animated.View style={{ transform: [{ scale: liked ? burst : 1 }] }}>
              <Ionicons
                name={liked ? 'heart' : 'heart-outline'}
                size={22}
                color={liked ? colors.primary : colors.textSecondary}
              />
            </Animated.View>
            <Text style={[styles.actionText, liked && styles.actionActive]}>Like</Text>
          </Pressable>

          <Pressable
            style={styles.action}
            onPress={() => toggleShortlist(profile.id)}
            hitSlop={6}
          >
            <Ionicons
              name={shortlisted ? 'star' : 'star-outline'}
              size={22}
              color={shortlisted ? colors.warning : colors.textSecondary}
            />
            <Text style={[styles.actionText, shortlisted && { color: colors.warning }]}>
              Shortlist
            </Text>
          </Pressable>

          <Pressable
            style={[styles.action, styles.viewAction]}
            onPress={() => open(profile)}
            hitSlop={6}
          >
            <Text style={styles.viewText}>View</Text>
            <Ionicons name="chevron-forward" size={16} color={colors.white} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.card,
    overflow: 'hidden',
    ...shadow.soft,
  },
  photoWrap: {
    position: 'relative',
  },
  photo: {
    width: '100%',
    height: 280,
  },
  verified: {
    position: 'absolute',
    top: spacing.md,
    left: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: colors.success,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.pill,
  },
  verifiedText: {
    ...type.caption,
    color: colors.white,
    fontWeight: '600',
  },
  body: {
    padding: spacing.lg,
  },
  name: {
    ...type.cardTitle,
    color: colors.text,
  },
  meta: {
    ...type.body,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginTop: spacing.sm,
  },
  location: {
    ...type.caption,
    color: colors.textSecondary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.divider,
    marginVertical: spacing.base,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  actionText: {
    ...type.caption,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  actionActive: {
    color: colors.primary,
  },
  viewAction: {
    marginLeft: 'auto',
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.sm,
    borderRadius: radius.button,
  },
  viewText: {
    ...type.caption,
    fontWeight: '700',
    color: colors.white,
  },
});

// Animation timing reference kept consistent with the design system.
export const PROFILE_CARD_ANIM = ANIM_DURATION;
