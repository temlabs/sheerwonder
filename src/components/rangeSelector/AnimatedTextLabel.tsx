import {View, Text, TextStyle, TextInputProps, TextInput} from 'react-native';
import React from 'react';
import colors from '@/theme/colors';
import Animated, {SharedValue, useAnimatedProps} from 'react-native-reanimated';

interface Props {
  label: string;
  value: SharedValue<string>;
}
Animated.addWhitelistedNativeProps({text: true});
export function AnimatedTextLabel({value, label}: Props) {
  const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
  const animatedProps = useAnimatedProps(() => {
    return {
      // value: value.value,
      text: value.value,
    } as TextInputProps;
  });

  return (
    <View>
      <Text style={labelStyle}>{label}</Text>
      <AnimatedTextInput
        underlineColorAndroid="transparent"
        editable={false}
        value={value.value}
        style={valueStyle}
        {...{animatedProps}}
      />
    </View>
  );
}

const labelStyle: TextStyle = {
  fontSize: 10,
  color: colors.TEXT_WHITE,
  opacity: 0.6,
  textAlign: 'left',
};

const valueStyle: TextStyle = {
  fontSize: 20,
  color: colors.TEXT_WHITE,
  textAlign: 'left',
};
