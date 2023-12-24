import React from 'react';
import {View, ViewStyle, FlatList, ListRenderItem} from 'react-native';
import colors from '@/theme/colors';
import {useNavigation} from '@react-navigation/native';
import {SearchBar} from '@/components/textInput/SearchBar';
import {TrackButton} from '@/components/buttons/TrackButton';
import {SpotifyTrack} from '@/spotify/spotifyTrackTypes';
import {useSpotifySearch} from '@/spotify/hooks/useSpotifySearch';
import {CloseButton} from '@/components/buttons/CloseButton';

export function CreateShortPost() {
  const {onSearchTermChange, searchResults, searchTerm} = useSpotifySearch();
  const navigation = useNavigation();

  const renderItem: ListRenderItem<SpotifyTrack | undefined> = ({
    item: track,
  }) => {
    return track ? <TrackButton {...track} onPress={() => {}} /> : <></>;
  };

  return (
    <View style={outerView}>
      <View style={innerView}>
        <View style={closeButtonContainer}>
          <CloseButton onPress={() => navigation.goBack()} />
        </View>
        <SearchBar onChange={onSearchTermChange} searchTerm={searchTerm} />
        <FlatList data={searchResults} renderItem={renderItem} />
      </View>
    </View>
  );
}

const outerView: ViewStyle = {
  flex: 1,
  backgroundColor: colors.BACKGROUND,
  paddingHorizontal: 10,
  paddingTop: 20,
};

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
