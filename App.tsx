/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TrackPlayer, { AppKilledPlaybackBehavior, Capability } from "react-native-track-player";


import Home from './pages/Home';
import Video1 from './pages/Video1';
import Video2 from './pages/Video2';


const Stack = createNativeStackNavigator();


function App() {

  return (
    <NavigationContainer
      gestureEnabled={true}
      tabBarHideOnKeyboard={true}
    >
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home}   options={{headerShown: false}}/>
        <Stack.Screen name="Video1" component={Video1}   options={{headerShown: false}}/>
        <Stack.Screen name="Video2" component={Video2}   options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
