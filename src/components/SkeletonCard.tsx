import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { colors, radius, shadow, spacing } from '../theme';

// Loading placeholder that mirrors the ProfileCard shape with a gentle shimmer.
// Used instead of spinners while the feed "loads".
export default function SkeletonCard() {
  const shimmer = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmer, { toValue: 1, duration: 800, useNativeDriver: true }),
        Animated.timing(shimmer, { toValue: 0, duration: 800, useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [shimmer]);

  const opacity = shimmer.interpolate({ inputRange: [0, 1], outputRange: [0.5, 1] });

  return (
    <View style={styles.card}>
      <Animated.View style={[styles.photo, { opacity }]} />
      <View style={styles.body}>
        <Animated.View style={[styles.line, { width: '60%', opacity }]} />
        <Animated.View style={[styles.line, { width: '80%', opacity }]} />
        <Animated.View style={[styles.line, { width: '40%', opacity }]} />
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
  photo: {
    height: 280,
    backgroundColor: colors.surface,
  },
  body: {
    padding: spacing.lg,
    gap: spacing.md,
  },
  line: {
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.surface,
  },
});
