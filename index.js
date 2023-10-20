/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import TrackPlayer from 'react-native-track-player';

export const onRegisterPlayback = async () =>{
  try {
    TrackPlayer.addEventListener('remote-play', () => {
      TrackPlayer.play()
    })

    TrackPlayer.addEventListener('remote-pause', () => {
      TrackPlayer.pause()
    });
  } catch (error) {
    console.log(error)
  }
};
AppRegistry.registerComponent(appName, () => App);
TrackPlayer.registerPlaybackService(() =>onRegisterPlayback);
