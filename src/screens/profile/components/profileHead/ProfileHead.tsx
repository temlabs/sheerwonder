import {UserAvatar} from '@/components/UserAvatar';
import {useUser} from '@/user/useUser';
import React, {useState} from 'react';
import {View, Text, ViewStyle, TextStyle, TouchableOpacity} from 'react-native';
import {RegNum} from './RegNum';
import colors from '@/theme/colors';
import {ProfileBio} from './ProfileBio';
import {useProfileHead} from './useProfileHead';
import {ProfileDisplayName} from './ProfileDisplayName';
import {ProfileEditButton} from './ProfileEditButton';
import {ProfileFollowDetails} from './ProfileFollowDetails';
import ImagePicker from 'react-native-image-crop-picker';

interface Props {
  userId: string;
}

const avatarWidth = 50;

export function ProfileHead({userId}: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedImagePath, setSelectedImagePath] = useState<string>();

  const {data: user} = useUser(userId);
  const {dispatch, state, initialValues} = useProfileHead(user);
  const resetForm = () => {
    dispatch({type: 'RESET', payload: initialValues});
    setIsEditing(false);
  };
  const openImagePicker = () => {
    console.debug('opening image picker');
    ImagePicker.openPicker({
      width: 256,
      height: 256,
      cropping: true,
      cropperCircleOverlay: true,
      compressImageMaxHeight: 256,
      compressImageMaxWidth: 256,
    }).then(image => {
      setSelectedImagePath(image.path);
      console.log(image);
    });
  };
  const submitForm = () => {
    setIsEditing(false);
  };

  const avatar = selectedImagePath ?? user?.avatar_url;
  const regNum = user?.sign_up_order_number;
  const following = user?.following_count;
  const followers = user?.follower_count;

  return (
    <View style={container}>
      <View style={iconAndEditButton}>
        <TouchableOpacity onPress={openImagePicker}>
          <View style={icon}>
            {avatar ? (
              <UserAvatar avatar_url={avatar} width={avatarWidth} />
            ) : (
              <></>
            )}
          </View>
        </TouchableOpacity>
        <ProfileEditButton
          dispatch={dispatch}
          formState={state}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          onDiscard={resetForm}
          onSubmit={submitForm}
        />
      </View>
      <View style={userTitles}>
        <ProfileDisplayName
          dispatch={dispatch}
          formState={state}
          isEditing={isEditing}
        />
        <View style={usernameAndRegNum}>
          <Text style={username}>@{user?.username}</Text>
          {regNum ? <RegNum regNum={regNum} /> : <></>}
        </View>
        {followers !== undefined && following !== undefined ? (
          <ProfileFollowDetails followers={followers} following={following} />
        ) : (
          <></>
        )}
      </View>
      <ProfileBio dispatch={dispatch} formState={state} isEditing={isEditing} />
    </View>
  );
}

const container: ViewStyle = {
  width: '100%',
  gap: 10,
};

const icon: ViewStyle = {
  width: avatarWidth,
  height: avatarWidth,
  backgroundColor: 'blue',
  borderRadius: avatarWidth / 2,
};

const iconAndEditButton: ViewStyle = {
  flexDirection: 'row',
  width: '100%',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
};

const userTitles: ViewStyle = {
  gap: 2,
  justifyContent: 'flex-start',
};

const usernameAndRegNum: ViewStyle = {
  flexDirection: 'row',
};

const username: TextStyle = {
  color: colors.TEXT_GRAY,
};
