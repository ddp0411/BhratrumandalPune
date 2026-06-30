import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  KeyboardTypeOptions,
  StyleSheet,
  TextInput,
  View,
  ViewStyle,
} from 'react-native';
import { colors, radius, spacing, type } from '../theme';

interface PrimaryTextFieldProps {
  placeholder: string;
  value: string;
  onChangeText: (value: string) => void;
  keyboardType?: KeyboardTypeOptions;
  maxLength?: number;
  icon?: keyof typeof Ionicons.glyphMap;
  autoCapitalize?: 'none' | 'words' | 'sentences' | 'characters';
  style?: ViewStyle;
}

// Input fields per spec: height 56, radius 14, soft gray fill, no underline,
// icon inside, gray placeholder. Border subtly highlights on focus.
export default function PrimaryTextField({
  placeholder,
  value,
  onChangeText,
  keyboardType = 'default',
  maxLength,
  icon,
  autoCapitalize = 'none',
  style,
}: PrimaryTextFieldProps) {
  const [focused, setFocused] = useState(false);

  return (
    <View style={[styles.field, focused && styles.fieldFocused, style]}>
      {icon ? (
        <Ionicons
          name={icon}
          size={20}
          color={focused ? colors.primary : colors.textSecondary}
          style={styles.icon}
        />
      ) : null}
      <TextInput
        style={[type.body, styles.input]}
        placeholder={placeholder}
        placeholderTextColor={colors.textSecondary}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        maxLength={maxLength}
        autoCapitalize={autoCapitalize}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    height: 56,
    borderRadius: radius.input,
    backgroundColor: colors.surface,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.base,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  fieldFocused: {
    borderColor: colors.primary,
    backgroundColor: colors.white,
  },
  icon: {
    marginRight: spacing.md,
  },
  input: {
    flex: 1,
    color: colors.text,
    paddingVertical: 0,
  },
});
