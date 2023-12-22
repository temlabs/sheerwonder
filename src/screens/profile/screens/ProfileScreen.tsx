import colors from '@/theme/colors';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {TouchableOpacity, Text} from 'react-native';

export function ProfileScreen(): JSX.Element {
  const navigation = useNavigation();
  return (
    <>
      <TouchableOpacity
        style={{height: 50}}
        onPress={() => navigation.navigate('SpotifyLogoutModal')}>
        <Text style={{color: colors.TEXT_WHITE}}>Disconnect Spotify</Text>
      </TouchableOpacity>
    </>
  );
}
