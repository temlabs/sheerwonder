import {UseQueryResult, useQuery} from '@tanstack/react-query';
import {queryKeys} from '../queryKeys';
import {fetchSpotifyProfile} from '@/spotify/spotifyProfileFunctions';
import {SpotifyProfile} from '@/spotify/spotifyTypes';

export default function useSpotifyProfileQuery(
  enabled?: boolean,
): UseQueryResult<SpotifyProfile, Error> {
  const spotifyProfileQuery = useQuery({
    queryKey: queryKeys.SPOTIFY_PROFILE_KEY(),
    queryFn: fetchSpotifyProfile,
    staleTime: Infinity,
    enabled: enabled,
  });

  return spotifyProfileQuery;
}
