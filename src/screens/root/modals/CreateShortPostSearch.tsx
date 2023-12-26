import React from 'react';
import {View, ViewStyle, FlatList, ListRenderItem} from 'react-native';
import colors from '@/theme/colors';
import {SearchBar} from '@/components/textInput/SearchBar';
import {TrackButton} from '@/components/buttons/TrackButton';
import {SpotifyTrack} from '@/spotify/spotifyTrackTypes';
import {useSpotifySearch} from '@/spotify/hooks/useSpotifySearch';
import {CloseButton} from '@/components/buttons/CloseButton';
import {modalViewStyle} from './styles';
import {screens} from '@/navigators/config';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '@/navigators/types';
import {useStore} from '@/store/useStore';
import {DEFAULT_IN_PERC, DEFAULT_OUT_PERC} from '@/config/postConfig';

export function CreateShortPostSearch({
  navigation,
}: NativeStackScreenProps<
  RootStackParamList,
  typeof screens.CREATE_SHORT_POST_SEARCH
>) {
  const setShortPostDraft = useStore(state => state.setShortPostDraft);
  const shortPostDraft = useStore(state => state.shortPostDraft);
  const {onSearchTermChange, searchResults, searchTerm} = useSpotifySearch();

  const goToRangeSelectScreen = (track: SpotifyTrack) => {
    const differentTrack = track.id !== shortPostDraft?.track?.id;
    if (differentTrack) {
      //use defaults
      setShortPostDraft({
        track,
        in: DEFAULT_IN_PERC * track.duration_ms,
        out: DEFAULT_OUT_PERC * track.duration_ms,
      });
    }
    navigation.navigate(screens.CREATE_SHORT_POST_SELECT_RANGE, {
      track,
    });
  };

  const renderItem: ListRenderItem<SpotifyTrack | undefined> = ({
    item: track,
  }) => {
    return track ? (
      <TrackButton {...track} onPress={() => goToRangeSelectScreen(track)} />
    ) : (
      <></>
    );
  };

  const keyExtractor = (item: SpotifyTrack, index: number) =>
    `${item.id}-${index}`;

  return (
    <View style={modalViewStyle}>
      <View style={innerView}>
        <View style={closeButtonContainer}>
          <CloseButton onPress={() => navigation.goBack()} />
        </View>
        <SearchBar onChange={onSearchTermChange} searchTerm={searchTerm} />
        <FlatList
          data={searchResults}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
      </View>
    </View>
  );
}

const closeButtonContainer: ViewStyle = {
  width: '100%',
  justifyContent: 'flex-start',
  flexDirection: 'row',
};

const innerView: ViewStyle = {
  backgroundColor: colors.BACKGROUND,
  width: '100%',
  height: '100%',
  gap: 15,
};
