import React from 'react';
import {View, Image, ImageStyle, ViewStyle, Text} from 'react-native';
import {CommentProps} from '@/demo/types';
import {styles} from '@/theme/styles';
import {UserAvatar} from '../UserAvatar';
import {UserTitle} from '../comment/UserTitle';
import {CommentText} from '../comment/CommentText';
import {TrackCard} from '../trackCard/TrackCard';

export function ThreadHead(props: CommentProps): JSX.Element {
  const user = props.user;
  const track = props.track;

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
      <CommentText isThread={true}>{props.text}</CommentText>
      <TrackCard
        {...track}
        timeIn={props.timeIn}
        timeOut={props.timeOut}
        id={props.id}
      />

      <View></View>
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
