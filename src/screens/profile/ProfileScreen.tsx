import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useStytchUser} from '@stytch/react-native';
import React from 'react';
import {StatusBar, View, ViewStyle} from 'react-native';
import {ProfileHead} from './components/profileHead/ProfileHead';
import {useHeaderHeight} from '@react-navigation/elements';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {Feed} from '@/feed/Feed';
import {TAB_BAR_HEIGHT} from '@/navigators/config';
import {ShortPost, ShortPostDraft} from '@/shortPosts/shortPostTypes';
import useGetShortPosts from '@/shortPosts/useGetShortPosts';
import shortPostQueryKeys from '@/shortPosts/shortPostQueryKeys';
import {useUser} from '@/user/useUser';

export function ProfileScreen({
  navigation,
}: NativeStackScreenProps<any, any>): JSX.Element {
  const stytchUser = useStytchUser();
  const headerHeight = useHeaderHeight();
  const userId = stytchUser.user?.user_id;
  const {data: user} = useUser(userId!);
  const {data: posts} = useGetShortPosts(
    shortPostQueryKeys.createdBy(user?.id!),
  );

  const bottomTabBarHeight = useBottomTabBarHeight();

  return (
    <View style={{...containerViewStyle, paddingTop: headerHeight}}>
      {posts && user ? (
        <Feed<ShortPost | ShortPostDraft>
          ListHeaderComponent={userId ? <ProfileHead userId={userId} /> : <></>}
          data={posts}
          style={scrollViewStyle}
          contentContainerStyle={[
            backgroundViewStyle,
            {
              paddingBottom: bottomTabBarHeight,
            },
          ]}
        />
      ) : (
        <></>
      )}
    </View>
  );
}

const containerViewStyle: ViewStyle = {
  width: '95%',
  alignSelf: 'center',
  height: '100%',
};

const backgroundViewStyle: ViewStyle = {
  paddingBottom: TAB_BAR_HEIGHT,
  backgroundColor: 'transparent',
};

const scrollViewStyle: ViewStyle = {
  width: '100%',
  backgroundColor: 'transparent',
  flexGrow: 1,
};
