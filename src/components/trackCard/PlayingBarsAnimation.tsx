import React, {useEffect} from 'react';
import {ViewStyle, InteractionManager, View} from 'react-native';
import Animated, {
  FadeOut,
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

const PlayingBarsAnimation = ({isPlaying = false}: {isPlaying: boolean}) => {
  const height = useSharedValue<number>(0);
  const height2 = useSharedValue<number>(0);
  const height3 = useSharedValue<number>(0);
  const opacity = useSharedValue<number>(0.5);

  InteractionManager.runAfterInteractions(() => {
    if (isPlaying) {
      opacity.value = 0.5;
      const duration = 1000;
      height.value = 0;
      height.value = withRepeat(
        withTiming(100, {duration: duration}),
        -1,
        true,
      );
      height2.value = 0;
      height2.value = withDelay(
        200,
        withRepeat(withTiming(100, {duration: duration}), -1, true),
      );

      height3.value = 0;
      height3.value = withDelay(
        600,
        withRepeat(withTiming(100, {duration: duration}), -1, true),
      );
    } else {
      cancelAnimation(height);
      height.value = withTiming(0);
      cancelAnimation(height2);
      height2.value = withTiming(0);
      cancelAnimation(height3);
      height3.value = withTiming(0);
    }
  });

  const barStyle = useAnimatedStyle(() => {
    return {
      ...bar,
      height: `${height.value}%`,
    };
  });
  const bar2Style = useAnimatedStyle(() => {
    return {
      ...bar,
      height: `${height2.value}%`,
    };
  });

  const bar3Style = useAnimatedStyle(() => {
    return {
      ...bar,
      height: `${height3.value}%`,
    };
  });

  const container = useAnimatedStyle(() => {
    return {
      alignItems: 'flex-end',
      flexDirection: 'row',
      height: '100%',
      justifyContent: 'space-between',
      width: '100%',
      backgroundColor: 'transparent',
      opacity: 0.5,
    };
  });

  return (
    <View style={{width: '100%', height: '100%'}}>
      {true && (
        <Animated.View
          key={'cont'}
          style={container}
          exiting={FadeOut.duration(300).withCallback(() =>
            console.log('finished'),
          )}>
          <Animated.View key={1} style={barStyle} />
          <Animated.View key={2} style={bar2Style} />
          <Animated.View key={3} style={bar3Style} />
        </Animated.View>
      )}
    </View>
  );
};

const bar: ViewStyle = {
  backgroundColor: 'white',
  flexShrink: 0,
  width: '30%',
};

export default PlayingBarsAnimation;
