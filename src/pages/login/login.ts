import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {User} from "../../modals/user";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  user = {} as User;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  async login(user: User) {
    // try {
    //   const result = await this.myAuth.auth.signInWithEmailAndPassword(user.email, user.password);
    //   if (result) {
    //     this.navCtrl.push('Home');
    //   }
    // }
    // catch (e) {
    //   console.error(e);
    // }
  }

  register() {
    this.navCtrl.push('RegisterPage');
  }
}
