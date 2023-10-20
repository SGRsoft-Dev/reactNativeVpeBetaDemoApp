package com.reactnativevpebetademoapp;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactActivityDelegate;

import android.content.Intent;
import android.content.res.Configuration;

import android.content.Intent;
import android.content.res.Configuration;
import android.os.Build;
import android.util.Log;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "reactNativeVpeBetaDemoApp";
  }

  /**
   * Returns the instance of the {@link ReactActivityDelegate}. Here we use a util class {@link
   * DefaultReactActivityDelegate} which allows you to easily enable Fabric and Concurrent React
   * (aka React 18) with two boolean flags.
   */
  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new DefaultReactActivityDelegate(
        this,
        getMainComponentName(),
        // If you opted-in for the New Architecture, we enable the Fabric Renderer.
        DefaultNewArchitectureEntryPoint.getFabricEnabled());
  }

   @Override
     public void onConfigurationChanged(Configuration newConfig) {
         super.onConfigurationChanged(newConfig);
         Intent intent = new Intent("onConfigurationChanged");
         intent.putExtra("newConfig", newConfig);
         this.sendBroadcast(intent);
     }

    // PIP 종료 싱크
  @Override
  protected void onStop() {
    super.onStop();
    Intent intent = new Intent("onPictureInPictureModeExit");
    this.sendBroadcast(intent);
  }

    //Home of Recent 버튼 이벤트시 PIP 실행
  @Override
  protected void onUserLeaveHint() {
    super.onUserLeaveHint();
    Intent intent = new Intent("onUserLeaveHint");
    this.sendBroadcast(intent);
  }

    // PIP 모드가 변경되었을때 이벤트로 싱크
  @Override
  public void onPictureInPictureModeChanged(boolean isInPictureInPictureMode, Configuration newConfig) {
    super.onPictureInPictureModeChanged(isInPictureInPictureMode, newConfig);
    Intent intent = new Intent("onPictureInPictureModeChanged");
    intent.putExtra("isInPictureInPictureMode", isInPictureInPictureMode);
    this.sendBroadcast(intent);
    if(isInPictureInPictureMode) {
          Log.d("TAG", "onPictureInPictureModeChanged: "+isInPictureInPictureMode);
        }else{
         Log.d("TAG", "onPictureInPictureModeChanged: "+isInPictureInPictureMode);
          Intent intent2 = new Intent("onPictureInPictureModeStop");
          this.sendBroadcast(intent2);
       }
  }


}
