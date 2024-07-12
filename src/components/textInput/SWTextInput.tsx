import colors from '@/theme/colors';
import {gap} from '@/theme/gap';
import {padding} from '@/theme/padding';
import {typography} from '@/theme/typography';
import {BackdropBlur, Canvas, Rect} from '@shopify/react-native-skia';
import React from 'react';
import {
  View,
  ViewStyle,
  TextInput,
  TextInputProps,
  Text,
  TextStyle,
} from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Mail} from '../icons/Mail';

interface Props extends TextInputProps {
  label: string;
}

export function SWTextInput(props: Props) {
  const focusedBorderWidth = 3;
  const blurredBorderWidth = 1;
  const focusedBorderColor = colors.white;
  const blurredBorderColor = colors.white_o_72;

  const isFocused = useSharedValue<boolean>(!!props.autoFocus);
  const borderWidth = useSharedValue<number>(
    isFocused.value ? focusedBorderWidth : blurredBorderWidth,
  );
  const borderColorTransition = useSharedValue<number>(isFocused.value ? 1 : 0);

  useAnimatedReaction(
    () => isFocused.value,
    f => {
      if (f) {
        borderColorTransition.value = withTiming(1);
        borderWidth.value = withTiming(focusedBorderWidth);
      } else {
        borderColorTransition.value = !!props.value
          ? withTiming(1)
          : withTiming(0);
        borderWidth.value = !!props.value
          ? withTiming(0)
          : withTiming(blurredBorderWidth);
      }
    },
  );

  const borderTLAnimatedStyle = useAnimatedStyle<ViewStyle>(() => {
    const color = interpolateColor(
      borderColorTransition.value,
      [0, 1],
      [blurredBorderColor, focusedBorderColor],
    );
    return {
      borderTopWidth: borderWidth.value,
      borderLeftWidth: borderWidth.value,
      borderColor: color,
    };
  });

  const borderBRAnimatedStyle = useAnimatedStyle<ViewStyle>(() => {
    const color = interpolateColor(
      borderColorTransition.value,
      [0, 1],
      [blurredBorderColor, focusedBorderColor],
    );
    return {
      borderBottomWidth: borderWidth.value,
      borderRightWidth: borderWidth.value,
      borderColor: color,
    };
  });

  return (
    <View style={container}>
      {/* <Text style={[typography.small, {opacity: 0.7, fontWeight: '800'}]}>
        {props.label}
      </Text> */}
      <View style={inputContainer}>
        {/* <Animated.View style={[bottomRightBorder, borderBRAnimatedStyle]} />
        <Animated.View style={[topLeftBorder, borderTLAnimatedStyle]} /> */}
        <Canvas
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            left: 0,
            top: 0,
          }}>
          <Rect
            x={0}
            y={0}
            height={400}
            width={500}
            color={'white'}
            opacity={0.01}
          />
          <BackdropBlur blur={60} color={'white'} />
        </Canvas>
        <View style={inputAndIcon}>
          {/* <Mail fill={'white'} /> */}
          <TextInput
            {...props}
            numberOfLines={1}
            style={[inputStyle, typography.p]}
            onFocus={e => {
              isFocused.value = true;
              props.onFocus && props.onFocus(e);
            }}
            onBlur={e => {
              isFocused.value = false;
              props.onBlur && props.onBlur(e);
            }}></TextInput>
        </View>
      </View>
    </View>
  );
}

const container: ViewStyle = {
  //   height: '100%',
  gap: gap.small,
  //   width: '100%',
};
const inputStyle: TextStyle = {
  width: '100%',

  backgroundColor: 'transparent',
};

const inputContainer: ViewStyle = {
  // padding: padding.small,

  borderWidth: 0,
  borderRadius: 10,
  borderColor: 'grey',
  overflow: 'hidden',
};

const inputAndIcon: ViewStyle = {
  padding: 12,
  flexDirection: 'row',
  alignItems: 'center',
  gap: 8,
};
