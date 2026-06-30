import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { Profile } from '../types';

// Ported from Views/Home/ProfileCardView.swift.
// `image` references (e.g. "girl1") have no bundled asset yet, so we render a
// placeholder icon — matching the SwiftUI "Photo Placeholder" behaviour.
interface ProfileCardProps {
  profile: Profile;
}

export default function ProfileCard({ profile }: ProfileCardProps) {
  const [liked, setLiked] = useState(false);
  const [shortlisted, setShortlisted] = useState(false);

  return (
    <View style={styles.card}>
      <View style={styles.photo}>
        <Ionicons name="person" size={64} color={colors.white} />
      </View>

      <Text style={styles.name}>
        {profile.name}, {profile.age}
      </Text>
      <Text style={styles.meta}>
        {profile.religion} • {profile.occupation}
      </Text>
      <Text style={styles.meta}>{profile.city}</Text>

      <View style={styles.actions}>
        <Pressable style={styles.action} onPress={() => setLiked((v) => !v)}>
          <Ionicons
            name={liked ? 'heart' : 'heart-outline'}
            size={20}
            color={colors.primary}
          />
          <Text style={styles.actionText}>Like</Text>
        </Pressable>

        <Pressable style={styles.action} onPress={() => setShortlisted((v) => !v)}>
          <Ionicons
            name={shortlisted ? 'bookmark' : 'bookmark-outline'}
            size={20}
            color={colors.primary}
          />
          <Text style={styles.actionText}>Shortlist</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    backgroundColor: colors.surface,
    borderRadius: 12,
  },
  photo: {
    height: 180,
    borderRadius: 12,
    backgroundColor: colors.grayText,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    marginTop: 12,
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
  },
  meta: {
    marginTop: 4,
    color: colors.grayText,
    fontSize: 14,
  },
  actions: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  actionText: {
    color: colors.primary,
    fontWeight: '600',
  },
});
