import colors from '@/theme/colors';
import React from 'react';
import {View, Text, ViewStyle, TouchableOpacity, TextStyle} from 'react-native';

interface Props {
  followers: number;
  following: number;
}

export function ProfileFollowDetails({followers, following}: Props) {
  return (
    <View style={container}>
      <TouchableOpacity style={metricContainer}>
        <Text style={value}>{following}</Text>
        <Text style={label}>Following</Text>
      </TouchableOpacity>

      <TouchableOpacity style={metricContainer}>
        <Text style={value}>{followers}</Text>
        <Text style={label}>Followers</Text>
      </TouchableOpacity>
    </View>
  );
}

const container: ViewStyle = {
  flexDirection: 'row',
  gap: 10,
  justifyContent: 'flex-start',
};

const metricContainer: ViewStyle = {
  flexDirection: 'row',
  gap: 5,
};

const label: TextStyle = {
  color: colors.TEXT_GRAY,
  fontSize: 14,
};

const value: TextStyle = {
  fontWeight: '600',
  color: colors.TEXT_WHITE,
  fontSize: 14,
};
