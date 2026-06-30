import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { colors, spacing, type } from '../theme';
import { AuthStackParamList } from '../navigation/types';

// Splash — calm brand-red screen. The logo mark fades and gently scales in,
// then the screen auto-advances to Login after ~2s.
type Props = NativeStackScreenProps<AuthStackParamList, 'Splash'>;

export default function SplashScreen({ navigation }: Props) {
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.92)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 700, useNativeDriver: true }),
      Animated.spring(scale, { toValue: 1, friction: 7, useNativeDriver: true }),
    ]).start();

    const timer = setTimeout(() => navigation.replace('Login'), 2200);
    return () => clearTimeout(timer);
  }, [navigation, opacity, scale]);

  return (
    <View style={styles.container}>
      <Animated.View style={{ opacity, transform: [{ scale }], alignItems: 'center' }}>
        <View style={styles.logoMark}>
          <Ionicons name="heart" size={44} color={colors.primary} />
        </View>
        <Text style={styles.title}>Bhratrumandal</Text>
        <Text style={styles.subtitle}>PUNE</Text>
      </Animated.View>

      <Animated.Text style={[styles.tagline, { opacity }]}>
        Trusted matches for your community
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoMark: {
    width: 96,
    height: 96,
    borderRadius: 28,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
  },
  title: {
    ...type.largeTitle,
    color: colors.white,
  },
  subtitle: {
    ...type.sectionHeading,
    color: 'rgba(255,255,255,0.85)',
    letterSpacing: 8,
    marginTop: spacing.xs,
  },
  tagline: {
    position: 'absolute',
    bottom: spacing.huge,
    ...type.body,
    color: 'rgba(255,255,255,0.85)',
  },
});
