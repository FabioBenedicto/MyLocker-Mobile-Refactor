import React from 'react';
import { TouchableOpacity } from 'react-native';

import useDarkTheme from '../../hooks/useDarkTheme';

import DARK from '../../theme/dark';
import LIGHT from '../../theme/light';

import { CaretCircleLeft } from 'phosphor-react-native';

export default function Back({ action }) {
  const { darkTheme } = useDarkTheme();
  return (
    <TouchableOpacity 
    activeOpacity={0.8} 
    onPress={action}
    >
      <CaretCircleLeft
        size={32}
        color={darkTheme 
          ? DARK.COLORS.BUTTON_BACKGROUND 
          : LIGHT.COLORS.BUTTON_BACKGROUND}
        weight="bold"
      />
      </TouchableOpacity>
  );
}
