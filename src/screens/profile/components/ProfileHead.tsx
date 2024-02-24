import {UserAvatar} from '@/components/UserAvatar';
import {useUser} from '@/user/useUser';
import React from 'react';
import {View, Text, ViewStyle, TextStyle} from 'react-native';
import {RegNum} from './RegNum';
import colors from '@/theme/colors';

interface Props {
  userId: string;
}

const avatarWidth = 50;

export function ProfileHead({userId}: Props) {
  const {data: user} = useUser(userId);

  const avatar = user?.avatar_url;
  const regNum = user?.sign_up_order_number;

  return (
    <View style={container}>
      <View style={iconAndEditButton}>
        <View style={icon}>
          {avatar ? (
            <UserAvatar avatar_url={avatar} width={avatarWidth} />
          ) : (
            <></>
          )}
        </View>
      </View>
      <View style={userTitles}>
        <Text style={displayName}>{user?.display_name}</Text>
        <View style={usernameAndRegNum}>
          <Text style={username}>@{user?.username}</Text>
          {regNum ? <RegNum regNum={regNum} /> : <></>}
        </View>
        <Text style={bio}>{user?.bio}</Text>
      </View>
    </View>
  );
}

const container: ViewStyle = {
  width: '100%',
};

const icon: ViewStyle = {
  width: avatarWidth,
  height: avatarWidth,
  backgroundColor: 'blue',
};

const iconAndEditButton: ViewStyle = {
  flexDirection: 'row',
  width: '100%',
  justifyContent: 'space-between',
};

const userTitles: ViewStyle = {
  gap: 5,
};

const usernameAndRegNum: ViewStyle = {
  flexDirection: 'row',
};

const displayName: TextStyle = {
  color: colors.TEXT_WHITE,
};

const username: TextStyle = {
  color: colors.TEXT_WHITE,
};

const bio: TextStyle = {
  color: colors.TEXT_WHITE,
  width: '100%',
};
