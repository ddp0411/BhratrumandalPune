import React from 'react';
import { KeyboardTypeOptions, StyleSheet, TextInput } from 'react-native';
import { colors } from '../theme/colors';

// Ported from Views/Components/TextFieldComponents.swift (PrimaryTextField)
interface PrimaryTextFieldProps {
  placeholder: string;
  value: string;
  onChangeText: (value: string) => void;
  keyboardType?: KeyboardTypeOptions;
  maxLength?: number;
}

export default function PrimaryTextField({
  placeholder,
  value,
  onChangeText,
  keyboardType = 'default',
  maxLength,
}: PrimaryTextFieldProps) {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor={colors.grayText}
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      maxLength={maxLength}
      autoCapitalize="none"
    />
  );
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    padding: 16,
    borderRadius: 10,
    backgroundColor: colors.surface,
    fontSize: 16,
    color: colors.text,
  },
});
