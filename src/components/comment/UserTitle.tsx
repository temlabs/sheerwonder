import React from 'react';
import {
  View,
  ViewStyle,
  Text,
  TextStyle,
  Image,
  ImageStyle,
} from 'react-native';
import colors from '@/theme/colors';

interface Props {
  displayName: string;
  userName: string;
  isThreadHead?: boolean;
  displayNameSize?: number;
  userNameSize?: number;
}

export function UserTitle({
  displayName,
  userName,
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
      <Text style={userDisplayNameTextStyle}>{displayName}</Text>
      <Text style={userNameTextStyle}>@{userName}</Text>
    </View>
  );
}
