# Video Player Enhancement for React Native

<img src="https://nnbkegvqsbcu5297614.cdn.ntruss.com/profile/202310/dccaec3fb50fbc15c7bdd0084ee3b7af.png" width="400"/>

### ⚠️ NAVER CLOUD PLATFORM 에서 제공중인 Video Player Enhancement Standard 라이선스가 필요합니다.
***

### 소개
- NAVER CLOUD PLATFORM 에서 제공중인 Video Player Enhancement 를 React Native 에서 사용할 수 있도록 만든 라이브러리 입니다.
- 해당 라이브러리는 [react-native-video](https://www.npmjs.com/package/react-native-video) 를 기반으로 제작되었습니다.
- VPE 에서 제공하는 기능은 [VPE API](https://guide.ncloud-docs.com/docs/ko/vpe-overview) 를 참고해주세요.



### 설치 (Yarn)
```javascript
 $ yarn add react-native-vpe-beta
```
### 필수 종속성 설치 필요
```javascript
 $ yarn add react-native-orientation-locker react-native-svg react-native-track-player@4.0.0-rc09 @react-native-community/netinfo react-native-safe-area-context react-native-webview react-native-localize  
```
### Pod Install (iOS)
```javascript
 $ npx pod-install ios
```
***

## TrackPlayer Service 등록

### index.js
```diff

  import {AppRegistry} from 'react-native';
  import App from './App';
  import {name as appName} from './app.json';
+ import TrackPlayer, { Capability } from "react-native-track-player";


+ const TrackPlayerInitializer = async () => {
+   try{
+     await TrackPlayer.setupPlayer();
+     await TrackPlayer.updateOptions({
+       stopWithApp: true,
+       capabilities: [Capability.Play, Capability.Pause],
+       compactCapabilities: [Capability.Play, Capability.Pause],
+       notificationCapabilities: [Capability.Play, Capability.Pause],
+     });
+   }catch (e) {

+   }
+ };

+ TrackPlayerInitializer();


+  export const onRegisterPlayback = async () =>{
+    try {
+      TrackPlayer.addEventListener('remote-play', () => {
+         TrackPlayer.play()
+      })

+      TrackPlayer.addEventListener('remote-pause', () => {
+          TrackPlayer.pause()
+      });
+    } catch (error) {
+      console.log(error)
+    }
+  };


  AppRegistry.registerComponent(appName, () => App);
+ TrackPlayer.registerPlaybackService(() =>onRegisterPlayback);

```

## Swift 모듈 추가 (iOS)

- iOS 모듈은 Swift를 사용하기 때문에 사용자가 표준 반응 네이티브 애플리케이션을 사용하는 경우 프로젝트에 Swift에 대한 지원을 추가해야 합니다.
- Xcode 프로젝트에 Swift 파일을 추가하면 쉽게 할 수 있습니다.
- dummy.swift브리징 헤더를 생성할지 묻는 메시지가 표시되면 호출하고 '예'라고 말할 수 있습니다.

<img src="https://nnbkegvqsbcu5297614.cdn.ntruss.com/profile/202310/c89f3d0fa30eddaab480764496e31139.png" width='80%'>

***

# Fullscreen 자동회전을 위한 iOS / Android 수정


## iOS

`AppDelegate.m` 파일에 다음 코드를 추가합니다.

```diff
+#import "Orientation.h"

@implementation AppDelegate

// ...

+- (UIInterfaceOrientationMask)application:(UIApplication *)application supportedInterfaceOrientationsForWindow:(UIWindow *)window {
+  return [Orientation getOrientation];
+}

@end
```

## Android

### android/app/src/main/AndroidManifest.xml 파일에 다음 코드를 추가합니다.

```diff
      <activity
        ....
        
+       android:configChanges="keyboard|keyboardHidden|orientation|screenLayout|screenSize|smallestScreenSize|uiMode"
        android:windowSoftInputMode="adjustResize">

        ....

      </activity>

```

### android/app/src/main/java/com/{앱 패키지 명}/MainActivity.java

```diff
// ...

+import android.content.Intent;
+import android.content.res.Configuration;

public class MainActivity extends ReactActivity {

+   @Override
+   public void onConfigurationChanged(Configuration newConfig) {
+       super.onConfigurationChanged(newConfig);
+       Intent intent = new Intent("onConfigurationChanged");
+       intent.putExtra("newConfig", newConfig);
+       this.sendBroadcast(intent);
+   }

    // ......
}
```

### android/app/src/main/java/com/{앱 패키지 명}/MainApplication.java

```diff
+import org.wonday.orientation.OrientationActivityLifecycle;
  @Override
  public void onCreate() {
+    registerActivityLifecycleCallbacks(OrientationActivityLifecycle.getInstance());
  }
```

***




# Picture in Picture 구현을 위한 설정

## iOS

### Background Modes 설정
<img src="https://nnbkegvqsbcu5297614.cdn.ntruss.com/profile/202310/1c281f710515342175ab2ecdf6c432ae.png" width="80%">

## Android

### android/app/src/main/AndroidManifest.xml 파일에 다음 코드를 추가합니다.
```diff

      <activity
        ....
        
+        android:configChanges="orientation|keyboardHidden|keyboard|screenSize|locale|layoutDirection|fontScale|screenLayout|density|smallestScreenSize|orientation|uiMode"
+        android:resizeableActivity="true"
+        android:supportsPictureInPicture="true"
+        android:windowSoftInputMode="adjustResize"

        ....

      </activity>

```


### android/app/src/main/java/com/{앱 패키지 명}/MainActivity.java

```diff
import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactActivityDelegate;

// 추가
+ import android.content.Intent;
+ import android.content.res.Configuration;
+ import android.os.Build;
+ import android.util.Log;

```

### PIP 함수 추가

```diff
public class MainActivity extends ReactActivity {


  //MainActivity 안쪽 최하단에 아래 추가

  // PIP 종료 싱크
+  @Override
+  protected void onStop() {
+    super.onStop();
+    Intent intent = new Intent("onPictureInPictureModeExit");
+    this.sendBroadcast(intent);
+  }

  //Home of Recent 버튼 이벤트시 PIP 실행
+  @Override
+  protected void onUserLeaveHint() {
+    super.onUserLeaveHint();
+    Intent intent = new Intent("onUserLeaveHint");
+    this.sendBroadcast(intent);
+  }

  // PIP 모드가 변경되었을때 이벤트로 싱크
+  @Override
+  public void onPictureInPictureModeChanged(boolean isInPictureInPictureMode, Configuration newConfig) {
+    super.onPictureInPictureModeChanged(isInPictureInPictureMode, newConfig);
+    Intent intent = new Intent("onPictureInPictureModeChanged");
+    intent.putExtra("isInPictureInPictureMode", isInPictureInPictureMode);
+    this.sendBroadcast(intent);
+    if(isInPictureInPictureMode) {
+      Log.d("TAG", "onPictureInPictureModeChanged: "+isInPictureInPictureMode);
+    }else{
+      Log.d("TAG", "onPictureInPictureModeChanged: "+isInPictureInPictureMode);
+      Intent intent2 = new Intent("onPictureInPictureModeStop");
+      this.sendBroadcast(intent2);
+    }
+  }

}

```

***




### 사용법
```typescript jsx
import Ncplayer from 'react-native-vpe-beta';
import { Text, View, Pressable , SafeAreaView } from 'react-native';


export default function Player(props): JSX.Element {
  const player = React.useRef();
  const [errorMessage, setErrorMessage] = React.useState('');

  const fullscreenOff = () => {
    player.current.fullscreenOff(); //전체화면 해제
    console.log('fullscreenOff');
  }

  const fullscreenOn = () => {
    player.current.fullscreenOn(); //전체화면 설정
    console.log('fullscreenOn');
  }

  return (
    <View>
      <SafeAreaView />
      <Ncplayer
        ref={(ref) => {
          player.current = ref;
        }}

        accessKey={'VPE accessKey'}
        bundleId={'iOS bundleId'}
        packageId={'안드로이드 Packageid'}

        options={{
          playlist: [ //플레이리스트
            {
              file: "http://example.com/myVideo.mp4",
              poster: "http://example.com/myVideoThumb.png",
              description: {
                title: '영상제목',
                created_at: '업로드일자',
                profile_name: '업로더 닉네임',
                profile_image: 'http://example.com/ProfileThumb.png',
              },
            },
          ],

          autostart: true, //자동재생여부 
          controlBtn: { //버튼 커스텀
            play: true, //재생버튼
            times: true, //시간 표시 
            volume: true, //볼륨버튼
            fullscreen: true, //전체화면 버튼
            setting: true, //설정버튼
          },
          controlActiveTime: 3000, //컨트롤러 활성화 시간
          progressBarColor: '#ff0000', //프로그래스바 색상
          aspectRatio: '16/9', //화면비율
          objectFit: 'contain', //화면크기
          lowLatencyMode: true, //LL-HLS 사용시 true
          backgroundPlayback: true, //백그라운드 재생시 true
          autoPictureInPicture: true, //PIP 사용시 true
          rotateFullscreen: true, //전체화면 회전 사용시 true

        }}

        onReady={() => { //준비완료 이벤트
          console.log('ready ');
        }}

        onPlay={(e) => { //재생 이벤트
          console.log('play :', e);
        }}

        onPause={(e) => { //일시정지 이벤트
          console.log('pause :', e);
        }}

        onNextTrack={(e) => { //다음영상 이벤트
          console.log('nextTrack :', e);
        }}

        onPrevTrack={(e) => { //이전영상 이벤트
          console.log('prevTrack :', e);
        }}

        onEnd={(e) => { //재생완료 이벤트
          console.log('end :', e);
        }}

        onSeeking={(e) => { //구간 이동 이벤트
          console.log('seeking :', e);
        }}


        onFullscreen={(e) => { //전체화면 이벤트
          console.log('fullscreen :', e);
          setIsFullScreen(e.active);
        }}

        onControlActive={(e) => { //컨트롤러 활성화 이벤트
          console.log('controlActive :', e);
        }}

        onTimeUpdate={(e) => { //재생시간 업데이트 이벤트
          console.log('timeUpdate :', e);
        }}

        onError={(e) => { //에러 이벤트
          console.log('error event result : ', e);
          setErrorMessage(e.errorMessage);
        }}

        onWaiting={(e) => { //로딩 or 버퍼링 이벤트
          console.log('waiting :', e);
        }}

        onPictureInPicture={(e) => { //PIP 이벤트
          console.log('pictureInPicture :', e);
        }}


        errorComponent={ //에러 UI 오버라이드
          <View style={{
            display: 'flex',
            alignItems: 'center',
          }}>
            <Text style={{ color: '#fff' }}>에러가 발생했습니다.</Text>
            <Text style={{ color: '#fff' }}>{errorMessage}</Text>
          </View>
        }

        waitingComponent={ //로딩 UI 오버라이드
          <View style={{
            position: 'absolute',
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
          }}>
            <Text>
              로딩중...
            </Text>
          </View>
        }


        //기존 Method override 
        override={{
          fullscreen: { //전체화면 버튼 오버라이드
            on: fullscreenOn,
            off: fullscreenOff
          }
        }}

      />
      <View>

        <Text>
          Method
        </Text>

        <Pressable onPress={() => {
          player.current.play();
        }}>
          <Text>Play</Text>
        </Pressable>

        <Pressable onPress={() => {
          player.current.pause();
        }}>
          <Text>Pause</Text>
        </Pressable>

        <Pressable onPress={() => {
          player.current.prev();
        }}>
          <Text>Prev 영상</Text>
        </Pressable>

        <Pressable onPress={() => {
          player.current.next();
        }}>
          <Text>Next 영상</Text>
        </Pressable>

        <Pressable onPress={() => {
          player.current.controlBarActive();
        }}>
          <Text>컨트롤바 활성화</Text>
        </Pressable>

        <Pressable onPress={() => {
          player.current.controlBarDeactive();
        }}>
          <Text>컨트롤바 비활성화</Text>
        </Pressable>

        <Pressable onPress={() => {
          player.current.setOrientation('portrait');
        }}>
          <Text>화면 세로 회전</Text>
        </Pressable>

        <Pressable onPress={() => {
          player.current.setOrientation('landscape');
        }}>
          <Text>화면 가로 회전</Text>
        </Pressable>

      </View>

    </View>

  );
}

```




