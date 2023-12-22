import React, {startTransition, useCallback, useEffect, useState} from 'react';
import {
  View,
  ViewStyle,
  TouchableOpacity,
  Text,
  FlatList,
  ListRenderItem,
} from 'react-native';
import colors from '@/theme/colors';
import {Close} from '@/components/icons/Close';
import {useNavigation} from '@react-navigation/native';
import {SearchBar} from '@/components/textInput/SearchBar';
import useRecentlyPlayedTracksQuery from '@/tanstack/queries/useRecentPlayedTracksQuery';
import {TrackListButton} from '@/components/buttons/TrackListButton';
import {
  RecentlyPlayedResponse,
  SpotifyTrack,
  TrackItem,
} from '@/spotify/spotifyTrackTypes';
import {searchForTrack} from '@/spotify/spotifyUserFunctions';

let debounceTimer: NodeJS.Timeout; //

export function CreateShortPost() {
  const [searchResults, setSearchResults] = useState<TrackItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigation = useNavigation();
  const {data: recentlyPlayedTracks} = useRecentlyPlayedTracksQuery();

  const fetchSearchResults = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    clearTimeout(debounceTimer); // Clear the existing timer on each call

    debounceTimer = setTimeout(() => {
      startTransition(() => {
        if (searchTerm) {
          searchForTrack(searchTerm).then(results => {
            results && setSearchResults(results.items);
          });
        }
      });
    }, 500);
  };

  useEffect(() => {
    return () => clearTimeout(debounceTimer);
  }, []);

  const renderItem:
    | ListRenderItem<RecentlyPlayedResponse['items']>
    | null
    | undefined = useCallback(item => {
    const currentItem = item.item;
    const track = 'track' in currentItem ? currentItem.track : currentItem;
    return <TrackListButton {...track} />;
  }, []);

  const showSearchResults = !!searchTerm;

  return (
    <View style={outerView}>
      <View style={innerView}>
        <TouchableOpacity
          style={closeButtonContainer}
          onPress={() => navigation.goBack()}>
          <Close height={30} width={30} fill={colors.TEXT_PRIMARY} />
        </TouchableOpacity>
        <SearchBar onChange={fetchSearchResults} searchTerm={searchTerm} />
        <FlatList
          data={showSearchResults ? searchResults : recentlyPlayedTracks?.items}
          renderItem={renderItem}
        />
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
