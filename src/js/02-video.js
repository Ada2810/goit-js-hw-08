import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.getElementById('vimeo-player');
const player = new Player(iframe);

const LOCAL_STORAGE_KEY = 'videoplayer-current-time';

const saveCurrentTime = throttle((data) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, data.seconds);
}, 1000);

player.on('timeupdate', saveCurrentTime);

const savedTime = localStorage.getItem(LOCAL_STORAGE_KEY);
if (savedTime) {
  player.setCurrentTime(parseFloat(savedTime)).catch((error) => {
    console.error('Error setting time:', error);
  });
}

