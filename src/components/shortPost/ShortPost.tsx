import React from 'react';
import {View, ViewStyle} from 'react-native';
import {ShortPostProps} from '@/demo/types';
import {TrackCard} from '../trackCard/TrackCard';
import {ShortPostStatBar} from './ShortPostStatBar';
import {UserAvatar} from '../UserAvatar';
import {UserTitle} from './UserTitle';
import {ShortPostText} from './ShortPostText';
import {styles} from '@/theme/styles';

export function ShortPost(shortPost: ShortPostProps): JSX.Element {
  const {user, text, timeIn, timeOut, track, replies, saves, upvotes, id} =
    shortPost;

  return (
    <View style={threadHeadContainerStyle}>
      <View style={titleViewStyle}>
        <UserAvatar {...user} width={50} />
        <UserTitle
          displayName={user.displayName}
          userName={user.userName}
          displayNameSize={20}
          userNameSize={16}
        />
      </View>
      <ShortPostText isThread={true}>{text}</ShortPostText>
      <TrackCard {...track} timeIn={timeIn} timeOut={timeOut} id={id} />

      <ShortPostStatBar replies={replies} saves={saves} upvotes={upvotes} />
    </View>
  );
}

const threadHeadContainerStyle: ViewStyle = {
  width: '100%',
  paddingHorizontal: 30,
  gap: 20,
};

const titleViewStyle: ViewStyle = {
  ...styles.flexRowStartCent,
  gap: 15,
};
