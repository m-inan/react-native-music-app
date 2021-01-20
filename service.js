import {
  addEventListener,
  play,
  pause,
  destroy,
  skipToNext,
  skipToPrevious,
  seekTo,
} from 'react-native-track-player';

module.exports = async function () {
  addEventListener('remote-play', () => play());

  addEventListener('remote-pause', () => pause());

  addEventListener('remote-stop', () => destroy());

  addEventListener('remote-next', () => skipToNext());

  addEventListener('remote-previous', () => skipToPrevious());

  addEventListener('remote-seek', (position) => seekTo(position));
};
