import React from 'react';
import {
  Text,
  View,
  ViewStyle,
  Pressable,
  TextStyle,
  GestureResponderEvent,
} from 'react-native';
import colors from '@/theme/colors';

interface Props {
  text: string;
  onPress: (event: GestureResponderEvent) => void;
  selected?: boolean;
}

export function TabButton({text, selected, onPress}: Props): JSX.Element {
  return (
    <Pressable onPressIn={onPress} style={buttonContainerViewStyle}>
      <View style={innerContainerViewStyle}>
        <Text
          style={[
            buttonTextStyle,
            selected ? {color: colors.TEXT_PRIMARY} : undefined,
          ]}>
          {text}
        </Text>
        <View
          style={[
            highlightViewStyle,
            selected ? {backgroundColor: colors.PRIMARY} : undefined,
          ]}
        />
      </View>
    </Pressable>
  );
}

const buttonContainerViewStyle: ViewStyle = {
  paddingTop: 10,
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  //   width: '100%',
  flexGrow: 1,
};

const innerContainerViewStyle: ViewStyle = {
  width: 'auto',
  gap: 5,
};

const buttonTextStyle: TextStyle = {
  color: colors.NEUTRAL_GREY,
};

const highlightViewStyle: ViewStyle = {
  height: 5,
  width: 'auto',
  backgroundColor: 'transparent',
};
