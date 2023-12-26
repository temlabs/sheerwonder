import React from 'react';
import {TouchableOpacity, ViewStyle, Text, TextStyle} from 'react-native';

import colors from '@/theme/colors';

interface Props {
  onPress: () => void;
  text: string;
}

export function ActionButton({onPress, text}: Props) {
  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress}>
      <Text style={textStyle}>{text}</Text>
    </TouchableOpacity>
  );
}

const buttonStyle: ViewStyle = {
  //   width: '100%',
  width: 'auto',
  paddingVertical: 10,
  paddingHorizontal: 5,
  backgroundColor: colors.PRIMARY,
  borderRadius: 10,
};

const textStyle: TextStyle = {
  textAlign: 'center',
  color: colors.TEXT_WHITE,
};
