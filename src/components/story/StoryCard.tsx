import {StoryProps} from '@/demo/types';
import React from 'react';
import {
  View,
  ViewStyle,
  Image,
  ImageStyle,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {StoryCardTitleText} from './StoryCardTitleText';
import {StoryCardSubtitleText} from './StoryCardSubtitleText';
import {styles} from '@/theme/styles';
import {UserAvatar} from '../UserAvatar';
import {UserTitle} from '../../shortPosts/components/UserTitle';
import colors from '@/theme/colors';
import Animated from 'react-native-reanimated';
import {screens} from '@/navigators/config';
import {useNavigation} from '@react-navigation/native';
import {ShortPostStatBar} from '../../shortPosts/components/ShortPostStatBar';

export function StoryCard(props: StoryProps): JSX.Element {
  const navigation = useNavigation();
  let coverBackgroundColor: string = colors.BACKGROUND;

  const blurViewStyle: ViewStyle = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.6,
    backgroundColor: coverBackgroundColor,
  };

  const user = props.user;

  const goToStoryScreen = () =>
    navigation.navigate(screens.STORY, {storyId: props.id});

  return (
    <TouchableOpacity
      onPress={goToStoryScreen}
      style={outerMostContainer}
      delayPressIn={100}>
      <View style={StoryCardContainerStyle}>
        <Animated.Image
          sharedTransitionTag="storyCover"
          style={coverImageStyle}
          source={{uri: props.cover, height: 50, width: 50}}
        />
        <View style={blurViewStyle} />
        {/* <BlurView
        style={blurViewStyle}
        blurType="light"
        blurAmount={10}
        blurRadius={20}
      /> */}
        <View style={innerViewStyle}>
          <StoryCardTitleText>{props.title}</StoryCardTitleText>
          <StoryCardSubtitleText>{props.subtitle}</StoryCardSubtitleText>
          <TouchableOpacity style={userDetailsView}>
            <UserAvatar {...user} width={20} />
            <UserTitle {...user} displayNameSize={14} userNameSize={10} />
          </TouchableOpacity>
          <ScrollView
            contentContainerStyle={coverArtCarouselStyle}
            horizontal={true}>
            {props.tracks.map((t, i) => (
              <Image
                key={i}
                source={{uri: t.trackArtwork, width: 30, height: 30}}
              />
            ))}
          </ScrollView>
          <View style={statsView}>
            <ShortPostStatBar
              replies={props.replies}
              saves={props.saves}
              upvotes={props.upvotes}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const outerMostContainer: ViewStyle = {
  width: '100%',
  paddingHorizontal: 15,
};

const StoryCardContainerStyle: ViewStyle = {
  width: '100%',
  alignItems: 'center',
  overflow: 'hidden',
  //   marginHorizontal: 30,
  marginVertical: 10,
  borderRadius: 8,
  //   backgroundColor: 'red',
};

const innerViewStyle: ViewStyle = {
  width: '100%',
  paddingHorizontal: 30,
  paddingVertical: 20,
  overflow: 'hidden',
  flexDirection: 'column',
  alignItems: 'flex-start',

  //   backgroundColor: 'blue',
};

const coverImageStyle: ImageStyle = {
  position: 'absolute',
  width: '100%',
  height: '100%',
  resizeMode: 'cover',
};

const userDetailsView: ViewStyle = {
  ...styles.flexRowStartCent,
  gap: 10,
  marginTop: 20,
};

const statsView: ViewStyle = {
  marginTop: 20,
};

const coverArtCarouselStyle: ViewStyle = {
  marginTop: 20,
  flexDirection: 'row',
  gap: 5,
};
