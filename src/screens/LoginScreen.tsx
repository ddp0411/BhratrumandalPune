import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
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
import { AuthStackParamList } from '../navigation/types';

// Ported from Views/LoginView.swift (brace bug fixed; .fullScreenCover replaced
// with stack navigation to the OTP screen).
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
        <Text style={styles.heading}>Welcome Back</Text>

        <PrimaryTextField
          placeholder="Enter Mobile Number"
          value={phone}
          onChangeText={(t) => setPhone(t.replace(/[^0-9]/g, ''))}
          keyboardType="number-pad"
          maxLength={10}
        />

        <PrimaryButton title="Send OTP" onPress={onSendOTP} disabled={!valid} />

        <View style={styles.spacer} />

        <Pressable onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.link}>New here? Create your profile</Text>
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
    padding: 24,
    gap: 20,
  },
  heading: {
    ...fonts.title,
    color: colors.text,
    marginTop: 24,
  },
  spacer: {
    flex: 1,
  },
  link: {
    color: colors.primary,
    textAlign: 'center',
    fontWeight: '600',
  },
});
