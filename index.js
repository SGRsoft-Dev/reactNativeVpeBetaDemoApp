/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import TrackPlayer, { Capability } from "react-native-track-player";



const TrackPlayerInitializer = async () => {

  try{

    await TrackPlayer.setupPlayer();
    await TrackPlayer.updateOptions({
      stopWithApp: true,
      capabilities: [Capability.Play, Capability.Pause],
      compactCapabilities: [Capability.Play, Capability.Pause],
      notificationCapabilities: [Capability.Play, Capability.Pause],
    });

  }catch (e) {

  }

};

TrackPlayerInitializer();

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
