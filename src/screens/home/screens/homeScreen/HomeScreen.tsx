import React, {useCallback} from 'react';
import {FlatList, ListRenderItem, View, ViewStyle} from 'react-native';
import {ShortPostListItem} from '@/components/shortPost/ShortPostListItem';
import {FeedFilterBar} from './components/FeedFilterBar';
import {TAB_BAR_HEIGHT, screens} from '@/navigators/config';
import {isShortPost, isStory} from '@/utils/feedUtils';
import {StoryCard} from '@/components/story/StoryCard';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {HomeParamList} from '@/navigators/types';
import {ShortPostProps, StoryProps} from '@/demo/types';
import {CreatePostButton} from '@/components/buttons/CreatePostButton';
import usePostQuery from '@/tanstack/queries/usePostsQuery';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import useSpotifyBanner from '@/components/spotifyBanner/hooks/useSpotifyBanner';
import {useStore} from '@/store/useStore';

export function HomeScreen({
  navigation,
}: NativeStackScreenProps<HomeParamList, typeof screens.HOME>): JSX.Element {
  const bottomTabBarHeight = useBottomTabBarHeight();
  const authCode = useStore(s => s.spotifyAuthCode);
  const {spotifyState} = useSpotifyBanner(authCode);
  const {data: posts} = usePostQuery();

  const renderItem: ListRenderItem<ShortPostProps | StoryProps> = useCallback(
    item => {
      const post = item.item;
      if (isShortPost(post)) {
        return <ShortPostListItem key={post.id} {...post} />;
      } else if (isStory(post)) {
        return <StoryCard key={post.id} {...post} />;
      } else {
        return <></>;
      }
    },
    [],
  );

  return (
    <>
      {/* <FeedFilterBar navigation={navigation} /> */}

      <FlatList
        style={scrollViewStyle}
        showsVerticalScrollIndicator={true}
        contentContainerStyle={[
          backgroundViewStyle,
          {paddingBottom: bottomTabBarHeight},
        ]}
        maxToRenderPerBatch={5}
        keyExtractor={item => item.id}
        data={posts ?? []}
        renderItem={renderItem}
      />
      <View style={[postButton, {bottom: bottomTabBarHeight + 20}]}>
        <CreatePostButton
          onPress={() =>
            spotifyState === 'CONNECTED'
              ? navigation.navigate(screens.CREATE_SHORT_POST_SEARCH)
              : {}
          }
        />
      </View>

      {/* <CreateShortPost
        visible={createShortPostVisible}
        toggleVisibility={toggleCreateShortPostModalVisible}
      /> */}
    </>
  );
}

const backgroundViewStyle: ViewStyle = {
  // alignItems: 'center',
  // width: '100%',
  paddingBottom: TAB_BAR_HEIGHT,
  backgroundColor: 'transparent',
};

const scrollViewStyle: ViewStyle = {
  width: '100%',
  backgroundColor: 'transparent',
};

const postButton: ViewStyle = {
  position: 'absolute',
  right: 15,
};
