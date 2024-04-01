import React, {useRef, useState} from 'react';
import {View, ViewStyle, Image, ImageStyle, Animated} from 'react-native';
import colors from '@/theme/colors';

import {LinearGradientBackground} from '../LinearGradientBackground';
import {TrackProgressBar} from './TrackProgressBar';
import {useStore} from '@/store/useStore';
import {isCurrentlyPlaying} from '@/spotify/spotifyPlaybackFunctions';
import {TouchableOpacity} from 'react-native';
import {TrackDetails} from './TrackDetails';
import {useImageColor} from '@/hooks/useImageColor';
import {Track} from '@/tracks/trackTypes';
import {ShortPost} from '@/shortPosts/shortPostTypes';
import {GradientButton} from '../buttons/GradientButton';

type Props = Omit<Track, 'created_at'> &
  Pick<ShortPost, 'time_in' | 'time_out' | 'id'> & {transparent?: boolean};

export function TrackCard({
  artist,
  artwork,
  name,
  duration,
  time_in,
  time_out,
  spotify_id,
  id,
  transparent = true,
}: Props): JSX.Element {
  const trackColors = useImageColor(artwork);
  const play = useStore(state => state.play);
  const setSelectedTrack = useStore(state => state.setSelectedTrack);
  const selectedTrack = useStore(state => state.selectedTrack);
  const playingTrack = useStore(state => state.playingTrack);
  const pause = useStore(state => state.pause);

  let backgroundDark: string = colors.BACKGROUND;
  let backgroundLight: string = colors.BACKGROUND;
  let activeColor: string = colors.TEXT_WHITE;

  if (trackColors?.platform === 'android') {
    backgroundDark = trackColors.vibrant;
    backgroundLight = trackColors.lightMuted;
    // activeColor = trackColors.vibrant;
  } else if (trackColors?.platform === 'ios') {
    backgroundDark = trackColors.primary;
    backgroundLight = trackColors.secondary;
    // activeColor = trackColors.detail;
  }

  const [scale] = useState(new Animated.Value(1));

  const timeoutRef = useRef<NodeJS.Timeout>();

  const thisTrackIsPlaying = isCurrentlyPlaying(
    spotify_id,
    id,
    selectedTrack,
    playingTrack,
  );

  const handlePressIn = async () => {
    if (thisTrackIsPlaying) {
      // setSelectedTrack({postId: '', spotifyTrackId: ''});
      try {
        await pause();
      } catch (error) {}
    } else {
      spotify_id && setSelectedTrack({spotifyTrackId: spotify_id, postId: id});
      try {
        await play(`spotify:track:${spotify_id}`, time_in ?? 0);
      } catch (error) {
        console.log('play err: ', error);
      }
    }
  };

  const handlePressOut = () => {
    clearTimeout(timeoutRef.current);
    Animated.spring(scale, {
      toValue: 1,
      speed: 200,
      useNativeDriver: true,
    }).start();
  };

  const animatedContainerStyle = {
    transform: [{scale: scale}],
  };

  return (
    <View>
      <View style={containerView}>
        <View style={innerContainerView}>
          <LinearGradientBackground
            x1={100}
            style={gradientBackgroundStyle(transparent)}
            stops={[
              {offset: 0, opacity: 1, color: backgroundDark},
              {offset: 100, opacity: 1, color: backgroundLight},
            ]}
          />
          {/* {artwork ? (
            <Image
              style={gradientBackgroundStyle(transparent)}
              source={{uri: artwork, width: 20, height: 20}}
              blurRadius={80}
            />
          ) : (
            <></>
          )} */}
          <TrackProgressBar
            duration={duration}
            timeIn={time_in ?? 0}
            timeOut={time_out ?? duration}
            trackId={spotify_id}
            id={id}
          />
          <View style={innerViewStyle}>
            {artwork ? (
              <Image
                style={coverArtImageStyle}
                source={{uri: artwork, width: 20, height: 20}}
              />
            ) : (
              <></>
            )}
            <TrackDetails trackArtist={artist} trackName={name} />

            <View style={{height: 20, width: 24}}>
              {/* <PlayingBarsAnimation isPlaying={thisTrackIsPlaying} /> */}
            </View>
          </View>
        </View>
        {/* <TouchableOpacity style={playButtonStyle} onPress={handlePressIn} /> */}
        <GradientButton
          style={button}
          onPress={handlePressIn}
          activeColor={activeColor}
        />
      </View>
    </View>
  );
}

const containerView: ViewStyle = {
  width: '100%',
  // height: 40,
  borderRadius: 8,
  // borderTopLeftRadius: 4,
  // borderTopRightRadius: 4,
  overflow: 'hidden',
  backgroundColor: 'black',
  alignSelf: 'center',
};

const innerContainerView: ViewStyle = {
  borderRadius: 8,
  // borderTopLeftRadius: 4,
  // borderTopRightRadius: 4,
  overflow: 'hidden',
};

const innerViewStyle: ViewStyle = {
  paddingHorizontal: 10,
  paddingVertical: 10,
  flexDirection: 'row',
  gap: 15,
  alignItems: 'center',
  // height: '100%',
  width: '100%',
};

const gradientBackgroundStyle: (
  transparent: boolean,
) => ImageStyle = transparent => ({
  position: 'absolute',
  height: '100%',
  width: '100%',
  alignSelf: 'center',
  opacity: transparent ? 0.7 : 1,
});

const coverArtImageStyle: ImageStyle = {
  width: 50,
  height: 50,
};

const playButtonStyle: ViewStyle = {
  position: 'absolute',
  top: 0,
  right: 0,
  width: '30%',
  height: '100%',
  backgroundColor: 'white',
  opacity: 0.01,
};

const button: ViewStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'transparent',
  // zIndex: 70,
};
