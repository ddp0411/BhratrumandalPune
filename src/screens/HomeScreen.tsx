import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FilterChips from '../components/FilterChips';
import ProfileCard from '../components/ProfileCard';
import { useAuth } from '../context/AuthContext';
import { mockProfiles } from '../data/mockProfiles';
import { colors } from '../theme/colors';

// Ported from Views/Home/HomeView.swift. The avatar acts as a temporary logout
// affordance until a real profile screen exists.
export default function HomeScreen() {
  const { logout } = useAuth();

  const confirmLogout = () => {
    Alert.alert('Log out', 'Do you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Log out', style: 'destructive', onPress: logout },
    ]);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={confirmLogout} hitSlop={8}>
          <View style={styles.avatar} />
        </Pressable>
        <View style={styles.spacer} />
        <Ionicons name="notifications-outline" size={24} color={colors.text} style={styles.icon} />
        <Ionicons name="heart-outline" size={24} color={colors.text} />
      </View>

      <FilterChips />

      <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
        {mockProfiles.map((profile) => (
          <ProfileCard key={profile.id} profile={profile} />
        ))}
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
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(142,142,147,0.3)',
  },
  spacer: {
    flex: 1,
  },
  icon: {
    marginRight: 16,
  },
  list: {
    padding: 16,
    gap: 20,
  },
});
