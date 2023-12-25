import React, {useCallback, useState} from 'react';
import {
  FlatList,
  ListRenderItem,
  ScrollView,
  View,
  ViewStyle,
} from 'react-native';
import {Comment} from '@/components/comment/Comment';
import {posts} from '@/demo/posts';
import {HomeDrawerProps, HomeScreenProps} from '@/screens/types';
import {FeedFilterBar} from './components/FeedFilterBar';
import {TAB_BAR_HEIGHT, screens} from '@/navigators/config';
import {isComment, isStory} from '@/utils/feedUtils';
import {StoryCard} from '@/components/story/StoryCard';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {HomeParamList} from '@/navigators/types';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Text} from 'react-native';
import {CommentProps, StoryProps} from '@/demo/types';
import {CircleButton} from '@/components/buttons/CircleButton';
import {CreatePostButton} from '@/components/buttons/CreatePostButton';
import {CreateShortPost} from '@/screens/root/modals/CreateShortPostSearch';

export function HomeScreen({
  navigation,
}: HomeScreenProps<HomeParamList>): JSX.Element {
  const bottomTabBarHeight = useBottomTabBarHeight();
  const [createShortPostVisible, setCreateShortPostVisible] = useState(false);

  const toggleCreateShortPostModalVisible = () =>
    setCreateShortPostVisible(v => !v);

  const renderItem: ListRenderItem<CommentProps | StoryProps> = useCallback(
    item => {
      const post = item.item;
      if (isComment(post)) {
        return <Comment key={post.id} {...post} />;
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
      <FeedFilterBar navigation={navigation} />

      <TouchableOpacity
        onPress={() => navigation.navigate(screens.THREAD, {commentId: 'abc'})}>
        <Text>Go to other screen</Text>
      </TouchableOpacity>

      <FlatList
        style={scrollViewStyle}
        showsVerticalScrollIndicator={true}
        contentContainerStyle={[
          backgroundViewStyle,
          {paddingBottom: bottomTabBarHeight},
        ]}
        maxToRenderPerBatch={5}
        keyExtractor={item => item.id}
        data={posts}
        renderItem={renderItem}
      />
      <View style={[postButton, {bottom: bottomTabBarHeight + 20}]}>
        <CreatePostButton
          onPress={() => navigation.navigate(screens.CREATE_SHORT_POST_SEARCH)}
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
