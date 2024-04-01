import React, {useRef} from 'react';
import {Pressable, View, ViewStyle, Animated} from 'react-native';
import {Svg, Rect, Defs, LinearGradient, Stop} from 'react-native-svg';

interface Props {
  onPress: () => void;
  activeColor?: string;
  disabled?: boolean;
  style?: ViewStyle;
}

export function GradientButton(props: Props) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 0.5,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable style={props.style} onPressIn={fadeIn} onPressOut={fadeOut}>
      <Animated.View style={{opacity: fadeAnim}}>
        <Svg width="100%" height="100%">
          <Defs>
            <LinearGradient
              //animatedProps={animatedProps}
              x1={'0%'}
              x2={'100%'}
              y1={'100%'}
              y2={'100%'}
              id={'grad'}>
              <Stop offset="70%" stopColor="rgb(255,255,255)" stopOpacity="0" />
              <Stop
                offset="100%"
                stopColor={props.activeColor ?? 'rgb(255,255,255)'}
                stopOpacity="0.5"
              />
            </LinearGradient>
          </Defs>
          <Rect x="0" y="0" width="100%" height="100%" fill="url(#grad)" />
        </Svg>
      </Animated.View>
    </Pressable>
  );
}
