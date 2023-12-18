import React, {ReactNode} from 'react';
import {Pressable, PressableStateCallbackType, ViewStyle} from 'react-native';
import colors from '@/theme/colors';

interface Props {
  children: ReactNode;
  onPress: () => void;
}

export function BottomTabButton({children, onPress}: Props): JSX.Element {
  return (
    <Pressable onPress={onPress} style={pressableStyle}>
      {children}
    </Pressable>
  );
}

const pressableStyle = (state: PressableStateCallbackType): ViewStyle => {
  const pressed = state.pressed;
  return {
    // backgroundColor: pressed
    //   ? colors.BACKGROUND_DARKER
    //   : colors.BACKGROUND_DARKER,
    padding: 5,
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  };
};
