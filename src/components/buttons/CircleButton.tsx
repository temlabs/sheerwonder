import React, {ReactNode} from 'react';
import {View, ViewStyle, Pressable, GestureResponderEvent} from 'react-native';
import colors from '@/theme/colors';

interface Props {
  children?: ReactNode;
  onPress: (event: GestureResponderEvent) => void;
}

export function CircleButton({children, onPress}: Props): JSX.Element {
  return (
    <Pressable
      style={state => {
        return {
          ...containerStyle,
          backgroundColor: state.pressed ? colors.PRIMARY_DARK : colors.PRIMARY,
        };
      }}
      onPress={onPress}>
      {children}
    </Pressable>
  );
}

const containerStyle: ViewStyle = {
  height: 50,
  width: 50,
  borderRadius: 25,
  backgroundColor: colors.PRIMARY,
};
