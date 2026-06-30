import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PrimaryButton from '../components/PrimaryButton';
import PrimaryTextField from '../components/PrimaryTextField';
import { MOCK_OTP, useAuth } from '../context/AuthContext';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';

// Ported from Views/OTPView.swift. On success, verifyOTP() flips isLoggedIn,
// which makes RootNavigator swap to the Home stack (no manual navigation).
export default function OTPScreen() {
  const { phone, otp, setOtp, verifyOTP } = useAuth();
  const [error, setError] = useState('');

  const onVerify = () => {
    if (!verifyOTP()) {
      setError(`Invalid OTP. For this prototype, use ${MOCK_OTP}.`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.content}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Text style={styles.heading}>Enter OTP</Text>
        <Text style={styles.subtitle}>
          We sent a code to {phone ? `+91 ${phone}` : 'your number'}
        </Text>

        <PrimaryTextField
          placeholder="6-digit OTP"
          value={otp}
          onChangeText={(t) => {
            setOtp(t.replace(/[^0-9]/g, ''));
            setError('');
          }}
          keyboardType="number-pad"
          maxLength={6}
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <PrimaryButton title="Verify OTP" onPress={onVerify} disabled={otp.length !== 6} />

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
  subtitle: {
    ...fonts.subtitle,
    color: colors.grayText,
  },
  error: {
    color: colors.primary,
  },
  spacer: {
    flex: 1,
  },
});
