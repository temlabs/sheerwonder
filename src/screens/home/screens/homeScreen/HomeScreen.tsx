import React from 'react';
import {ScrollView, ViewStyle} from 'react-native';
import {Comment} from '@/components/comment/Comment';
import {posts} from '@/demo/posts';
import {HomeDrawerProps, HomeScreenProps} from '@/screens/types';
import {FeedFilterBar} from './components/FeedFilterBar';
import {TAB_BAR_HEIGHT} from '@/navigators/config';
import {isComment, isStory} from '@/utils/feedUtils';
import {StoryCard} from '@/components/story/StoryCard';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {HomeParamList} from '@/navigators/types';

export function HomeScreen({
  navigation,
}: HomeScreenProps<HomeParamList>): JSX.Element {
  const bottomTabBarHeight = useBottomTabBarHeight();
  return (
    <>
      <FeedFilterBar navigation={navigation} />

      <ScrollView
        style={scrollViewStyle}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          backgroundViewStyle,
          {paddingBottom: bottomTabBarHeight},
        ]}>
        {posts.map((p, i) => {
          if (isComment(p)) {
            return <Comment key={i} {...p} navigation={navigation} />;
          } else if (isStory(p)) {
            return <StoryCard key={i} {...p} navigation={navigation} />;
          }
        })}
      </ScrollView>
    </>
  );
}

const backgroundViewStyle: ViewStyle = {
  alignItems: 'center',
  width: '100%',
  paddingBottom: TAB_BAR_HEIGHT,
  backgroundColor: 'transparent',
};

const scrollViewStyle: ViewStyle = {
  width: '100%',
  backgroundColor: 'transparent',
};
