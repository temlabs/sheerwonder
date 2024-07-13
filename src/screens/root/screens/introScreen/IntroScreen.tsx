import {Button} from '@/components/buttons/Button';
import {screens} from '@/navigators/config';
import {RootScreenProps} from '@/screens/types';
import {typography} from '@/theme/typography';
import React from 'react';
import {View, ViewStyle, Text} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export function IntroScreen({
  navigation,
}: RootScreenProps<typeof screens.INTRO>) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        container,
        {paddingTop: insets.top + 24, paddingBottom: insets.bottom + 24},
      ]}>
      <View style={content}>
        <Text style={[typography.h2, {fontSize: 44}]}>
          A{'\n'}world{'\n'}of wonder{'\n'}awaits
        </Text>

        <Button
          label="Let's go"
          onPress={() => {
            navigation.navigate(screens.SIGN_UP, {});
          }}
        />
      </View>
    </View>
  );
}

const container: ViewStyle = {
  //   width: '100%',
  //   height: '100%',
  flex: 1,
  justifyContent: 'flex-end',
  padding: 24,
  paddingHorizontal: 30,
};

const content: ViewStyle = {
  gap: 60,
};

const buttons: ViewStyle = {
  backgroundColor: 'trnsparent',
};
