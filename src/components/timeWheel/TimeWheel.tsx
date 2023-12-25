import React, {useState} from 'react';
import {ViewStyle, View} from 'react-native';
import Animated, {
  SharedValue,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import colors from '@/theme/colors';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {MAXIMUM_POST_TIME_MS, MINIMUM_POST_TIME_MS} from '@/config/postConfig';

interface Props {
  onEnd: (startPos: number, endPos: number) => void;
  endPos: SharedValue<string>;
  startPos: SharedValue<string>;
  duration: number;
}

export function TimeWheel({onEnd, duration, endPos, startPos}: Props) {
  const [outerViewHeight, setOuterViewHeight] = useState<number>();
  const minimumTime = Math.min(MINIMUM_POST_TIME_MS, duration);
  const minimumHeight = outerViewHeight
    ? outerViewHeight * (minimumTime / duration)
    : 100;
  const maximumHeight = outerViewHeight
    ? (outerViewHeight * Math.min(MAXIMUM_POST_TIME_MS, duration)) / duration
    : undefined;

  const height = useSharedValue<number>(100);
  const top = useSharedValue<number>(0);
  const rangeAction = useSharedValue<
    'CHANGE_START' | 'CHANGE_END' | 'PAN' | undefined
  >(undefined);

  const gesture = Gesture.Pan()
    .hitSlop({top: 20, bottom: 20, left: 60, right: 20})
    .onBegin(e => {
      const buffer = Math.max(0, height.value * 0.2);
      const endOfRange = top.value + height.value - buffer;
      const startOfRange = top.value + buffer;
      if (e.y >= endOfRange) {
        rangeAction.value = 'CHANGE_END';
      } else if (e.y <= startOfRange) {
        rangeAction.value = 'CHANGE_START';
      } else if (e.y > startOfRange && e.y < endOfRange) {
        rangeAction.value = 'PAN';
      }
    })
    .onChange(e => {
      if (rangeAction.value === 'CHANGE_END') {
        const newHeight = e.y - top.value;
        if (
          newHeight > minimumHeight &&
          maximumHeight &&
          newHeight <= maximumHeight
        ) {
          height.value = newHeight;
        }
      } else if (rangeAction.value === 'CHANGE_START') {
        const difference = top.value - e.y;
        const newHeight = height.value + difference;
        if (
          newHeight > minimumHeight &&
          maximumHeight &&
          newHeight <= maximumHeight
        ) {
          top.value = e.y;
          height.value = height.value + difference;
        }
      } else if ((rangeAction.value = 'PAN')) {
        top.value = top.value + e.changeY;
      }

      if (outerViewHeight) {
        const convertMillisecondsToTimestamp = (duration: number): string => {
          let seconds = Math.floor(duration / 1000);
          let minutes = Math.floor(seconds / 60);
          seconds = seconds % 60;
          let hours = Math.floor(minutes / 60);
          minutes = minutes % 60;

          // Formatting the time into 'mm:ss' or 'hh:mm:ss'
          if (hours > 0) {
            return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
          } else {
            return `${pad(minutes)}:${pad(seconds)}`;
          }

          // Helper function to pad numbers with a leading zero if they are less than 10
          function pad(number: number) {
            return number < 10 ? '0' + number : number;
          }
        };
        startPos.value = convertMillisecondsToTimestamp(
          (duration * top.value) / outerViewHeight,
        );
        endPos.value = convertMillisecondsToTimestamp(
          (duration * (top.value + height.value)) / outerViewHeight,
        );
      }
    })
    .onFinalize(() => {
      rangeAction.value = undefined;
      const endOfRange = top.value + height.value;

      if (outerViewHeight && endOfRange > outerViewHeight) {
        height.value = outerViewHeight - top.value;
      }
      if (top.value < 0) {
        const difference = top.value;
        height.value = height.value + difference;
        top.value = 0;
      }
      outerViewHeight &&
        runOnJS(onEnd)(
          top.value / outerViewHeight,
          (top.value + height.value) / outerViewHeight,
        );
    });

  const selectedViewStyle: ViewStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: colors.TEXT_WHITE,
      opacity: 0.6,
      position: 'absolute',
      width: '100%',
      top: top.value,
      left: 0,
      height: height.value,
      maxHeight: outerViewHeight ? outerViewHeight - top.value : undefined,
      justifyContent: 'space-between',
      overflow: 'hidden',
    };
  });

  return (
    <>
      <GestureDetector gesture={gesture}>
        <View
          style={containerViewStyle}
          onLayout={e => setOuterViewHeight(e.nativeEvent.layout.height)}>
          <View style={backgroundViewStyle} />
          <Animated.View style={selectedViewStyle} />
        </View>
      </GestureDetector>
    </>
  );
}

const containerViewStyle: ViewStyle = {
  backgroundColor: colors.PRIMARY_DARK,
  height: '100%',
  width: '100%',
  padding: 0,
  overflow: 'hidden',
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
