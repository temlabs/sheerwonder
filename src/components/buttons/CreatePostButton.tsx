import React, {ReactNode} from 'react';
import {
  View,
  ViewStyle,
  Pressable,
  GestureResponderEvent,
  TouchableOpacity,
} from 'react-native';
import colors from '@/theme/colors';
import {Write} from '../icons/Write';

export function CreatePostButton({onPress}: {onPress: () => void}) {
  return (
    <TouchableOpacity style={containerStyle} onPress={onPress}>
      <Write width={30} height={30} fill={colors.TEXT_WHITE} />
    </TouchableOpacity>
  );
}

const containerStyle: ViewStyle = {
  height: 50,
  width: 50,
  borderRadius: 10,
  backgroundColor: colors.PRIMARY,
  justifyContent: 'center',
  alignItems: 'center',
};
