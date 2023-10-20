/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import Ncplayer from 'react-native-vpe-beta';
import Header from "../components/header";
import { PulseIndicator } from "react-native-indicators";
import {Warning} from 'phosphor-react-native';
import { Text, ScrollView, View, Pressable, StyleSheet, useColorScheme } from "react-native";

export default function Video1(props): JSX.Element {
  const [errorMessage, setErrorMessage] = React.useState('');

  const isDarkMode = useColorScheme() === 'dark';
  const player = React.useRef();

  const fullscreenOff = () => {

    //player.current.setOrientation('portrait'); //화면 회전
    player.current.fullscreenOff(); //전체화면 해제
    console.log('fullscreenOff');
  }

  const fullscreenOn = () => {

    //player.current.setOrientation('landscape'); //화면 회전
    player.current.fullscreenOn(); //전체화면 설정
    console.log('fullscreenOn');
  }

  return (
    <View style={{ backgroundColor:isDarkMode ? '#1f1f1f' : '#ffffff', height:'100%'}}>


      <Header title={'Custom Ui / LL-HLS 예제'}  {...props}/>

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
              file: 'https://stream.mux.com/v69RSHhFelSm4701snP22dYz2jICy4E4FUyk02rW4gxRM.m3u8',
              poster:'https://nnbkegvqsbcu5297614.cdn.ntruss.com/profile/202310/78ae0050df567879b4c24854fae29996.png',
              description: {
                title: 'Custom Ui - LL-HLS',
                profile_name: 'SGRSOFT',
                profile_image: 'https://nnbkegvqsbcu5297614.cdn.ntruss.com/profile/202208/d127c8db642716d84b3201f1d152e52a.png',
              },
            },

          ],
          autostart: true,
          controlBtn:{
            play:false,
            times:true,
            fullscreen:true,
            setting:false,
            volume:true,
          },
          touchGestures:true,
          lowLatencyMode: true,
          backgroundPlayback: true,
          autoPictureInPicture: true,
        }}

        waitingComponent = {
          <View style={{
            position:'absolute',
            backgroundColor:'rgba(0,0,0,0.5)',
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            width:'100%',
            height:'100%',
          }}>
            <Text>
              <PulseIndicator color={'#fff'} size={60}/>
            </Text>
          </View>
        }


        //override 하면 기존 기능이 실행되고 추가로 실행됨
        override={{
          fullscreen:{
            on:fullscreenOn,
            off:fullscreenOff
          }
        }}


        onError={(e)=>{
          console.log('error event result : ',e);
          setErrorMessage(e.errorMessage);
        }}

        onFullscreen={(e)=>{
          console.log('fullscreen :', e);
        }}

        onPictureInPicture={(e)=>{
          console.log('pictureInPicture :', e);
        }}

        errorComponent = {
          <View style={{ display:'flex', alignItems:'center'}}>
            <Warning size={28} color="#d77248" weight="fill" style={{marginBottom:10}}/>
            <Text style={{color:'#fff'}}>{errorMessage}</Text>
          </View>
        }


      />


      <ScrollView style={{ padding:10}}>
        <Text style={{ color:isDarkMode ? '#ffffff' : '#000000', fontSize:20, fontWeight:'bold',marginBottom:20  }}>
          Custom Ui / Method / LL-HLS
        </Text>


        <View style={{
          backgroundColor:isDarkMode ? '#1f1f1f' : '#ececec',
          borderRadius:10,
          padding:10,
          marginBottom:20,
        }}>
          <Text style={{ color:isDarkMode ? '#ffffff' : '#000000' }}>⚠️ 공지사항</Text>
          <Text style={{ color:isDarkMode ? '#ffffff' : '#000000' }}>예제에 포함된 LL-HLS 재생소스는 해외 송출 주소입니다. </Text>
          <Text style={{ color:isDarkMode ? '#ffffff' : '#000000' }}>딜레이 및 버퍼링이  발생 할 수 있습니다.</Text>
          <Text style={{ color:isDarkMode ? '#ffffff' : '#000000' }}>Live Station을 세팅해서 테스트하시길 권장합니다.</Text>
        </View>



        <View style={{marginBottom:20}}>
          <Text style={ isDarkMode  ? styles.titleTextDark : styles.titleTextLight}>VPE SaaS options</Text>
          <View style={  isDarkMode ? styles.bgDark : styles.bgLight }>
            <Text style={styles.textWhite}>1. VPE 유료 구독</Text>
            <Text style={styles.textWhite}>2. Seekbar 컬러 변경</Text>
          </View>
        </View>

        <View style={{marginBottom:20}}>
          <Text style={ isDarkMode  ? styles.titleTextDark : styles.titleTextLight}>Local options</Text>
          <View  style={  isDarkMode ? styles.bgDark : styles.bgLight  }>
            <Text style={styles.textWhite}>1. 플레이버튼 숨김</Text>
            <Text style={styles.textWhite}>2. 세팅 버튼 숨김</Text>
            <Text style={styles.textWhite}>3. waitingComponent 적용</Text>
            <Text style={styles.textWhite}>4. errorComponent 적용</Text>
            <Text style={styles.textWhite}>5. lowLatencyMode 적용</Text>
            <Text style={styles.textWhite}>6. backgroundPlayback 적용</Text>
            <Text style={styles.textWhite}>7. autoPictureInPicture 적용</Text>
          </View>
        </View>

        <View style={{marginBottom:40}}>
          <Text style={ isDarkMode  ? styles.titleTextDark : styles.titleTextLight}>Event </Text>
          <View style={  isDarkMode ? styles.bgDark : styles.bgLight  }>
            <Text style={styles.textWhite}>1. onError</Text>
            <Text style={styles.textWhite}>2. onFullscreen</Text>
            <Text style={styles.textWhite}>3. onPictureInPicture</Text>
          </View>
        </View>

      </ScrollView>
    </View>
  );
}



const styles = StyleSheet.create({
  bgDark:{
    backgroundColor:'#5d5d5d',
    padding:20,
  },
  bgLight:{
    backgroundColor:'#000000',
    padding:20,
  },

  textWhite:{
    color:'#ffffff',
  },
  titleTextLight:{
    fontSize:20,
    fontWeight:'bold',
    marginBottom:10,
  },
  titleTextDark:{
    color:'#ffffff',
    fontSize:20,
    fontWeight:'bold',
    marginBottom:10,
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
