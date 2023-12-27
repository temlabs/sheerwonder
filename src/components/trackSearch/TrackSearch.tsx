import React, {startTransition, useEffect, useState} from 'react';
import {
  View,
  ViewStyle,
  TouchableOpacity,
  FlatList,
  ListRenderItem,
} from 'react-native';
import colors from '@/theme/colors';
import {Close} from '@/components/icons/Close';
import {useNavigation} from '@react-navigation/native';
import {SearchBar} from '@/components/textInput/SearchBar';
import useRecentlyPlayedTracksQuery from '@/tanstack/queries/useRecentPlayedTracksQuery';
import {TrackListButton} from '@/components/buttons/TrackButton';
import {SpotifyTrack, TrackItem} from '@/spotify/spotifyTrackTypes';
import {searchForTrack} from '@/spotify/spotifyUserFunctions';

interface SearchBarProps {
    onChange:(text:string)=>void;
    searchTerm:string
}

interface Props<T extends SpotifyTrack & {onPress?:(track:SpotifyTrack)=>void}> {
  listItem: React.ReactNode;
  searchTextInput: React.ReactNode;
  initialData: SpotifyTrack[] | TrackItem[];
  renderItem: React.FC<T>;
  onPress:
}

export function TrackSearch<T extends SpotifyTrack & {onPress?:(track:SpotifyTrack)=>void}>(props: Props<T>) {
  const [searchResults, setSearchResults] = useState<SpotifyTrack[]>([]);
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
            results && setSearchResults(results.tracks.items);
          });
        }
      });
    }, 500);
  };

  useEffect(() => {
    return () => clearTimeout(debounceTimer);
  }, []);

  const renderItem:
    | ListRenderItem<SpotifyTrack | TrackItem | undefined>
    | null
    | undefined = ({item}) => {
    if (!item) {
      return <></>;
    }

    let track = {} as SpotifyTrack;
    if ('track' in item) {
      track = item.track;
    } else if ('album' in item) {
      track = item;
    }
return <props.renderItem {...track}/>
    return <TrackListButton {...track} onPress={() => {}} />;
  };

  const showSearchResults = !!searchTerm;

  return (
    <>
      <SearchBar onChange={fetchSearchResults} searchTerm={searchTerm} />
      <FlatList
        data={showSearchResults ? searchResults : recentlyPlayedTracks?.items}
        renderItem={renderItem}
      />
    </>
  );
}
