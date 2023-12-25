import React from 'react';
import {View, ViewStyle, FlatList, ListRenderItem} from 'react-native';
import colors from '@/theme/colors';
import {useNavigation} from '@react-navigation/native';
import {SearchBar} from '@/components/textInput/SearchBar';
import {TrackButton} from '@/components/buttons/TrackButton';
import {SpotifyTrack} from '@/spotify/spotifyTrackTypes';
import {useSpotifySearch} from '@/spotify/hooks/useSpotifySearch';
import {CloseButton} from '@/components/buttons/CloseButton';
import {modalViewStyle} from './styles';
import {screens} from '@/navigators/config';

export function CreateShortPostSearch() {
  const {onSearchTermChange, searchResults, searchTerm} = useSpotifySearch();
  const navigation = useNavigation();

  const renderItem: ListRenderItem<SpotifyTrack | undefined> = ({
    item: track,
  }) => {
    return track ? (
      <TrackButton
        {...track}
        onPress={() =>
          navigation.navigate(screens.CREATE_SHORT_POST_SELECT_RANGE)
        }
      />
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
