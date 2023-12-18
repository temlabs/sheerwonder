import React from 'react';
import {
  Text,
  View,
  ViewStyle,
  Pressable,
  TextStyle,
  GestureResponderEvent,
  TouchableOpacity,
} from 'react-native';
import colors from '@/theme/colors';

interface Props {
  text: string;
  onPress: (event: GestureResponderEvent) => void;
}

export function LinkButton({text, onPress}: Props): JSX.Element {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={linkTextStyle}>{text}</Text>
    </TouchableOpacity>
  );
}

const linkTextStyle: TextStyle = {
  color: colors.PRIMARY_DARK,
  textDecorationLine: 'underline',
  fontSize: 10,
};
