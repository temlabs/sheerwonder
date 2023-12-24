import {startTransition, useEffect, useMemo, useState} from 'react';
import {SpotifyTrack} from '../types/spotifyCommonTypes';
import useRecentlyPlayedTracksQuery from '@/tanstack/queries/useRecentPlayedTracksQuery';
import {searchForTrack} from '../spotifyUserFunctions';
import {recentlyPlayedTracksResponseToSpotfyTrackList} from '../spotifyUtils';

let debounceTimer: NodeJS.Timeout;

export function useSpotifySearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<SpotifyTrack[]>([]);
  const {data: recentlyPlayedTracks} = useRecentlyPlayedTracksQuery();
  const recentlyPlayedTracksList = useMemo(() => {
    if (recentlyPlayedTracks) {
      return recentlyPlayedTracksResponseToSpotfyTrackList(
        recentlyPlayedTracks,
      );
    } else {
      return [];
    }
  }, [recentlyPlayedTracks]);

  const fetchSearchResults = (searchTermArg: string) => {
    setSearchTerm(searchTermArg);
    clearTimeout(debounceTimer);

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

  const showSearchResults = !!searchTerm;
  const searchResultsToDisplay = showSearchResults
    ? searchResults
    : recentlyPlayedTracksList;

  return {
    searchTerm,
    onSearchTermChange: fetchSearchResults,
    searchResults: searchResultsToDisplay,
  };
}
