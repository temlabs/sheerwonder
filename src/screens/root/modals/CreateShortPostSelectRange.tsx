import React from 'react';
import {
  View,
  ViewStyle,
  TouchableOpacity,
  Text,
  TextStyle,
  Image,
} from 'react-native';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {modalViewStyle} from './styles';
import {TimeWheel} from '@/components/timeWheel/TimeWheel';
import {useHeaderHeight} from '@react-navigation/elements';
import colors from '@/theme/colors';
import {ValueWithLabel} from '@/components/timeWheel/ValueWithLabel';
import {convertMillisecondsToTimestamp} from '@/components/timeWheel/functions';
import {useSharedValue} from 'react-native-reanimated';
import {MAXIMUM_POST_TIME_MS} from '@/config/postConfig';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {screens} from '@/navigators/config';
import {RootStackParamList} from '@/navigators/types';
import {TrackCard} from '@/components/trackCard/TrackCard';
import {TrackDetails} from '@/components/trackCard/TrackDetails';

export function CreateShortPostSelectRange({
  navigation,
  route,
}: NativeStackScreenProps<
  RootStackParamList,
  typeof screens.CREATE_SHORT_POST_SELECT_RANGE
>) {
  const track = route.params.track;
  const duration = track.duration_ms;

  const from = useSharedValue<string>('00:00');
  const to = useSharedValue<string>(
    convertMillisecondsToTimestamp(Math.min(duration, MAXIMUM_POST_TIME_MS)),
  );
  const headerHeight = useHeaderHeight();

  const updateFromAndTo = (startPos: number, endPos: number) => {
    // write to store and play track if it was playing
  };

  return (
    <View style={[modalViewStyle, {paddingTop: headerHeight + 20}]}>
      <View style={trackInfoView}>
        <Image
          source={{uri: track.album.images[0].url, height: 100, width: 100}}
        />
        <TrackDetails
          trackArtist={track.artists.map(a => a.name).join(', ')}
          trackName={track.name}
        />
        <View></View>
      </View>
      <View style={infoSliderContainer}>
        <View style={infoContainer}>
          <ValueWithLabel label="From" value={from} />
          <ValueWithLabel label="To" value={to} />
        </View>
        <View style={timeWheelStyle}>
          <TimeWheel
            onEnd={updateFromAndTo}
            duration={duration}
            startPos={from}
            endPos={to}
          />
        </View>
      </View>
      <View style={bottomBarStyle}>
        <TouchableOpacity>
          <Text style={buttonTextStyle}>Write your post</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const timeWheelStyle: ViewStyle = {
  height: '70%',
  flexGrow: 1,
  alignItems: 'center',
  // overflow: 'hidden',
  // backgroundColor: 'purple',
};

const infoSliderContainer: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-evenly',
};

const infoContainer: ViewStyle = {
  width: '85%',
};

const trackInfoView: ViewStyle = {
  width: '100%',
  height: 130,
  flexDirection: 'row',
  gap: 10,
};

const bottomBarStyle: ViewStyle = {
  height: 80,
  alignItems: 'flex-end',
  justifyContent: 'center',
};

const buttonTextStyle: TextStyle = {
  color: colors.TEXT_PRIMARY,
};
