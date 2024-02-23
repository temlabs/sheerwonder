import React from 'react';
import {View, ViewStyle} from 'react-native';
import {TrackCard} from '../../components/trackCard/TrackCard';
import {ShortPostStatBar} from './ShortPostStatBar';
import {ShortPostListItemWrapper} from './ShortPostListItemWrapper';
import {UserAvatar} from '../../components/UserAvatar';
import {UserTitle} from './UserTitle';
import {ShortPostText} from './ShortPostText';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {HomeParamList} from '@/navigators/types';
import {ShortPost} from '@/shortPosts/shortPostTypes';

export function ShortPostListItem(shortPost: ShortPost): JSX.Element {
  const navigation = useNavigation<NavigationProp<HomeParamList>>();
  const {
    text,
    time_in,
    time_out,
    reply_count,
    save_count,
    upvote_count,
    id,
    created_at,
    display_name,
    duration,
    artist,
    artwork,
    avatar_url,
    name,
    spotify_id,
    username,
  } = shortPost;
  const goToCommentThread = () => {
    // navigation.navigate(screens.SHORT_POST, {shortPost: shortPost});
  };

  return (
    <ShortPostListItemWrapper onPress={goToCommentThread}>
      <View style={innerView}>
        <UserAvatar avatar_url={avatar_url} />
        <View style={textAndTrackContainerViewStyle}>
          <View style={textContainerView}>
            <View style={userDetailsViewStyle}>
              <UserTitle display_name={display_name} username={username} />
            </View>
            {/* <Text style={commentTextStyle}>{text}</Text> */}
            <ShortPostText>{text}</ShortPostText>
          </View>
          <View style={{marginTop: 20}}>
            <TrackCard
              time_in={time_in ?? 0}
              time_out={time_out ?? duration}
              id={id}
              spotify_id={spotify_id}
              name={name}
              artist={artist}
              artwork={artwork}
              duration={duration}
            />
          </View>
          <ShortPostStatBar
            replies={reply_count}
            saves={save_count}
            upvotes={upvote_count}
          />
        </View>
      </View>
    </ShortPostListItemWrapper>
  );
}

const innerView: ViewStyle = {
  flexDirection: 'row',
  gap: 15,
  width: '100%',
};

const textAndTrackContainerViewStyle: ViewStyle = {gap: 10, flex: 1};

const textContainerView: ViewStyle = {
  flex: 1,
};

const userDetailsViewStyle: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'flex-start',
  gap: 8,
  alignItems: 'center',
};
