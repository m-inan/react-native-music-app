import { IPlaylist, ITrack } from 'src/interfaces';

export const playlists: IPlaylist[] = [];

export const items: ITrack[] = [];

for (let i = 0; i < 10; i++) {
  items.push({
    id: i,
    title: `item ${i}`,
    artist: `artist ${i}`,
    source: 'test source',
    artwork: 'test artwork',
  });
}

for (let i = 0; i < 3; i++) {
  playlists.push({
    id: i,
    title: `item ${i}`,
    items: items.map((item: ITrack) => item.id),
  });
}
