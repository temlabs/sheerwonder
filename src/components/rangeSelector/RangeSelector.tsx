import React from 'react';
import {ViewStyle, View, LayoutChangeEvent} from 'react-native';
import Animated, {SharedValue, useAnimatedStyle} from 'react-native-reanimated';
import colors from '@/theme/colors';
import {
  ComposedGesture,
  GestureDetector,
  GestureType,
} from 'react-native-gesture-handler';

interface Props {
  top: SharedValue<number>;
  height: SharedValue<number>;
  gesture: ComposedGesture | GestureType;
  onLayout: (event: LayoutChangeEvent) => void;
}

export function RangeSelector({top, height, gesture, onLayout}: Props) {
  const selectedViewStyle: ViewStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: colors.TEXT_WHITE,
      opacity: 0.6,
      position: 'absolute',
      width: '100%',
      top: top.value,
      left: 0,
      height: height.value,
      // maxHeight: rangeSelectorHeight ? rangeSelectorHeight - top.value : undefined,
      justifyContent: 'space-between',
      overflow: 'hidden',
    };
  });

  return (
    <>
      <GestureDetector gesture={gesture}>
        <View style={outerViewStyle}>
          <View style={containerViewStyle} onLayout={onLayout}>
            <View style={backgroundViewStyle} />
            <Animated.View style={selectedViewStyle} />
          </View>
        </View>
      </GestureDetector>
    </>
  );
}

const outerViewStyle: ViewStyle = {
  width: '100%',
  alignItems: 'flex-end',
};

const containerViewStyle: ViewStyle = {
  backgroundColor: colors.PRIMARY_DARK,
  height: '100%',
  width: '40%',
  padding: 0,
};

const backgroundViewStyle: ViewStyle = {
  backgroundColor: colors.BACKGROUND_LIGHT,
  opacity: 0.6,
  height: '100%',
  width: '100%',
  position: 'absolute',
  left: 0,
  top: 0,
};
