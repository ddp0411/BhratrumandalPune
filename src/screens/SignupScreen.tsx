import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PrimaryButton from '../components/PrimaryButton';
import PrimaryTextField from '../components/PrimaryTextField';
import { useAuth } from '../context/AuthContext';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';

// Ported from Views/SignupView.swift — now reachable from the Login screen.
type Gender = 'Male' | 'Female';
const GENDERS: Gender[] = ['Male', 'Female'];

export default function SignupScreen() {
  const { login } = useAuth();
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState<Gender>('Male');

  const canContinue = name.trim().length > 0;

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.content}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Text style={styles.heading}>Create Your Profile</Text>

        <PrimaryTextField placeholder="Full Name" value={name} onChangeText={setName} />
        <PrimaryTextField placeholder="Date of Birth" value={dob} onChangeText={setDob} />

        <View style={styles.segment}>
          {GENDERS.map((g) => {
            const active = gender === g;
            return (
              <Pressable
                key={g}
                onPress={() => setGender(g)}
                style={[styles.segmentItem, active && styles.segmentItemActive]}
              >
                <Text style={[styles.segmentText, active && styles.segmentTextActive]}>{g}</Text>
              </Pressable>
            );
          })}
        </View>

        <PrimaryButton title="Continue" onPress={login} disabled={!canContinue} />

        <View style={styles.spacer} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    padding: 24,
    gap: 16,
  },
  heading: {
    ...fonts.title,
    color: colors.text,
    marginTop: 24,
  },
  segment: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 10,
    padding: 4,
  },
  segmentItem: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  segmentItemActive: {
    backgroundColor: colors.white,
  },
  segmentText: {
    color: colors.grayText,
    fontWeight: '600',
  },
  segmentTextActive: {
    color: colors.text,
  },
  spacer: {
    flex: 1,
  },
});
