import {HomeScreenProps} from '@/screens/types';
import React from 'react';
import {View, ViewStyle, Text, TouchableOpacity} from 'react-native';

export function EditFeedScreen({navigation}: HomeScreenProps): JSX.Element {
  return (
    <View style={containerStyle}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text>go back YOOOO</Text>
      </TouchableOpacity>
    </View>
  );
}

const containerStyle: ViewStyle = {
  // backgroundColor: 'blue',
  height: '100%',
};
