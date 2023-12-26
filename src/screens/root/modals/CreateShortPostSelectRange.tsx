import React from 'react';
import {View, ViewStyle, TouchableOpacity, Text, TextStyle} from 'react-native';
import {modalViewStyle} from './styles';
import {TimeWheel} from '@/components/timeWheel/TimeWheel';
import {useHeaderHeight} from '@react-navigation/elements';
import colors from '@/theme/colors';
import {ValueWithLabel} from '@/components/timeWheel/ValueWithLabel';
import {
  convertMillisecondsToTimestamp,
  convertTimestampToMilliseconds,
} from '@/components/timeWheel/functions';
import {useSharedValue} from 'react-native-reanimated';
import {MAXIMUM_POST_TIME_MS, SHORT_POST_ID} from '@/config/postConfig';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {screens} from '@/navigators/config';
import {RootStackParamList} from '@/navigators/types';
import {TrackCard} from '@/components/trackCard/TrackCard';
import {useStore} from '@/store/useStore';
import {isCurrentlyPlaying} from '@/spotify/spotifyPlaybackFunctions';
import {ActionButton} from '@/components/buttons/ActionButton';

export function CreateShortPostSelectRange({
  navigation,
  route,
}: NativeStackScreenProps<
  RootStackParamList,
  typeof screens.CREATE_SHORT_POST_SELECT_RANGE
>) {
  const selectedTrack = useStore(state => state.selectedTrack);
  const playingTrack = useStore(state => state.playingTrack);
  const seek = useStore(state => state.seek);
  const setShortPostDraft = useStore(state => state.setShortPostDraft);
  const shortPostDraft = useStore(state => state.shortPostDraft);
  const track = route.params.track;
  const duration = track.duration_ms;

  const initialStart = shortPostDraft.in
    ? Math.round(shortPostDraft.in / track.duration_ms)
    : 0;
  const initialEnd = shortPostDraft.out
    ? Math.round(shortPostDraft.out / track.duration_ms)
    : 0;
  console.debug({initialStart, initialEnd});
  const from = useSharedValue<string>('00:00');
  const to = useSharedValue<string>(
    convertMillisecondsToTimestamp(Math.min(duration, MAXIMUM_POST_TIME_MS)),
  );
  const headerHeight = useHeaderHeight();

  const updateFromAndTo = async (startPos: number, endPos: number) => {
    // write to store and play track if it was playing
    const newIn = Math.round(duration * startPos);
    const newOut = Math.round(duration * endPos);
    const inHasChanged = shortPostDraft?.in !== newIn;
    setShortPostDraft({
      ...shortPostDraft,
      in: newIn,
      out: newOut,
    });
    const trackIsPlaying = isCurrentlyPlaying(
      track.id,
      SHORT_POST_ID,
      selectedTrack,
      playingTrack,
    );
    if (trackIsPlaying && inHasChanged) {
      await seek(newIn);
    }
  };

  const punchInAtCurrentTime = () => {};
  const punchOutAtCurrentTime = () => {};

  const trackArtist = track.artists.map(a => a.name).join(', ');
  const trackArtwork = track.album.images[0].url;

  return (
    <View
      style={[
        modalViewStyle,
        {
          paddingTop: headerHeight + 20,
        },
        topViewStyle,
      ]}>
      <View style={infoSliderContainer}>
        <View style={infoContainer}>
          <View style={timestampsContainer}>
            <ValueWithLabel label="From" value={from} />
            <ValueWithLabel label="To" value={to} />
          </View>
          <View style={buttonsContainer}>
            <ActionButton text="Punch in" onPress={punchInAtCurrentTime} />
            <ActionButton text="Punch out" onPress={punchOutAtCurrentTime} />
          </View>
        </View>
        <View style={timeWheelStyle}>
          <TimeWheel
            onEnd={updateFromAndTo}
            duration={duration}
            startPos={from}
            endPos={to}
            initialEnd={initialEnd}
            initialStart={initialStart}
          />
        </View>
      </View>
      <View style={trackInfoView}>
        <TrackCard
          duration={track.duration_ms}
          id={SHORT_POST_ID}
          spotifyId={track.id}
          trackArtist={trackArtist}
          trackArtwork={trackArtwork}
          trackName={track.name}
          key={track.id}
          timeIn={shortPostDraft?.in}
          timeOut={shortPostDraft?.out}
        />
      </View>
      <View style={bottomBarStyle}>
        <TouchableOpacity>
          <Text style={buttonTextStyle}>Write your post</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const topViewStyle: ViewStyle = {
  maxHeight: '100%',
  overflow: 'hidden',
  justifyContent: 'space-between',
  gap: 50,
};

const timeWheelStyle: ViewStyle = {
  // flexGrow: 1,
  width: '30%',
  alignItems: 'flex-end',
  backgroundColor: colors.BACKGROUND_BORDER,
  overflow: 'hidden',
};

const infoSliderContainer: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-evenly',
  flexGrow: 1,
  height: '70%',
  gap: 20,
};

const infoContainer: ViewStyle = {
  width: '65%',
  justifyContent: 'space-between',
};

const trackInfoView: ViewStyle = {
  width: '100%',
  flexDirection: 'row',
  gap: 10,
};

const bottomBarStyle: ViewStyle = {
  alignItems: 'flex-end',
  justifyContent: 'center',
};

const buttonTextStyle: TextStyle = {
  color: colors.TEXT_PRIMARY,
};

const timestampsContainer: ViewStyle = {};

const buttonsContainer: ViewStyle = {
  gap: 20,
};
