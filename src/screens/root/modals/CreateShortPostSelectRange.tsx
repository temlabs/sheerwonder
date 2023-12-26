import React from 'react';
import {View, ViewStyle, TouchableOpacity, Text, TextStyle} from 'react-native';
import {modalViewStyle} from './styles';
import {RangeSelector} from '@/components/rangeSelector/RangeSelector';
import {useHeaderHeight} from '@react-navigation/elements';
import colors from '@/theme/colors';
import {AnimatedTextLabel} from '@/components/rangeSelector/AnimatedTextLabel';
import {DEFAULT_IN_PERC, SHORT_POST_ID} from '@/config/postConfig';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {screens} from '@/navigators/config';
import {RootStackParamList} from '@/navigators/types';
import {TrackCard} from '@/components/trackCard/TrackCard';
import {useStore} from '@/store/useStore';
import {isCurrentlyPlaying} from '@/spotify/spotifyPlaybackFunctions';
import {ActionButton} from '@/components/buttons/ActionButton';
import {useRangeSelector} from '@/components/rangeSelector/hooks/useRangeSelector';
import {
  convertMillisecondsToTimestamp,
  convertTimestampToMilliseconds,
} from '@/components/rangeSelector/functions/utlilityFunctions';

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

  const trackIsPlaying = isCurrentlyPlaying(
    track.id,
    SHORT_POST_ID,
    selectedTrack,
    playingTrack,
  );

  const updateFromAndTo = async (startPerc: number, endPerc: number) => {
    // write to store and play track if it was playing
    const newIn = Math.round(duration * startPerc);
    const newOut = Math.round(duration * endPerc);
    const inHasChanged = shortPostDraft?.in !== newIn;
    console.debug({shortPostDraft, newIn, inHasChanged});
    setShortPostDraft({
      ...shortPostDraft,
      in: newIn,
      out: newOut,
    });

    if (trackIsPlaying && inHasChanged) {
      await seek(newIn);
    }
  };

  const {
    fromTimestamp,
    gesture,
    height,
    onLayout,
    toTimestamp,
    top,
    rangeSelectorHeight,
  } = useRangeSelector({
    initialInPerc: (shortPostDraft?.in ?? 0) / duration,
    initialOutPerc:
      shortPostDraft?.out !== undefined ? shortPostDraft?.out / duration : 0.5,
    onRangeChange: updateFromAndTo,
    track,
  });

  const headerHeight = useHeaderHeight();

  const punchInAtCurrentTime = async () => {
    if (!rangeSelectorHeight) {
      return;
    }
    const timeDelta = Date.now() - playingTrack.startTime;
    const timeDeltaPerc = timeDelta / duration;

    const heightDelta = timeDeltaPerc * rangeSelectorHeight;
    top.value = top.value + heightDelta;
    height.value = height.value - heightDelta;
    fromTimestamp.value = convertMillisecondsToTimestamp(
      convertTimestampToMilliseconds(fromTimestamp.value) + timeDelta,
    );
    await updateFromAndTo(
      shortPostDraft?.in !== undefined
        ? (shortPostDraft.in + timeDelta) / duration
        : DEFAULT_IN_PERC,
      (top.value + height.value) / rangeSelectorHeight,
    );
  };
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
            <AnimatedTextLabel label="From" value={fromTimestamp} />
            <AnimatedTextLabel label="To" value={toTimestamp} />
          </View>
          <View style={buttonsContainer}>
            <ActionButton
              text="Punch in"
              onPress={punchInAtCurrentTime}
              disabled={trackIsPlaying === false}
            />
            <ActionButton
              text="Punch out"
              onPress={punchOutAtCurrentTime}
              disabled={trackIsPlaying === false}
            />
          </View>
        </View>
        <View style={timeWheelStyle}>
          <RangeSelector
            gesture={gesture}
            height={height}
            onLayout={onLayout}
            top={top}
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
          timeOut={
            shortPostDraft?.out !== undefined
              ? shortPostDraft?.out
              : 0.5 * duration
          }
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
