import {
  addEventListener,
  play,
  pause,
  destroy,
  skipToNext,
  skipToPrevious,
  seekTo,
  getPosition,
} from 'react-native-track-player';

module.exports = async function () {
  addEventListener('remote-play', () => play());

  addEventListener('remote-pause', () => pause());

  addEventListener('remote-stop', () => destroy());

  addEventListener('remote-next', () => skipToNext());

  addEventListener('remote-previous', async (param) => {
    const position = await getPosition();

    if (position > 3) {
      seekTo(0);
    } else {
      skipToPrevious();
    }
  });

  addEventListener('remote-seek', ({ position }) => seekTo(position));
};
