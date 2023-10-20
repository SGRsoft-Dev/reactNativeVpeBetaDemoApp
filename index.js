/**
 * @format
 */

import { AppRegistry, Platform } from "react-native";
import App from './App';
import {name as appName} from './app.json';
import TrackPlayer, {
  Capability,
  RepeatMode,
  Event,
  Track,
  AppKilledPlaybackBehavior,
} from "react-native-track-player";



const TrackPlayerInitializer = async () => {
  let isSetup = false;
  try{

    await TrackPlayer.setupPlayer();
    await TrackPlayer.updateOptions({
      android:{
        appKilledPlaybackBehavior:AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification
      },
      stopWithApp: true,
      capabilities: [Capability.Play, Capability.Pause],
      compactCapabilities: [Capability.Play, Capability.Pause],
      notificationCapabilities: [Capability.Play, Capability.Pause],
      progressUpdateEventInterval:1
    });

    isSetup = true;

  } finally {
    return isSetup;
  }

};



export const onRegisterPlayback = async () =>{
  try {
    TrackPlayer.addEventListener(Event.RemotePlay, () => {
      TrackPlayer.play()
    })

    TrackPlayer.addEventListener(Event.RemotePause, () => {
      TrackPlayer.pause()
    });

    TrackPlayer.addEventListener(Event.RemoteStop, () => {
      TrackPlayer.stop();
    });
  } catch (error) {
    console.log(error)
  }
};


AppRegistry.registerComponent(appName, () => App);

TrackPlayerInitializer();
TrackPlayer.registerPlaybackService(() => onRegisterPlayback);
