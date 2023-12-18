import {StoryChapterProps} from '@/demo/types';
import React, {useRef} from 'react';
import {
  ViewStyle,
  Dimensions,
  ScrollView,
  TextStyle,
  NativeSyntheticEvent,
  NativeScrollEvent,
  View,
} from 'react-native';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {useHeaderHeight} from '@react-navigation/elements';
import colors from '@/theme/colors';
import {ChapterText} from './ChapterText';
import Animated, {
  SharedValue,
  useAnimatedProps,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {TAB_BAR_HEIGHT} from '@/navigators/config';

export function StoryChapter(
  props: StoryChapterProps & {
    onScrollToPrevious: (index: number) => void;
    onScrollToNext: (index: number) => void;
  },
): JSX.Element {
  const bottomTabBarHeight = useBottomTabBarHeight();

  const screenHeight = Dimensions.get('screen').height;
  const screenWidth = Dimensions.get('screen').width;
  const headerHeight = useHeaderHeight();
  const contentContainerStyle: ViewStyle = {
    width: '95%',
    justifyContent: 'flex-start',
    flexWrap: 'nowrap',
    alignSelf: 'center',
    // maxHeight: screenHeight,
    overflow: 'hidden',
    paddingTop: headerHeight,
    paddingBottom: 2 * bottomTabBarHeight,
    alignItems: 'center',
  };

  const isAtBottom = useSharedValue<boolean>(false);
  const startedGestureAtBottom = useSharedValue<boolean>(false);
  const isAtTop = useSharedValue<boolean>(true);
  // const scrollPosition = useSharedValue<number>(0);
  // const scrollHeight = useRef<number>();
  const scrollviewRef = useRef<Animated.ScrollView>(null);
  const bottomButtonHeight = useSharedValue<number>(0);

  const panGesture = Gesture.Pan()
    .onBegin(e => {
      startedGestureAtBottom.value = isAtBottom.value;
    })
    .onUpdate(e => {
      if (startedGestureAtBottom.value === true) {
        bottomButtonHeight.value = -1 * e.translationY;
      }
    })
    .onFinalize(e => {
      if (startedGestureAtBottom.value === true) {
        // bottomButtonHeight.value = withSpring(0, {mass: 0.5, damping: 80});
        // bottomButtonHeight.value = withTiming(0);
      }
    });

  const nativeGesture = Gesture.Native();

  const composedGestures = Gesture.Simultaneous(nativeGesture, panGesture);

  const scrollHandler = useAnimatedScrollHandler({
    // onBeginDrag: event => {
    //   console.log('begin');
    //   console.log(event.contentOffset.y);
    //   if (event.contentOffset.y === 0) {
    //     isAtTop.value = true;
    //   }
    //   if (
    //     event.layoutMeasurement.height + event.contentOffset.y >=
    //     event.contentSize.height
    //   ) {
    //     isAtBottom.value = true;
    //   }
    // },
    // onScroll: event => {
    //   console.log('scrolling');
    //   scrollPosition.value = event.contentOffset.y;
    // },
    onScroll: event => {
      if (event.contentOffset.y === 0) {
        isAtTop.value = true;
      }
      if (
        isAtBottom.value === false &&
        event.layoutMeasurement.height + event.contentOffset.y >=
          event.contentSize.height
      ) {
        isAtBottom.value = true;
      } else if (isAtBottom.value) {
        isAtBottom.value = false;
      }
    },
  });

  const bottomButtonStyle = useAnimatedStyle(() => {
    return {
      height: Math.max(0, bottomButtonHeight.value),
      width: '100%',
      backgroundColor: 'purple',
      flexGrow: 1,
      position: 'absolute',
      bottom: 2 * bottomTabBarHeight,
      // transform: [{translateY: -bottomButtonHeight.value}],
    };
  });

  const scrollViewStyle = useAnimatedStyle(() => {
    return {
      width: screenWidth,
      // flexShrink: 1,
      minHeight: screenHeight,
      // transform: [{translateY: -bottomButtonHeight.value}],
    };
  });

  return (
    <View style={{height: screenHeight}}>
      <GestureDetector gesture={composedGestures}>
        <Animated.ScrollView
          // scrollEventThrottle={90}
          ref={scrollviewRef}
          scrollEnabled={true}
          overScrollMode="always"
          bounces={true}
          contentContainerStyle={contentContainerStyle}
          onScroll={scrollHandler}
          showsVerticalScrollIndicator={false}
          style={scrollViewStyle}>
          <ChapterText text={props.text} />
          <ChapterText text={props.text} />
        </Animated.ScrollView>
      </GestureDetector>
      <Animated.View style={bottomButtonStyle} />
    </View>
  );
}
