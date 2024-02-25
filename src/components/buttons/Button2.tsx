import React from 'react';
import {TouchableOpacity, ViewStyle, Text, TextStyle} from 'react-native';

import colors from '@/theme/colors';
import {ButtonProps} from './buttonTypes';

export function Button2({onPress, text, disabled}: ButtonProps) {
  return (
    <TouchableOpacity
      style={buttonStyle(disabled)}
      onPress={onPress}
      disabled={disabled}>
      <Text style={textStyle(disabled)}>{text}</Text>
    </TouchableOpacity>
  );
}

const buttonStyle: (disabled?: boolean) => ViewStyle = disabled => ({
  //   width: '100%',
  width: 'auto',
  paddingVertical: 5,
  paddingHorizontal: 15,
  borderRadius: 20,
  borderColor: disabled ? colors.PRIMARY_DARK : colors.PRIMARY,
  borderWidth: 1,
});

const textStyle: (disabled?: boolean) => TextStyle = disabled => ({
  textAlign: 'center',
  color: colors.TEXT_WHITE,
  opacity: disabled === true ? 0.8 : 1,
  fontSize: 10,
  fontWeight: '600',
});
