import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import firebase from 'firebase';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = 'HomePage';

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      firebase.initializeApp({
        apiKey: "AIzaSyDFfnZoHQVrxxoP59xjKCmrybwFNX-HxH8",
        authDomain: "ionicform-ac9e3.firebaseapp.com",
        databaseURL: "https://ionicform-ac9e3.firebaseio.com",
        projectId: "ionicform-ac9e3",
        storageBucket: "ionicform-ac9e3.appspot.com",
        messagingSenderId: "909457742599"
      });
    });
  }
}

