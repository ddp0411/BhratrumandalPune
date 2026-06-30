import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
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
import { colors, spacing, type } from '../theme';
import { AuthStackParamList } from '../navigation/types';

// Login — simple and airy: logo, title, subtitle, one input, CTA, footer link.
type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const { phone, setPhone, sendOTP } = useAuth();
  const valid = phone.length === 10;

  const onSendOTP = () => {
    if (sendOTP()) {
      navigation.navigate('OTP');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.content}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.logoMark}>
          <Ionicons name="heart" size={28} color={colors.white} />
        </View>

        <Text style={styles.heading}>Welcome back</Text>
        <Text style={styles.subtitle}>
          Sign in to continue finding the right match for your family.
        </Text>

        <View style={styles.form}>
          <PrimaryTextField
            placeholder="Mobile number"
            value={phone}
            onChangeText={(t) => setPhone(t.replace(/[^0-9]/g, ''))}
            keyboardType="number-pad"
            maxLength={10}
            icon="call-outline"
          />
          <PrimaryButton title="Send OTP" onPress={onSendOTP} disabled={!valid} />
        </View>

        <View style={styles.spacer} />

        <Pressable
          style={styles.footer}
          onPress={() => navigation.navigate('Signup')}
          hitSlop={8}
        >
          <Text style={styles.footerText}>New here? </Text>
          <Text style={styles.footerLink}>Create your profile</Text>
        </Pressable>
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
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.huge,
  },
  logoMark: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xxl,
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
  form: {
    marginTop: spacing.xxl,
    gap: spacing.base,
  },
  spacer: {
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: spacing.base,
  },
  footerText: {
    ...type.body,
    color: colors.textSecondary,
  },
  footerLink: {
    ...type.bodyMedium,
    color: colors.primary,
  },
});
