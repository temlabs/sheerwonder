import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';
import {DrawerNavigationOptions} from '@react-navigation/drawer';
import {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import colors from '@/theme/colors';
import {Dimensions} from 'react-native';

export const TAB_BAR_HEIGHT = 50;

export const navigators = {
  BOTTOM_TAB_NAVIGATOR: 'BottomTabNavigator',
} as const;

export const stacks = {
  HOME: 'HomeStack',
  HOME_DRAWER: 'HomeDrawer',
  COMMUNITY: 'CommunityStack',
  DISCOVER: 'DiscoverStack',
  PROFILE: 'ProfileStack',
} as const;

export const screens = {
  HOME: 'Home',
  AUTH_SPOTIFY: 'AuthSpotify',
  AUTH_SPOTIFY_RESULT: 'AuthSpotifyResult',
  LOGOUT_SPOTIFY: 'LogoutSpotify',
  DISCOVER: 'Discover',
  COMUNITY: 'Community',
  PROFILE: 'Profile',
  EDIT_FEED: 'EditFeed',
  THREAD: 'Thread',
  STORY: 'Story',
  SPOTIFY_LOGIN_MODAL: 'SpotifyLoginModal',
  SPOTIFY_LOGOUT_MODAL: 'SpotifyLogoutModal',
  CREATE_SHORT_POST_SEARCH: 'CreateShortPostSearch',
  CREATE_SHORT_POST_SELECT_RANGE: 'CreateShortPostSelectRange',
  CREATE_SHORT_POST_WRITE: 'CreateShortPostWrite',
  SHORT_POST: 'ShortPost',
  LOGIN: 'Login',
  AUTHENTICATE_LOGIN: 'AuthenticateLogin',
  PROFILE_MENU: 'ProfileMenu',
} as const;

export const defaultStackNavigatorOptions: NativeStackNavigationOptions = {
  headerShown: false,
  contentStyle: {backgroundColor: 'transparent'},
  animation: 'simple_push',
  headerTitleStyle: {color: colors.TEXT_PRIMARY},
  headerTintColor: colors.TEXT_PRIMARY,
};

export const defaultDrawerNavigatorOptions: DrawerNavigationOptions = {
  drawerActiveTintColor: colors.PRIMARY_LIGHT,
  drawerActiveBackgroundColor: colors.PRIMARY,
  drawerInactiveTintColor: colors.TERTIARY,
  drawerInactiveBackgroundColor: colors.TERTIARY,
  headerShown: false,
  drawerType: 'slide',
  swipeEdgeWidth: Dimensions.get('screen').width,
  drawerStyle: {backgroundColor: 'transparent'},
  drawerContentContainerStyle: {backgroundColor: 'transparent'},
  sceneContainerStyle: {backgroundColor: 'transparent'},
  overlayColor: 'transparent',
};

export const defaultBottomNavigationOptions: BottomTabNavigationOptions = {
  headerShown: false,
};
