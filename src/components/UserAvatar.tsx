import React from 'react';
import {Image, ImageStyle, Pressable} from 'react-native';
import {User} from '@/user/userTypes';

interface Props extends Pick<User, 'avatar_url'> {
  width?: number;
}

export function UserAvatar(props: Props): JSX.Element {
  const profilePicture = props.avatar_url;
  const width = props.width ?? 40;

  const userProfilePicStyle: ImageStyle = {borderRadius: width / 2};
  return (
    <Pressable>
      {profilePicture ? (
        <Image
          source={{uri: profilePicture, height: width, width: width}}
          style={userProfilePicStyle}
        />
      ) : (
        <></>
      )}
    </Pressable>
  );
}
