import * as React from 'react';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {HomeStack} from '@/screens/home/HomeStack';
import {DiscoverStack} from '@/screens/discover/DiscoverStack';
import {ProfileStack} from '@/screens/profile/ProfileStack';
import {CommunityStack} from '@/screens/community/CommunityStack';
import {BottomTabParamList, StackName} from './types';
import {TabBar} from './components/TabBar';
import {stacks, defaultBottomNavigationOptions} from '@/navigators/config';
import {HomeIcon} from './components/icons/HomeIcon';
import {CommunityIcon} from './components/icons/CommunityIcon';
import {DiscoverIcon} from './components/icons/DiscoverIcon';
import {ProfileIcon} from './components/icons/ProfileIcon';
import {TabLabel} from './components/TabLabel';

const Tab = createBottomTabNavigator<BottomTabParamList>();

const TabBarWrapper = (props: BottomTabBarProps) => {
  return <TabBar {...props} />;
};

const iconWidth = 25;
const IconWrapper = ({color}: {color: string}) => (
  <DiscoverIcon fill={color} width={iconWidth} height={iconWidth} />
);

export function TabNavigator(): JSX.Element {
  return (
    <Tab.Navigator tabBar={TabBarWrapper} initialRouteName={stacks.HOME}>
      <Tab.Screen<StackName>
        name={stacks.HOME}
        component={HomeStack}
        options={{
          ...defaultBottomNavigationOptions,
          tabBarLabel: ({color}) => (
            <HomeIcon fill={color} width={iconWidth} height={iconWidth} />
          ),
        }}
      />
      <Tab.Screen<StackName>
        name={stacks.DISCOVER}
        component={DiscoverStack}
        options={{
          ...defaultBottomNavigationOptions,
          tabBarLabel: ({color}) => (
            <DiscoverIcon fill={color} width={iconWidth} height={iconWidth} />
          ),
        }}
      />
      <Tab.Screen<StackName>
        name={stacks.COMMUNITY}
        component={CommunityStack}
        options={{
          ...defaultBottomNavigationOptions,
          tabBarLabel: ({color}) => (
            <CommunityIcon fill={color} width={iconWidth} height={iconWidth} />
          ),
        }}
      />
      <Tab.Screen<StackName>
        name={stacks.PROFILE}
        component={ProfileStack}
        options={{
          ...defaultBottomNavigationOptions,
          tabBarLabel: ({color}) => (
            <ProfileIcon fill={color} width={iconWidth} height={iconWidth} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
