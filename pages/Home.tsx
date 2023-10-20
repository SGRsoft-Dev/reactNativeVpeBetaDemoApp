/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {
  SafeAreaView,
  Pressable,
  StatusBar,
  Text,
  View,
} from 'react-native';

export default function Home(props): JSX.Element {

  return (
    <View className=" h-full w-full bg-white dark:bg-neutral-900 relative">
      <View >
        <StatusBar barStyle={'light-content'} />
        <SafeAreaView className="flex flex-col items-center justify-center h-screen gap-10 px-1">

          <View className="bg-zinc-200 dark:bg-zinc-800 rounded-md p-3">
            <Text className="dark:text-white">⚠️ 데모용 AccessKey는 2023.12.01 까지만 유효합니다.</Text>
          </View>

         <View>
           <Pressable onPress={()=>{props.navigation.navigate('Video1');}} className="p-3 bg-zinc-950 dark:bg-zinc-700 rounded-md ">
             <Text className="text-white ">Method , Event 예제</Text>
           </Pressable>
         </View>


          <View>
            <Pressable onPress={()=>{props.navigation.navigate('Video2');}} className="p-3 bg-zinc-950 dark:bg-zinc-700 rounded-md ">
              <Text className="text-white ">Custom Ui / LL-HLS 예제</Text>
            </Pressable>
          </View>
        </SafeAreaView>

      </View>


    </View>
  );
}


