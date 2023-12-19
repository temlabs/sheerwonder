import {View, Text, ViewStyle} from 'react-native';
import React from 'react';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';

import {BottomTabButton} from './BottomTabButton';
import {StackName} from '@/navigators/types';
import colors from '@/theme/colors';
import {BlurView} from '@react-native-community/blur';
import {TAB_BAR_HEIGHT} from '../config';
import {Player} from '@/components/player/Player';
import {SpotifyLoginWebView} from '@/components/webviews/spotifyAuth/SpotifyLoginwebView';
import {SpotifyBanner} from '@/components/spotifyBanner/SpotifyBanner';
import useSpotifyBanner from '@/components/spotifyBanner/hooks/useSpotifyBanner';
import {useStore} from '@/store/useStore';

export function TabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps): JSX.Element {
  const authCode = useStore(s => s.spotifyAuthCode);
  const {spotifyBannerText, onSpotifyBannerPress, SpotifyPlayer} =
    useSpotifyBanner(authCode);
  return (
    <>
      {/* <View>
        <Player />
        <SpotifyLoginWebView />
      </View> */}
      <SpotifyBanner text={spotifyBannerText} onPress={onSpotifyBannerPress} />
      <View>{SpotifyPlayer}</View>
      <View style={bottomTabStyle}>
        <BlurView
          style={blurViewStyle}
          blurType="dark"
          blurAmount={20}
          blurRadius={25}
          // reducedTransparencyFallbackColor="white"
        />

        {state.routes.map((route, index) => {
          // return null;
          // return (
          //   <View key={index}>
          //     <Text style={{color: 'white'}}>Hi</Text>
          //   </View>
          // );
          const {options} = descriptors[route.key];
          const tabBarLabel = options.tabBarLabel;

          const isFocused = state.index === index;
          const color = isFocused ? colors.PRIMARY : colors.TEXT_PRIMARY;
          const label =
            typeof tabBarLabel === 'function'
              ? tabBarLabel({color: color})
              : undefined;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              navigation.navigate<StackName>(route.name as StackName);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <BottomTabButton key={index} onPress={onPress}>
              {label ? label : <Text key={index}>hi</Text>}
            </BottomTabButton>
          );
        })}
      </View>
    </>
  );
}

const bottomTabStyle: ViewStyle = {
  position: 'absolute',
  bottom: 0,
  width: '100%',
  // backgroundColor: 'red',
  flexDirection: 'row',
  justifyContent: 'space-between',
  height: TAB_BAR_HEIGHT,
  // borderTopColor: colors.BACKGROUND_BORDER,
  // borderTopWidth: 1,
  overflow: 'hidden',
};

const blurViewStyle: ViewStyle = {
  width: '100%',
  height: '100%',
  zIndex: 0,
  position: 'absolute',
};
