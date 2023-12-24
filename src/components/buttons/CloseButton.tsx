import React from 'react';
import {TouchableOpacity} from 'react-native';
import colors from '@/theme/colors';
import {Close} from '@/components/icons/Close';

export function CloseButton({
  onPress,
  height,
  width,
}: {
  onPress: () => void;
  height?: number;
  width?: number;
}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Close
        height={height ?? 30}
        width={width ?? 30}
        fill={colors.TEXT_PRIMARY}
      />
    </TouchableOpacity>
  );
}
