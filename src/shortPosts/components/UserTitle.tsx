import React from 'react';
import {View, ViewStyle, Text, TextStyle} from 'react-native';
import colors from '@/theme/colors';
import {User} from '@/user/userTypes';

interface Props extends Pick<User, 'display_name' | 'username'> {
  isThreadHead?: boolean;
  displayNameSize?: number;
  userNameSize?: number;
}

export function UserTitle({
  display_name,
  username,
  displayNameSize = 18,
  userNameSize = 14,
}: Props): JSX.Element {
  const userDetailsViewStyle: ViewStyle = {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: 8,
    alignItems: 'center',
  };

  const userDisplayNameTextStyle: TextStyle = {
    color: colors.TEXT_BODY,
    fontSize: displayNameSize ?? 18,
  };

  const userNameTextStyle: TextStyle = {
    color: colors.TEXT_BODY,
    opacity: 0.6,
    fontSize: userNameSize ?? 14,
  };

  return (
    <View style={userDetailsViewStyle}>
      <Text style={userDisplayNameTextStyle}>{display_name}</Text>
      <Text style={userNameTextStyle}>@{username}</Text>
    </View>
  );
}
