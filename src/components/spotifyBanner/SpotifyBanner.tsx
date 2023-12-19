import {Text, ViewStyle, TouchableOpacity} from 'react-native';
import React from 'react';
import colors from '@/theme/colors';
import {TAB_BAR_HEIGHT} from '@/navigators/config';
import {SpotifyLogo} from '@/components/icons/SpotifyLogo';

export function SpotifyBanner({
  onPress,
  text,
}: {
  text: string;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity style={containerStyle} onPress={onPress}>
      <Text>{text}</Text>
      <SpotifyLogo height={20} width={20} />
    </TouchableOpacity>
  );
}

const containerStyle: ViewStyle = {
  backgroundColor: colors.SPOTIFY_GREEN,
  position: 'absolute',
  bottom: TAB_BAR_HEIGHT,
  paddingHorizontal: 5,
  paddingVertical: 5,
  width: '100%',
  flexDirection: 'row',
  justifyContent: 'center',
  gap: 15,
};
