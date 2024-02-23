import React from 'react';
import {View, ViewStyle} from 'react-native';
import {TrackCard} from '../../components/trackCard/TrackCard';
import {ShortPostStatBar} from './ShortPostStatBar';
import {UserAvatar} from '../../components/UserAvatar';
import {UserTitle} from './UserTitle';
import {ShortPostText} from './ShortPostText';
import {ShortPostDraft} from '@/shortPosts/shortPostTypes';

export function ShortPostDraftListItem(shortPost: ShortPostDraft): JSX.Element {
  const {text, time_in, time_out, track} = shortPost;

  return (
    <View style={innerView}>
      <UserAvatar avatar_url={''} />
      <View style={textAndTrackContainerViewStyle}>
        <View style={textContainerView}>
          <View style={userDetailsViewStyle}>
            <UserTitle display_name={'display_name'} username={'username'} />
          </View>
          {/* <Text style={commentTextStyle}>{text}</Text> */}
          <ShortPostText>{text}</ShortPostText>
        </View>
        <View style={{marginTop: 20}}>
          <TrackCard
            time_in={time_in}
            time_out={time_out}
            spotify_id={track.spotify_id}
            name={track.name}
            artist={track.artist}
            artwork={track.artwork}
            duration={track.duration}
            id={''}
          />
        </View>
        <ShortPostStatBar replies={0} saves={0} upvotes={0} />
      </View>
    </View>
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
