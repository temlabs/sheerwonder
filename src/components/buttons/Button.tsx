import colors from '@/theme/colors';
import React from 'react';
import {
  TouchableOpacity,
  Text,
  TextStyle,
  ViewStyle,
  TouchableOpacityProps,
} from 'react-native';

interface Props extends TouchableOpacityProps {
  label: string;
  type?: 'link';
}

export function Button(props: Props) {
  return (
    <TouchableOpacity {...props} style={button(props.disabled, props.type)}>
      <Text style={label(props.disabled, props.type)}>{props.label}</Text>
    </TouchableOpacity>
  );
}

const button = (disabled?: boolean, type?: 'link'): ViewStyle => ({
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 12,
  backgroundColor:
    type === 'link'
      ? 'transparent'
      : disabled
      ? colors.PRIMARY_LIGHT
      : colors.PRIMARY_DARK,
  borderRadius: 24,
  shadowColor: colors.PRIMARY_LIGHT,
  shadowRadius: 20,
  shadowOffset: {width: 2, height: 2},
  shadowOpacity: disabled ? 0 : 0.3,
});

const label = (disabled?: boolean, type?: 'link'): TextStyle => ({
  fontFamily: 'Sora-Medium',
  fontSize: 18,
  color: 'white',
  shadowColor: 'white',
  shadowRadius: 20,
  shadowOffset: {width: 2, height: 2},
  shadowOpacity: type === 'link' ? 0 : 1,
  opacity: disabled ? 0.7 : 1,
});
