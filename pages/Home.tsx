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
  View, useColorScheme, StyleSheet
} from "react-native";

export default function Home(props): JSX.Element {

  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View
      style={{
        backgroundColor:isDarkMode ? '#1f1f1f' : '#ffffff',
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        height:'100%'
      }}
    >
      <View >
        <StatusBar barStyle={'light-content'} />
        <SafeAreaView style={{
          display:'flex',
          flexDirection:'column',
          alignItems:'center',
          justifyContent:'center',
          gap:30
        }}>

          <View style={{
            backgroundColor:isDarkMode ? '#1f1f1f' : '#eeeeee',
            borderRadius:10,
            padding:10,

          }}>
            <Text style={{
              color:isDarkMode ? '#ffffff' : '#000000',
            }}>⚠️ 데모용 AccessKey는 2023.12.01 까지만 유효합니다.</Text>
          </View>

         <View>
           <Pressable onPress={()=>{props.navigation.navigate('Video1');}} style={isDarkMode ? styles.btnDark : styles.btnLight}>
             <Text style={styles.textWhite}>Method , Event 예제</Text>
           </Pressable>
         </View>


          <View>
            <Pressable onPress={()=>{props.navigation.navigate('Video2');}} style={isDarkMode ? styles.btnDark : styles.btnLight}>
              <Text style={styles.textWhite}>Custom Ui / LL-HLS 예제</Text>
            </Pressable>
          </View>
        </SafeAreaView>

      </View>


    </View>
  );
}



const styles = StyleSheet.create({
  textWhite:{
    color:'#ffffff',
  },
  btnDark: {
    backgroundColor:'#4b4b4b',
    paddingHorizontal:15,
    paddingVertical:10,
    borderRadius:5,
  },
  btnLight:{
    backgroundColor:'#000000',
    paddingHorizontal:15,
    paddingVertical:10,
    borderRadius:5,
  }

});


