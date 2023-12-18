import {tracks} from './tracks';
import {CommentProps, StoryProps} from './types';
import {users} from './users';

export const posts: (CommentProps | StoryProps)[] = [
  {
    id: 'abc',
    type: 'comment',
    track: tracks[0],
    timeIn: 152000,
    timeOut: 183000,
    text: "i genuinely can't find words to describe how this part makes me feel. it's as if the whole world goes on pause and you can be stil for a moment, man",
    user: users[1],
    replies: 4,
    upvotes: 2,
    saves: 5,
  },
  {
    id: 'def',
    type: 'comment',
    track: tracks[1],
    timeIn: 13000,
    timeOut: 32000,
    text: 'NEW MEMBER 👁️👄👁️',
    user: users[7],
    replies: 0,
    upvotes: 1,
    saves: 0,
  },
  {
    id: 'pqr',
    type: 'story',
    cover: 'https://i.ibb.co/rtyz3QT/Vauxhall.jpg',
    title: 'If you bottled up life\nand poured it\ninto a song',
    subtitle: 'It would sound like this',
    tracks: [tracks[5], tracks[2], tracks[4]],
    user: users[3],
    replies: 34,
    upvotes: 183,
    saves: 28,
    intro: `Some songs are not just songs. They go a step further and add colour to our lives. They shape us and stay with us. Here, I've attempted to collect some songs that seem to have given me life over the year. Thank you for coming with me on this journey.`,
    chapters: [
      {
        id: 'one',
        title: 'Hurry, the City is Calling',
        text: `# Hurry, the city is calling\nMidnight City was what it sounded like when the very first inclinations of ambition emerged in my conscience.\n\nThe swirly pads, the washed out vocals and that unmistakable, hypnotizing lead that pierces through the business of it all; and then the saxophone solo. It's the sound of hope, chaos and bliss at once- the proof that they can coexist.\n\n >The city is my church cite:M83, Midnight City\n\nThese words would echo in my heart as a teen, because in a way, the city *was* my church.\n\nThe flashing lights, the people, the thought of one day scraping the sky with my achievements- the rush of it all. They bubbled up inside me and for a season, I was enchanted, haunted even, by the soundscape of this midnight city.`,
        track: tracks[11],
        timeIn: 50000,
        timeOut: 110000,
      },
      {
        id: 'two',
        title: 'Finding Ways',
        text: `# Finding Ways\nI had just discovered a burgeoning patch of the UK music industry. Underground and down to earth, it was neo-soulful, jazzy, and understated.\n\nThe wind brought whispers of Tom Mish, Alfa Mist and others to my ears, and my favourite was Jordan Rakei.\n\nThrowing myself into this mix of artists felt like averting my gaze from the shimmering London skyline to which Midnight City had seduced me by, and venturing out into the suburbs. It felt real in an everyday life way. Evenings were spent finding my way around my old guitar in the warm glow of my room as dusk filled the outdoors.\n\nNerve took me by surprise. You could say it struck a... nerve (sorry).\n\nWhy? Because it tugged at a major thread of my life I didn't yet know existed- love. How to love others well, and particularly what it meant to love oneself, in light of God.\n\nI wouldn't receive my answers until years later, but at the time, I was content to simply sit with the question he posed.\n\n>How can I find a reason to love you, when I don't love myself?`,
        track: tracks[12],
        timeIn: 60000,
        timeOut: 98000,
      },
      {
        id: 'three',
        title: 'Keep Me Near',
        text: `# Keep Me Near\nI'd first heard of them at a summer camp I attended. Rend Collective Experiment - a Christian Mumford & Sons, someone had called them.\n\nAt camp, I came to understand God in a new way. Not as a wicked taskmaster or problem to solve, but rather as the answer to *all* of my problems.\n\nPerhaps I didn't understand it fully yet, but I had stepped into a territory I'd never before ventured in my relationship with God. And whenever I departed, with the music of this unknown band, it seemed I could be right back there in a flash.\n\n**'Homemade worship by handmade people'** was the name of the album I had begun to rummage through after coming back home.\n\nIt was raw, intimate and most of all, desperate. Many tracks on that album moved me, but none more so than this one. It seemed to express what I felt perfectly. A longing to be near Jesus, and the acute understanding of how easy it is to lose Him in the to and fro of life.\n\nIt starts with pads and a choir, and then a simple, down to earth guitar riff. And then the muted guitars. They feel restless, and remind me of the nervous shuffling of feet that might come before making big request. And then the request comes:\n\n>Jesus, keep me near to your heart; for outside of you I'm lost cite:The Rend Collective Experiment, Keep Me Near\n\nThese words were the cry of my heart.\n\nLater on in life, after embarking on a crusade of rebllion against God, I'd experience exactly what they really meant, firsthand. And then, I'd return to sing it infront of my church family.\n\nNervous, shaky, barely manging to pluck the strings of my old guitar. Before that though, there were more things I'd have to experience.`,
        track: tracks[13],
      },
    ],
  },
  {
    id: 'ghi',
    type: 'comment',
    track: tracks[9],
    timeIn: 113000,
    timeOut: 158000,
    text: 'First heard this driving back from a friends house one late evening. The way the sun was setting and how the day had gone... it reminded me of everything good',
    user: users[5],
    replies: 8,
    upvotes: 17,
    saves: 10,
  },
  {
    id: 'jkl',
    type: 'comment',
    track: tracks[7],
    timeIn: 0,
    timeOut: 17000,
    text: 'is this the most iconic start to a song ever???',
    user: users[4],
    replies: 1,
    upvotes: 2,
    saves: 0,
  },
  {
    id: 'mno',
    type: 'comment',
    track: tracks[6],
    timeIn: 133000,
    timeOut: 150000,
    text: 'the way the background vocals come in here is so nice, wish they lasted longer',
    user: users[0],
    replies: 3,
    upvotes: 5,
    saves: 1,
  },
  {
    id: 'stu',
    type: 'comment',
    track: tracks[3],
    timeIn: 108000,
    timeOut: 140000,
    text: 'i love this line because truly faith is the opposite of fear',
    user: users[3],
    replies: 0,
    upvotes: 1,
    saves: 5,
  },
  {
    id: 'xyz',
    type: 'comment',
    track: tracks[4],
    timeIn: 310000,
    timeOut: 350000,
    text: 'this takes us somewhere',
    user: users[6],
    replies: 0,
    upvotes: 1,
    saves: 5,
  },
  {
    id: 'vwx',
    type: 'comment',
    track: tracks[10],
    timeIn: 23000,
    timeOut: 153000,
    text: `a few good lines: what's fair when the words and the heart don't reach. this time around i trust myself. all else fails i was myself. if i didn't learn to love myself, forgive myself, a hundred times.`,
    user: users[2],
    replies: 29,
    upvotes: 9,
    saves: 8,
  },
];
