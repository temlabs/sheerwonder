import React from 'react';
import {Text, TextStyle, TextInput} from 'react-native';
import {UserEditDispatch, UserEditing} from './useProfileHead';
import colors from '@/theme/colors';

interface Props {
  formState: UserEditing;
  dispatch: UserEditDispatch;
  isEditing?: boolean;
}

export function ProfileDisplayName({formState, dispatch, isEditing}: Props) {
  const displayName = formState.display_name;
  const updateField = (text: string) => {
    dispatch({
      type: 'UPDATE_FIELD',
      payload: {field: 'display_name', value: text},
    });
  };

  return isEditing ? (
    <TextInput
      style={text}
      onChangeText={updateField}
      value={formState.display_name ?? ''}
      placeholder="Add a display name"
      placeholderTextColor={colors.TEXT_PLACEHOLDER}
    />
  ) : (
    <Text style={text}>{displayName}</Text>
  );
}

const text: TextStyle = {
  color: colors.TEXT_WHITE,
  padding: 0,
  margin: 0,
  fontSize: 18,
};
