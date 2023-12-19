import * as React from 'react';
import {View, ViewStyle} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  defaultStackNavigatorOptions,
  screens,
  stacks,
} from '@/navigators/config';
import {EditFeedScreen} from './screens/EditFeedScreen';
import {LinearGradientBackground} from '@/components/LinearGradientBackground';
import colors from '@/theme/colors';
import {ThreadScreen} from './screens/ThreadScreen';
import {HomeDrawer} from './HomeDrawer';
import {StoryScreen} from './screens/storyScreen/StoryScreen';
import {AuthSpotifyResultScreen} from './screens/authSpotifyScreen/AuthSpotifyResultScreen';
import {HomeScreen} from './screens/homeScreen/HomeScreen';

const Stack = createNativeStackNavigator();

export function HomeStack(): JSX.Element {
  return (
    <View style={{flex: 1}}>
      <LinearGradientBackground
        x1={100}
        style={gradientBackgroundStyle}
        stops={[
          {offset: 0, opacity: 0.2, color: colors.PRIMARY},
          {offset: 100, opacity: 0.2, color: colors.TERTIARY},
        ]}
      />

      <Stack.Navigator
        initialRouteName={screens.HOME}
        screenOptions={defaultStackNavigatorOptions}>
        <Stack.Screen name={screens.HOME} component={HomeScreen} />
        <Stack.Screen name={screens.EDIT_FEED} component={EditFeedScreen} />
        <Stack.Screen<typeof screens.THREAD>
          name={screens.THREAD}
          component={ThreadScreen}
          options={{
            headerShown: true,
            headerTitle: 'Post',
            headerStyle: {backgroundColor: 'transparent'},
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen<typeof screens.STORY>
          name={screens.STORY}
          component={StoryScreen}
          options={{
            headerShown: true,
            headerTitle: '',
            headerTransparent: true,
            headerStyle: {backgroundColor: 'transparent'},
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen<typeof screens.AUTH_SPOTIFY_RESULT>
          name={screens.AUTH_SPOTIFY_RESULT}
          component={AuthSpotifyResultScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </View>
  );
}

const gradientBackgroundStyle: ViewStyle = {
  position: 'absolute',
  height: '100%',
  width: '100%',
  backgroundColor: 'black',
  // zIndex: 0,
};
