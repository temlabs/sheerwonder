import React from 'react';
import {Text, TextStyle, TextInput} from 'react-native';
import {UserEditDispatch, UserEditing} from './useProfileHead';
import colors from '@/theme/colors';

interface Props {
  formState: UserEditing;
  dispatch: UserEditDispatch;
  isEditing?: boolean;
}

export function ProfileBio({formState, dispatch, isEditing}: Props) {
  const bio = formState.bio;
  const updateField = (text: string) => {
    dispatch({
      type: 'UPDATE_FIELD',
      payload: {field: 'bio', value: text},
    });
  };

  return isEditing ? (
    <TextInput
      style={text}
      onChangeText={updateField}
      value={formState.bio ?? ''}
      placeholder="Tell people about yourself"
      placeholderTextColor={colors.TEXT_PLACEHOLDER}
      maxLength={240}
    />
  ) : (
    <Text style={text}>{bio}</Text>
  );
}

const text: TextStyle = {
  color: colors.TEXT_WHITE,
  width: '100%',
  margin: 0,
  padding: 0,
};
