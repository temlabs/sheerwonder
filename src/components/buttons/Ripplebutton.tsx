import React, {useRef} from 'react';
import {
  ViewStyle,
  View,
  PressableProps,
  TouchableOpacityProps,
  ViewProps,
  Pressable,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';

function RippleButton(
  props: ViewProps & {onPress: () => void; disabled?: boolean},
): React.JSX.Element {
  const tap = Gesture.Tap();
  const widthRef = useRef(0);

  const initialDiameter = 10;
  const animationDuration = 400;
  const maxScale = 25;
  const initialOpacity = 0.3;

  //   const radius =
  const scaleAnimation = useSharedValue(1);
  const xLocationAnimation = useSharedValue(0);
  const yLocationAnimation = useSharedValue(0);
  const opacityAnimation = useSharedValue(0);

  const startRippleAnimation = () => {};

  const circleStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    height: initialDiameter,
    width: initialDiameter,
    backgroundColor: 'white',
    top: yLocationAnimation.value,
    left: xLocationAnimation.value,
    transform: [{scale: scaleAnimation.value}],
    borderRadius: initialDiameter / 2,
    opacity: opacityAnimation.value,
  }));

  const getScale = (xLocation: number) => {
    const a = 4;
    const ya = maxScale;
    const xa = widthRef.current;
    return a * Math.pow((a + ya) / a, xLocation / xa) - a;
  };

  tap.onBegin(e => {
    const xLocation = e.x;
    const proportion = widthRef.current ? xLocation / widthRef.current : 1;
    if (proportion > 0.7) {
      props.onPress();
    }
    const scale = widthRef.current ? getScale(xLocation) : maxScale;
    const yLocation = e.y;
    opacityAnimation.value = initialOpacity;
    scaleAnimation.value = 0;
    xLocationAnimation.value = xLocation;
    yLocationAnimation.value = yLocation;
    opacityAnimation.value = withTiming(0, {duration: animationDuration});
    scaleAnimation.value = withTiming(scale * proportion, {
      duration: animationDuration,
    });
  });

  return (
    <GestureDetector gesture={tap}>
      <Pressable onPress={() => {}} style={{overflow: 'hidden'}}>
        <View
          {...props}
          onLayout={e => (widthRef.current = e.nativeEvent.layout.width)}>
          {props.children}
          <Animated.View style={circleStyle} />
        </View>
      </Pressable>
    </GestureDetector>
  );
}

const circleContainerViewStyle: ViewStyle = {
  //   height: '100%',
  //   width: '100%',
  //   backgroundColor: 'transparent',
  overflow: 'hidden',
};

export default RippleButton;
