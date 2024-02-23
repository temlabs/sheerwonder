import React from 'react';
import {
  FlatList,
  ListRenderItem,
  StatusBar,
  View,
  ViewStyle,
} from 'react-native';
import {ShortPostListItem} from '@/shortPosts/components/ShortPostListItem';
import {TAB_BAR_HEIGHT, screens} from '@/navigators/config';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {HomeParamList} from '@/navigators/types';
import {CreatePostButton} from '@/components/buttons/CreatePostButton';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import useSpotifyBanner from '@/components/spotifyBanner/hooks/useSpotifyBanner';
import {useStore} from '@/store/useStore';
import useGetShortPosts from '@/shortPosts/useGetShortPosts';
import {ShortPost, ShortPostDraft} from '@/shortPosts/shortPostTypes';
import {isShortPostDraft} from '@/shortPosts/shortPostTypeUtils';
import {ShortPostDraftListItem} from '@/shortPosts/components/ShortPostDraftListItem';

export function HomeScreen({
  navigation,
}: NativeStackScreenProps<HomeParamList, typeof screens.HOME>): JSX.Element {
  const bottomTabBarHeight = useBottomTabBarHeight();
  const authCode = useStore(s => s.spotifyAuthCode);
  const {spotifyState} = useSpotifyBanner(authCode);
  const {data: shortPosts} = useGetShortPosts();

  const renderItem: ListRenderItem<ShortPost | ShortPostDraft> = item => {
    const post = item.item;
    if (isShortPostDraft(post)) {
      return <ShortPostDraftListItem {...post} />;
    } else {
      return <ShortPostListItem {...post} />;
    }
  };

  return (
    <>
      {/* <FeedFilterBar navigation={navigation} /> */}

      <FlatList<ShortPost | ShortPostDraft>
        style={scrollViewStyle}
        showsVerticalScrollIndicator={true}
        contentContainerStyle={[
          backgroundViewStyle,
          {
            paddingBottom: bottomTabBarHeight,
            paddingTop: StatusBar.currentHeight,
          },
        ]}
        maxToRenderPerBatch={5}
        keyExtractor={item => (isShortPostDraft(item) ? 'draft' : item.id)}
        data={shortPosts ?? []}
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
