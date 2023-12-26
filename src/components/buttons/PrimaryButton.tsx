import React from 'react';
import {TouchableOpacity, ViewStyle, Text, TextStyle} from 'react-native';

import colors from '@/theme/colors';

interface Props {
  onPress: () => void;
  text: string;
  disabled?: boolean;
}

export function PrimaryButton({onPress, text, disabled}: Props) {
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
  paddingVertical: 10,
  paddingHorizontal: 20,
  backgroundColor: disabled === true ? colors.PRIMARY_DARK : colors.PRIMARY,
  borderRadius: 20,
});

const textStyle: (disabled?: boolean) => TextStyle = disabled => ({
  textAlign: 'center',
  color: colors.TEXT_WHITE,
  opacity: disabled === true ? 0.8 : 1,
});
