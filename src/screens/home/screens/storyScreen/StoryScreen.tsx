import {HomeScreenProps} from '@/screens/types';
import React, {useRef} from 'react';
import {View, Text, ViewStyle, ImageStyle, Dimensions} from 'react-native';
import colors from '@/theme/colors';
import {posts} from '@/demo/posts';
import {isStory} from '@/utils/feedUtils';
import {useHeaderHeight} from '@react-navigation/elements';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';

import {StoryChapter} from './components/StoryChapter';
import {StoryChapterProps} from '@/demo/types';
import {TrackCard} from '@/components/trackCard/TrackCard';
import {LinearGradientBackground} from '@/components/LinearGradientBackground';
import Animated, {
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export function StoryScreen({navigation, route}: HomeScreenProps): JSX.Element {
  const headerHeight = useHeaderHeight();
  const parentScrollEnabled = useSharedValue<boolean>(false);
  const bottomTabBarHeight = useBottomTabBarHeight();
  const storyId = route.params?.storyId;
  const viewTranslation = useSharedValue<number>(0);

  const animatedViewStyle = useAnimatedStyle(() => ({
    // height: Dimensions.get('screen').height,
    flex: 1,
    width: '100%',
    padding: 0,
    margin: 0,
    transform: [{translateY: viewTranslation.value}],
  }));
  const story = posts.find(p => p.id === storyId);
  if (!story || !isStory(story)) {
    return <></>;
  }

  const screenHeight = Dimensions.get('screen').height;
  const screenWidth = Dimensions.get('screen').width;
  // const slideHeight = screenHeight - headerHeight - bottomTabBarHeight;

  let coverBackgroundColor: string = colors.BACKGROUND;

  const backgroundViewStyle: ViewStyle = {
    position: 'absolute',
    backgroundColor: coverBackgroundColor,
    width: '100%',
    height: '100%',
  };
  const flatListRef = useRef<Animated.FlatList<StoryChapterProps>>(null);

  // const scrollY = new Animated.Value(0);
  const offsets = story.chapters.map((s, i) => i * screenHeight);
  // const trackBarLeft = Animated.multiply(
  //   Animated.divide(scrollY, screenHeight),
  //   -screenWidth,
  // );
  // console.log({offsets, screenHeight, bottomTabBarHeight, headerHeight});
  // const trackBarLeft = scrollY.interpolate({
  //   inputRange: [0, screenHeight * story.chapters.length],
  //   outputRange: [0, -screenWidth * story.chapters.length],
  //   extrapolate: 'clamp',
  // });

  const trackBarStyle: ViewStyle = {
    left: 0,
    // transform: [{translateX: trackBarLeft}],
    position: 'absolute',
    bottom: bottomTabBarHeight + 20,
    flexDirection: 'row',
  };

  const scrollToPrevious = (chapterIndex: number) => {
    const isBeginning = chapterIndex === 0;
    if (isBeginning) {
      // go to intro
      return;
    }
    viewTranslation.value = withTiming(screenHeight * (chapterIndex + 1));
  };

  const scrollToNext = (chapterIndex: number) => {
    const isEnd = chapterIndex === story.chapters.length - 1;
    if (isEnd) {
      // go to outro
      return;
    }
    viewTranslation.value = withTiming(screenHeight * (chapterIndex - 1));
  };

  return (
    <>
      <View style={{height: screenHeight}}>
        <Animated.View style={animatedViewStyle}>
          {story.chapters.map((chapter, index) => (
            <StoryChapter
              key={chapter.id + 'ch'}
              {...chapter}
              onScrollToPrevious={() => scrollToPrevious(index)}
              onScrollToNext={() => scrollToNext(index)}
            />
          ))}
        </Animated.View>
      </View>
      {/* <Animated.View style={trackBarStyle}>
        {story.chapters.map(chapter => (
          <View key={chapter.id} style={{width: screenWidth}}>
            <View style={trackContainer}>
              {chapter.track && (
                <TrackCard
                  key={chapter.id}
                  transparent={false}
                  id={chapter.id}
                  timeIn={chapter.timeIn}
                  timeOut={chapter.timeOut}
                  {...chapter.track}
                />
              )}
            </View>
          </View>
        ))}
      </Animated.View> */}
    </>
  );
}

const trackContainer: ViewStyle = {
  width: '90%',
  alignSelf: 'center',
};
