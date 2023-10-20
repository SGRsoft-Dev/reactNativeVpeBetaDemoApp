/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import Ncplayer from 'react-native-vpe-beta';
import Header from "../components/header";

import {
  Text,
  View,
  Pressable, StyleSheet, useColorScheme
} from "react-native";

export default function Video1(props): JSX.Element {

  const isDarkMode = useColorScheme() === 'dark';

  const player = React.useRef();

  return (
    <View style={{ backgroundColor:isDarkMode ? '#1f1f1f' : '#ffffff', height:'100%'}}>

      <Header title={'Method , Event 예제'}  {...props}/>

      <Ncplayer
        ref={(ref)=>{
          player.current = ref;
        }}

        accessKey={'fd1737d82b2e4b4fba216e3dc5522091'}
        bundleId={'org.reactjs.native.example.RNVpeTestapp'}
        packageId={'org.reactjs.native.example.RNVpeTestapp'}

        stage={'prod'}
        options={{
          playlist: [
            {
              file: 'https://fsxikvammvwv14470411.cdn.ntruss.com/hls/9N5-iJ4f9tdzE6D708PTmg__/vod/j5IXBfIJ83893893_,1080,720,480,p.mp4.smil/master.m3u8',
              poster: 'https://nnbkegvqsbcu5297614.cdn.ntruss.com/profile/202310/10a08ce6c6cf76302838183f98da0e2c.png',
              description: {
                title: '1번 영상',
                created_at: '2023.07.13',
                profile_name: '네이버클라우드',
                profile_image: 'https://nnbkegvqsbcu5297614.cdn.ntruss.com/profile/202208/d127c8db642716d84b3201f1d152e52a.png',
              },
            },
            {
              file: 'https://tlyuunkafrfc17777720.cdn.ntruss.com/hls/BtPMRYtWEpYPwdrqVVbuXZ6y5L~cFRoK9kmvRCplaSQ_/vod/e6d7Z8VbhkkWCOOR/media-plus-99/O3bUOG8uHw_,AVC_SD_1Pass_30fps_1,AVC_HD_1Pass_30fps,AVC_FHD_1Pass_30fps,.mp4.smil/master.m3u8',
              poster: 'https://vvbk6ieu540.edge.naverncp.com/vod/e6d7Z8VbhkkWCOOR/media-plus-99/O3bUOG8uHw_01.jpg',
              description: {
                title: '2번 영상',
                created_at: '2023.07.13',
                profile_name: '네이버클라우드',
                profile_image: 'https://nnbkegvqsbcu5297614.cdn.ntruss.com/profile/202208/d127c8db642716d84b3201f1d152e52a.png',
              },
            },

            {
              file: 'https://tlyuunkafrfc17777720.cdn.ntruss.com/hls/BtPMRYtWEpYPwdrqVVbuXZ6y5L~cFRoK9kmvRCplaSQ_/vod/e6d7Z8VbhkkWCOOR/media-plus-99/CjHgIYtutS_,AVC_SD_1Pass_30fps_1,AVC_HD_1Pass_30fps,AVC_FHD_1Pass_30fps,.mp4.smil/master.m3u8',
              poster: 'https://vvbk6ieu540.edge.naverncp.com/vod/e6d7Z8VbhkkWCOOR/media-plus-99/CjHgIYtutS_01.jpg',
              description: {
                title: '3번 영상',
                created_at: '2023.07.13',
                profile_name: '네이버클라우드',
                profile_image: 'https://nnbkegvqsbcu5297614.cdn.ntruss.com/profile/202208/d127c8db642716d84b3201f1d152e52a.png',
              },
            },

          ],
          autostart: true,
          touchGestures:true,
          lowLatencyMode: true,
          backgroundPlayback: true,
          autoPictureInPicture: true,
          rotateFullscreen: true,
        }}

        onReady={()=>{
          console.log('ready ');
        }}

        onSeeking={(e)=>{
          console.log('seeking :',e);
        }}

        onPlay={(e)=>{
          console.log('play :',e);
        }}

        onPause={(e)=>{
          console.log('pause :', e);
        }}

        onFullscreen={(e)=>{
          //console.log('fullscreen :', e);
        }}

        onControlActive={(e)=>{
          console.log('controlActive :', e);
        }}

        onEnd={(e)=>{
          console.log('end :', e);
        }}

        onTimeUpdate={(e)=>{
          //console.log('timeUpdate :', e);
        }}

        onError={(e)=>{
          console.log('error event result : ',e);
        }}

        onWaiting={(e)=>{
          console.log('waiting :', e);
        }}

        onNextTrack={(e)=>{
          console.log('nextTrack :', e);
        }}

        onPrevTrack={(e)=>{
          console.log('prevTrack :', e);
        }}


      />

      <View  style={{ padding:10 }}>
          <Text style={{
            color:isDarkMode ? '#ffffff' : '#000000',
            fontSize:20,
            fontWeight:'bold',
          }}>
            Method , Event 예제
          </Text>

          <View style={styles.section}>
            <Pressable onPress={() => player.current.play()} style={isDarkMode ? styles.btnDark : styles.btnLight}>
              <Text style={styles.textWhite}>Play</Text>
            </Pressable>

            <Pressable onPress={() => player.current.pause()} style={isDarkMode ? styles.btnDark : styles.btnLight}>
              <Text style={styles.textWhite}>Pause</Text>
            </Pressable>

          </View>

        <View style={styles.section}>
            <Pressable onPress={() => player.current.prev()} style={isDarkMode ? styles.btnDark : styles.btnLight}>
              <Text style={styles.textWhite}>Prev</Text>
            </Pressable>

            <Pressable onPress={() => player.current.next()} style={isDarkMode ? styles.btnDark : styles.btnLight}>
              <Text style={styles.textWhite}>Next</Text>
            </Pressable>

          </View>

        <View style={styles.section}>

            <Pressable onPress={() => player.current.controlBarActive()} style={isDarkMode ? styles.btnDark : styles.btnLight}>
              <Text style={styles.textWhite}>컨트롤바 활성화</Text>
            </Pressable>

            <Pressable onPress={() => player.current.controlBarDeactive()} style={isDarkMode ? styles.btnDark : styles.btnLight}>
              <Text style={styles.textWhite}>컨트롤바 비활성화</Text>
            </Pressable>
          </View>


        </View>


    </View>
  );
}


const styles = StyleSheet.create({
  section: {

    paddingTop: 30,
    display:'flex',
    flexDirection:'row',
    justifyContent:'start',
    gap:10,

  },
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
