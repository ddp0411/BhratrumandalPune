import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';
import { colors } from '../theme/colors';

// Ported from Views/Home/FilterChipsView.swift — adds a selected state.
const FILTERS = ['New Matches', 'Nearby', 'Community', 'Profession', 'Active'];

export default function FilterChips() {
  const [selected, setSelected] = useState(0);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}
    >
      {FILTERS.map((item, index) => {
        const active = index === selected;
        return (
          <Pressable
            key={item}
            onPress={() => setSelected(index)}
            style={[styles.chip, active && styles.chipActive]}
          >
            <Text style={[styles.text, active && styles.textActive]}>{item}</Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 16,
    gap: 8,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.surface,
  },
  chipActive: {
    backgroundColor: colors.primary,
  },
  text: {
    color: colors.text,
    fontSize: 14,
  },
  textActive: {
    color: colors.white,
    fontWeight: '600',
  },
});
