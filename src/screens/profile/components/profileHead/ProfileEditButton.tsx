import {Button2} from '@/components/buttons/Button2';
import {UserEditDispatch, UserEditing} from './useProfileHead';
import React from 'react';
import {
  View,
  TouchableOpacity,
  ViewStyle,
  Platform,
  UIManager,
  LayoutAnimation,
} from 'react-native';
import {TickCircle} from '@/components/icons/TickCircle';
import {XCircle} from '@/components/icons/XCircle';
import colors from '@/theme/colors';
import {quickSpring} from '@/theme/animations';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

interface Props {
  isEditing: boolean;
  formState: UserEditing;
  dispatch: UserEditDispatch;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: (formState: UserEditing) => void;
  onDiscard: () => void;
}

export function ProfileEditButton({
  isEditing,
  onDiscard,
  onSubmit,
  formState,
  setIsEditing,
}: Props) {
  LayoutAnimation.configureNext(quickSpring);
  const toggleIsEditing = () => setIsEditing(e => !e);

  return isEditing ? (
    <View style={buttonView}>
      <TouchableOpacity onPress={onDiscard}>
        <XCircle width={25} height={25} stroke={colors.BACKGROUND_LIGHT} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onSubmit(formState)}>
        <TickCircle width={25} height={25} stroke={colors.SECONDARY} />
      </TouchableOpacity>
    </View>
  ) : (
    <Button2 text="Edit profile" onPress={toggleIsEditing} />
  );
}

const buttonView: ViewStyle = {
  flexDirection: 'row',
  gap: 10,
  flexGrow: 1,
  //   backgroundColor: 'yellow',
  justifyContent: 'flex-end',
};
