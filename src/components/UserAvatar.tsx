import React from 'react';
import {Image, ImageStyle, Pressable} from 'react-native';
import {UserProps} from '@/demo/types';

interface Props extends UserProps {
  width?: number;
}

export function UserAvatar(props: Props): JSX.Element {
  const profilePicture = props.profilePicture;
  const width = props.width ?? 40;

  const userProfilePicStyle: ImageStyle = {borderRadius: width / 2};
  return (
    <Pressable>
      <Image
        source={{uri: profilePicture, height: width, width: width}}
        style={userProfilePicStyle}
      />
    </Pressable>
  );
}
