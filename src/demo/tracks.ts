import {TrackProps} from './types';

export const tracks: TrackProps[] = [
  {
    trackName: 'Jonathan L. Seagull',
    trackArtist: 'Sampha',
    trackArtwork:
      'https://d94thh4m1x8qv.cloudfront.net/eyJidWNrZXQiOiJkaXktbWFnYXppbmUiLCJrZXkiOiJkL2RpeS9BcnRpc3RzL1MvU2FtcGhhL2xha2FpLmpwZyIsImVkaXRzIjp7IndlYnAiOnsicXVhbGl0eSI6ODJ9LCJyZXNpemUiOnsid2lkdGgiOjI3MDAsImhlaWdodCI6MjcwMCwiZml0IjoiY292ZXIifSwic2hhcnBlbiI6dHJ1ZX19',
    duration: 274599,
    spotifyId: '0jBmIDMdIOOct8T62qBeRh',
  },
  {
    trackName: 'STILL HOLY',
    trackArtist: "indie tribe, nobigdyl. & Torey D'Shaun",
    trackArtwork:
      'https://t2.genius.com/unsafe/510x510/https%3A%2F%2Fimages.genius.com%2Fe170518314c9e42ecfa5414db9d80b93.1000x1000x1.jpg',
    duration: 177841,
    spotifyId: '1tm85WMjFuetEHeip03uqy',
  },
  {
    trackName: 'City in the Sky',
    trackArtist: 'Elijah Fox',
    trackArtwork:
      'data:image/jpeg;base64,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',
    duration: 213614,
    spotifyId: '4VtFdKJaJ9dYTUDBNhBOYx',
  },
  {
    trackName: 'Never Feel Fear',
    trackArtist: 'SAULT',
    trackArtwork:
      'https://i.scdn.co/image/ab67616d0000b2736c0dcddfb81d02957ad9a9d2',
    duration: 190005,
    spotifyId: '7yz92cnDAFzViFsoBoGuuX',
  },
  {
    trackName: 'Breathe',
    trackArtist: 'Alfa Mist, Kaya Thomas-Dyke',
    trackArtwork:
      'https://i.scdn.co/image/ab67616d0000b2735d46b069ef33382b235b296a',
    duration: 447000,
    spotifyId: '6nGNzqlHTKugpRWkXrZkPC',
  },
  {
    trackName: 'Tjuele',
    trackArtist: 'Mpho Sebina, ATI',
    trackArtwork:
      'https://i.scdn.co/image/ab67616d0000b273a86becf357fef1728bc9b0ac',
    duration: 348003,
    spotifyId: '5QE1DG0y5vjza1kzpxVbIm',
  },
  {
    trackName: 'Alakori - Remix',
    trackArtist: 'Anendlessocean, Waje',
    trackArtwork:
      'https://i.scdn.co/image/ab67616d0000b273a86becf357fef1728bc9b0ac',
    duration: 199355,
    spotifyId: '30bX3Yk4FnVZxYmYCThfJ3',
  },
  {
    trackName: 'amelia',
    trackArtist: 'Seb Wildblood, mauv',
    trackArtwork:
      'https://i.scdn.co/image/ab67616d0000b273cc39857dda0b058032b510d2',
    duration: 261746,
    spotifyId: '1ME0C8xm5YmInbok1znS9W',
  },
  {
    trackName: 'Greed',
    trackArtist: 'Jiwoo',
    trackArtwork:
      'https://i.scdn.co/image/ab67616d0000b273b8be899ee23d492d1085e3ad',
    duration: 188308,
    spotifyId: '3dts8wSaJpanb0qvODgt9S',
  },
  {
    trackName: 'Me You I',
    trackArtist: 'The Cavemen.',
    trackArtwork:
      'https://i.scdn.co/image/ab67616d0000b273a05af10a651535ba44f93ac8',
    duration: 181301,
    spotifyId: '5uF2DrtK0aVTrth8hzCH7t',
  },
  {
    trackName: 'Count Me Out',
    trackArtist: 'Kendrick Lamar',
    trackArtwork:
      'https://i.scdn.co/image/ab67616d0000b2732e02117d76426a08ac7c174f',
    duration: 283642,
    spotifyId: '6BU1RZexmvJcBjgagVVt3M',
  },
  {
    trackName: 'Midnight City',
    trackArtist: '"M83"',
    trackArtwork:
      'https://i.scdn.co/image/ab67616d0000b273b1f4fe22b4268b5bd7477a80',
    duration: 243229,
    spotifyId: '5tMY5DJvFr9f8UGTta6KEj',
  },
  {
    trackName: 'Nerve',
    trackArtist: 'Jordan Rakei',
    trackArtwork:
      'https://i.scdn.co/image/ab67616d0000b2736b0cb4549fb833b27fdb70c4',
    duration: 235269,
    spotifyId: '1ILjlFp11FmsyHMqwoUH3h',
  },
  {
    trackName: 'Keep Me Near',
    trackArtist: 'Rend Collective Experiment',
    trackArtwork:
      'https://i.scdn.co/image/ab67616d0000b2734bd53eb0a055dfded473bceb',
    duration: 323693,
    spotifyId: '4BN16zsJhmV65a2md8aBBl',
  },
];
