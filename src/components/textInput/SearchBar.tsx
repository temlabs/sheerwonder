import React, {ReactNode, startTransition, useState} from 'react';
import {
  View,
  ViewStyle,
  Pressable,
  GestureResponderEvent,
  TouchableOpacity,
  Modal,
  TextInput,
  TextStyle,
} from 'react-native';
import colors from '@/theme/colors';
import {Write} from '../icons/Write';
import {Close} from '@/components/icons/Close';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

export function SearchBar({
  onChange,
  searchTerm,
}: {
  onChange: (value: string) => void;
  searchTerm: string;
}) {
  return (
    <TextInput
      value={searchTerm}
      onChangeText={onChange}
      placeholder="Search for a track or artist"
      placeholderTextColor={colors.TEXT_GRAY}
      style={textStyle}
    />
  );
}

const textStyle: TextStyle = {
  backgroundColor: colors.BACKGROUND_DARKER,
  color: colors.TEXT_WHITE,
  width: '100%',
  borderRadius: 3,
  borderTopWidth: 0,
  borderBottomWidth: 2,
  borderLeftWidth: 0,
  borderRightWidth: 0,
  borderBottomColor: colors.BACKGROUND_LIGHT,
  height: 40,
};
