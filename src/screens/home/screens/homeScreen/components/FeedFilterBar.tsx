import React, {useState} from 'react';
import {View, ViewStyle, Text, TextStyle} from 'react-native';
import {HomeDrawerProps, HomeScreenProps} from '@/screens/types';
import {Sort} from '@/components/icons/Sort';
import {Menu} from '@/components/icons/Menu';
import {FeedFilterButton} from './FeedFilterButton';
import colors from '@/theme/colors';
import {screens} from '@/navigators/config';

const feedFilters = ['All Posts', 'Following'] as const;
type FeedFilter = (typeof feedFilters)[number];

interface Props {
  navigation: HomeDrawerProps['navigation'];
}

export function FeedFilterBar({navigation}: Props): JSX.Element {
  const [selectedFilter, setSelectedFilter] = useState<FeedFilter>('All Posts');
  const changeFeedFilter = (filter: FeedFilter) => {
    setSelectedFilter(filter);
  };

  return (
    <View style={tabButtonBarContainer}>
      <FeedFilterButton onPress={() => navigation.openDrawer()}>
        <Menu fill={colors.PRIMARY} width={28} height={28} />
      </FeedFilterButton>
      <FeedFilterButton onPress={() => setSelectedFilter('All Posts')}>
        <Text style={textStyle(selectedFilter === 'All Posts')}>All Posts</Text>
      </FeedFilterButton>
      <FeedFilterButton onPress={() => setSelectedFilter('Following')}>
        <Text style={textStyle(selectedFilter === 'Following')}>Following</Text>
      </FeedFilterButton>

      <FeedFilterButton>
        <Sort fill={colors.PRIMARY} width={28} height={28} />
      </FeedFilterButton>
    </View>
  );
}

const tabButtonBarContainer: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%',
  // paddingHorizontal: 30,
  paddingVertical: 20,
  //   backgroundColor: 'blue',
};

const textStyle: (isSelected: boolean) => TextStyle = (isSelected: boolean) => {
  return {
    color: isSelected ? colors.TEXT_WHITE : colors.TEXT_GRAY,
  };
};
