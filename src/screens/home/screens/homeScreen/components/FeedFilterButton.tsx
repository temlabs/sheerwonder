import React, {ReactNode} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  ViewStyle,
  Pressable,
  GestureResponderEvent,
} from 'react-native';

interface Props {
  children?: ReactNode;
  onPress: (event: GestureResponderEvent) => void;
}

export function FeedFilterButton({children, onPress}: Props): JSX.Element {
  return (
    <Pressable style={pressableStyle} onPress={onPress}>
      {children}
    </Pressable>
  );
}

const pressableStyle: ViewStyle = {
  flexGrow: 1,
  alignItems: 'center',
  justifyContent: 'center',
};
