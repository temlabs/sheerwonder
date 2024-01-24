import React from 'react';
import {View, ViewStyle} from 'react-native';
import {ShortPostProps} from '@/demo/types';
import {TrackCard} from '../trackCard/TrackCard';
import {ShortPostStatBar} from './ShortPostStatBar';
import {ShortPostListItemWrapper} from './ShortPostListItemWrapper';
import {screens} from '@/navigators/config';
import {UserAvatar} from '../UserAvatar';
import {UserTitle} from './UserTitle';
import {ShortPostText} from './ShortPostText';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {HomeParamList} from '@/navigators/types';

export function ShortPostListItem(shortPost: ShortPostProps): JSX.Element {
  const navigation = useNavigation<NavigationProp<HomeParamList>>();
  const {user, text, timeIn, timeOut, track, replies, saves, upvotes, id} =
    shortPost;
  const goToCommentThread = () => {
    navigation.navigate(screens.SHORT_POST, {shortPost: shortPost});
  };
  return (
    <ShortPostListItemWrapper onPress={goToCommentThread}>
      <View style={innerView}>
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
            <ShortPostText>{text}</ShortPostText>
          </View>
          <View style={{marginTop: 20}}>
            <TrackCard {...track} timeIn={timeIn} timeOut={timeOut} id={id} />
          </View>
          <ShortPostStatBar replies={replies} saves={saves} upvotes={upvotes} />
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
