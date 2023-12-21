import React from 'react';
import {
  View,
  ViewStyle,
  Text,
  TextStyle,
  Image,
  ImageStyle,
} from 'react-native';
import {CommentProps} from '@/demo/types';
import colors from '@/theme/colors';
import {TrackCard} from '../trackCard/TrackCard';
import {CommentStatBar} from './CommentStatBar';
import {CommentWrapper} from './CommentWrapper';
import {HomeDrawerProps, HomeScreenProps} from '@/screens/types';
import {screens, stacks} from '@/navigators/config';
import {UserAvatar} from '../UserAvatar';
import {UserTitle} from './UserTitle';
import {CommentText} from './CommentText';
import {useNavigation} from '@react-navigation/native';

export function Comment({
  id,
  text,
  user,
  track,
  timeIn,
  timeOut,
  replies,
  saves,
  upvotes,
}: CommentProps): JSX.Element {
  const navigation = useNavigation();
  const goToCommentThread = () => {
    navigation.navigate(screens.THREAD, {commentId: id});
  };
  return (
    <CommentWrapper onPress={goToCommentThread}>
      <View style={commentImageTextView}>
        <UserAvatar {...user} />
        <View style={textAndTrackContainerViewStyle}>
          <View style={textContainerView}>
            <View style={userDetailsViewStyle}>
              <UserTitle
                displayName={user.displayName}
                userName={user.userName}
              />
            </View>
            {/* <Text style={commentTextStyle}>{text}</Text> */}
            <CommentText>{text}</CommentText>
          </View>
          <View style={{marginTop: 20}}>
            <TrackCard {...track} timeIn={timeIn} timeOut={timeOut} id={id} />
          </View>
          <CommentStatBar replies={replies} saves={saves} upvotes={upvotes} />
        </View>
      </View>
    </CommentWrapper>
  );
}

const commentImageTextView: ViewStyle = {
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

const commentTextStyle: TextStyle = {
  color: colors.TEXT_BODY,
  opacity: 0.8,
};
