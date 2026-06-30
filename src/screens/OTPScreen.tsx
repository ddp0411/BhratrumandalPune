import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import OtpInput from '../components/OtpInput';
import PrimaryButton from '../components/PrimaryButton';
import { MOCK_OTP, useAuth } from '../context/AuthContext';
import { colors, spacing, type } from '../theme';
import { AuthStackParamList } from '../navigation/types';

const RESEND_SECONDS = 30;

// OTP — minimal, centered, six boxes. A success checkmark plays before the
// navigator swaps to the app, so verification feels confirmed.
type Props = NativeStackScreenProps<AuthStackParamList, 'OTP'>;

export default function OTPScreen({ navigation }: Props) {
  const { phone, otp, setOtp, verifyOTP } = useAuth();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [countdown, setCountdown] = useState(RESEND_SECONDS);
  const check = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (countdown <= 0) return;
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  const onVerify = () => {
    if (otp !== MOCK_OTP) {
      setError(`Invalid OTP. For this prototype, use ${MOCK_OTP}.`);
      return;
    }
    setError('');
    setSuccess(true);
    Animated.spring(check, { toValue: 1, friction: 5, useNativeDriver: true }).start();
    // Let the checkmark land, then flip auth state (RootNavigator swaps screens).
    setTimeout(verifyOTP, 800);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.content}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Pressable style={styles.back} onPress={() => navigation.goBack()} hitSlop={8}>
          <Ionicons name="chevron-back" size={26} color={colors.text} />
        </Pressable>

        <Text style={styles.heading}>Verify your number</Text>
        <Text style={styles.subtitle}>
          Enter the 6-digit code sent to {phone ? `+91 ${phone}` : 'your number'}
        </Text>

        <View style={styles.otp}>
          <OtpInput
            value={otp}
            onChangeText={(t) => {
              setOtp(t);
              setError('');
            }}
          />
        </View>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <View style={styles.resendRow}>
          {countdown > 0 ? (
            <Text style={styles.resendMuted}>Resend code in 0:{String(countdown).padStart(2, '0')}</Text>
          ) : (
            <Pressable onPress={() => setCountdown(RESEND_SECONDS)} hitSlop={8}>
              <Text style={styles.resendLink}>Resend code</Text>
            </Pressable>
          )}
        </View>

        <View style={styles.spacer} />

        <PrimaryButton title="Verify" onPress={onVerify} disabled={otp.length !== 6} />
      </KeyboardAvoidingView>

      {success ? (
        <View style={styles.successOverlay}>
          <Animated.View style={[styles.successCircle, { transform: [{ scale: check }] }]}>
            <Ionicons name="checkmark" size={56} color={colors.white} />
          </Animated.View>
          <Text style={styles.successText}>Verified</Text>
        </View>
      ) : null}
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
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.base,
  },
  back: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    marginLeft: -spacing.sm,
    marginBottom: spacing.base,
  },
  heading: {
    ...type.largeTitle,
    color: colors.text,
  },
  subtitle: {
    ...type.body,
    color: colors.textSecondary,
    marginTop: spacing.md,
    lineHeight: 24,
  },
  otp: {
    marginTop: spacing.xxl,
  },
  error: {
    ...type.caption,
    color: colors.error,
    marginTop: spacing.base,
  },
  resendRow: {
    marginTop: spacing.lg,
  },
  resendMuted: {
    ...type.body,
    color: colors.textSecondary,
  },
  resendLink: {
    ...type.bodyMedium,
    color: colors.primary,
  },
  spacer: {
    flex: 1,
  },
  successOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.lg,
  },
  successCircle: {
    width: 112,
    height: 112,
    borderRadius: 56,
    backgroundColor: colors.success,
    alignItems: 'center',
    justifyContent: 'center',
  },
  successText: {
    ...type.sectionHeading,
    color: colors.text,
  },
});
