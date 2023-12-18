import React, {ReactNode, useRef} from 'react';
import {ViewStyle, Animated, TouchableWithoutFeedback} from 'react-native';

interface Props {
  children: ReactNode;
  onPress: () => void;
}

export function CommentWrapper({children, onPress}: Props): JSX.Element {
  const fadeAnimation = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    Animated.timing(fadeAnimation, {
      toValue: 1,
      duration: 0,
      useNativeDriver: false,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnimation, {
      toValue: 0,
      duration: 50,
      useNativeDriver: false,
    }).start();
  };

  const backgroundColor = fadeAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['transparent', 'rgba(255,255,255,0.05)'], // Change to your desired color
  });

  return (
    <TouchableWithoutFeedback
      delayPressIn={50}
      onPressIn={fadeIn}
      onPressOut={fadeOut}
      onPress={onPress}>
      <Animated.View
        style={[commentWrapperStyle, {backgroundColor: backgroundColor}]}>
        {children}
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}

const commentWrapperStyle: ViewStyle = {
  paddingVertical: 20,
  paddingHorizontal: 30,
  gap: 15,
  marginBottom: 10,
  backgroundColor: 'transparent',
  alignItems: 'center',
  overflow: 'hidden',
};
