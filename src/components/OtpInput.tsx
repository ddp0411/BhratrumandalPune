import { useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { colors, radius, spacing, type } from '../theme';

interface OtpInputProps {
  value: string;
  onChangeText: (value: string) => void;
  length?: number;
}

// Six segmented OTP boxes backed by a single hidden input. Tapping anywhere
// focuses it; the active box gets a red border (caret-style highlight).
export default function OtpInput({ value, onChangeText, length = 6 }: OtpInputProps) {
  const inputRef = useRef<TextInput>(null);
  const [focused, setFocused] = useState(false);
  const digits = value.split('');

  const focus = () => inputRef.current?.focus();

  return (
    <Pressable style={styles.row} onPress={focus}>
      {Array.from({ length }).map((_, i) => {
        const active = focused && (i === value.length || (i === length - 1 && value.length === length));
        return (
          <View key={i} style={[styles.box, active && styles.boxActive, digits[i] && styles.boxFilled]}>
            <Text style={styles.digit}>{digits[i] ?? ''}</Text>
          </View>
        );
      })}

      <TextInput
        ref={inputRef}
        style={styles.hiddenInput}
        value={value}
        onChangeText={(t) => onChangeText(t.replace(/[^0-9]/g, '').slice(0, length))}
        keyboardType="number-pad"
        maxLength={length}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        autoFocus
        caretHidden
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  box: {
    flex: 1,
    aspectRatio: 0.85,
    maxWidth: 56,
    borderRadius: radius.input,
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.divider,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxFilled: {
    borderColor: colors.text,
    backgroundColor: colors.white,
  },
  boxActive: {
    borderColor: colors.primary,
    backgroundColor: colors.white,
  },
  digit: {
    ...type.screenTitle,
    color: colors.text,
  },
  hiddenInput: {
    position: 'absolute',
    opacity: 0,
    width: 1,
    height: 1,
  },
});
