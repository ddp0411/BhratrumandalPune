import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PrimaryButton from '../components/PrimaryButton';
import PrimaryTextField from '../components/PrimaryTextField';
import StepIndicator from '../components/StepIndicator';
import { useAuth } from '../context/AuthContext';
import { colors, radius, spacing, type } from '../theme';
import { AuthStackParamList } from '../navigation/types';

// Signup — split into small steps instead of one long form. Phase 1 implements
// Basic Information, Education, and Location, then completes the profile.
type Gender = 'Male' | 'Female';
const GENDERS: Gender[] = ['Male', 'Female'];
const STEPS = ['Basic Information', 'Education', 'Location'];

type Props = NativeStackScreenProps<AuthStackParamList, 'Signup'>;

export default function SignupScreen({ navigation }: Props) {
  const { login } = useAuth();
  const [step, setStep] = useState(0);

  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState<Gender>('Male');
  const [education, setEducation] = useState('');
  const [profession, setProfession] = useState('');
  const [city, setCity] = useState('');
  const [community, setCommunity] = useState('');

  const canContinue =
    (step === 0 && name.trim().length > 0) ||
    (step === 1 && education.trim().length > 0) ||
    (step === 2 && city.trim().length > 0);

  const isLast = step === STEPS.length - 1;

  const goBack = () => (step === 0 ? navigation.goBack() : setStep((s) => s - 1));
  const goNext = () => (isLast ? login() : setStep((s) => s + 1));

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.header}>
          <Pressable style={styles.back} onPress={goBack} hitSlop={8}>
            <Ionicons name="chevron-back" size={26} color={colors.text} />
          </Pressable>
          <Text style={styles.stepCount}>
            Step {step + 1} of {STEPS.length}
          </Text>
        </View>

        <View style={styles.indicator}>
          <StepIndicator total={STEPS.length} current={step} />
        </View>

        <ScrollView
          style={styles.flex}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.heading}>{STEPS[step]}</Text>
          <Text style={styles.subtitle}>
            {step === 0 && 'Tell us a little about yourself to get started.'}
            {step === 1 && 'Your education and profession help find better matches.'}
            {step === 2 && 'Where are you based and which community do you belong to?'}
          </Text>

          <View style={styles.form}>
            {step === 0 && (
              <>
                <PrimaryTextField
                  placeholder="Full name"
                  value={name}
                  onChangeText={setName}
                  icon="person-outline"
                  autoCapitalize="words"
                />
                <PrimaryTextField
                  placeholder="Date of birth (DD/MM/YYYY)"
                  value={dob}
                  onChangeText={setDob}
                  icon="calendar-outline"
                />
                <View style={styles.segment}>
                  {GENDERS.map((g) => {
                    const active = gender === g;
                    return (
                      <Pressable
                        key={g}
                        onPress={() => setGender(g)}
                        style={[styles.segmentItem, active && styles.segmentItemActive]}
                      >
                        <Text style={[styles.segmentText, active && styles.segmentTextActive]}>
                          {g}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              </>
            )}

            {step === 1 && (
              <>
                <PrimaryTextField
                  placeholder="Highest education"
                  value={education}
                  onChangeText={setEducation}
                  icon="school-outline"
                  autoCapitalize="words"
                />
                <PrimaryTextField
                  placeholder="Profession"
                  value={profession}
                  onChangeText={setProfession}
                  icon="briefcase-outline"
                  autoCapitalize="words"
                />
              </>
            )}

            {step === 2 && (
              <>
                <PrimaryTextField
                  placeholder="City"
                  value={city}
                  onChangeText={setCity}
                  icon="location-outline"
                  autoCapitalize="words"
                />
                <PrimaryTextField
                  placeholder="Community"
                  value={community}
                  onChangeText={setCommunity}
                  icon="people-outline"
                  autoCapitalize="words"
                />
              </>
            )}
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <PrimaryButton
            title={isLast ? 'Create Profile' : 'Continue'}
            onPress={goNext}
            disabled={!canContinue}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flex: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.base,
    paddingTop: spacing.sm,
  },
  back: {
    width: 44,
    height: 44,
    justifyContent: 'center',
  },
  stepCount: {
    ...type.caption,
    color: colors.textSecondary,
    marginLeft: spacing.xs,
  },
  indicator: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.sm,
    paddingBottom: spacing.lg,
  },
  content: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
  },
  heading: {
    ...type.screenTitle,
    color: colors.text,
  },
  subtitle: {
    ...type.body,
    color: colors.textSecondary,
    marginTop: spacing.sm,
    lineHeight: 24,
  },
  form: {
    marginTop: spacing.xl,
    gap: spacing.base,
  },
  segment: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: radius.input,
    padding: spacing.xs,
  },
  segmentItem: {
    flex: 1,
    paddingVertical: spacing.md,
    borderRadius: radius.input - 4,
    alignItems: 'center',
  },
  segmentItemActive: {
    backgroundColor: colors.white,
  },
  segmentText: {
    ...type.bodyMedium,
    color: colors.textSecondary,
  },
  segmentTextActive: {
    color: colors.primary,
  },
  footer: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
    paddingBottom: spacing.base,
    borderTopWidth: 1,
    borderTopColor: colors.divider,
  },
});
