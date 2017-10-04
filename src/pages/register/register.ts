import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {User} from "../../modals/user";

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  user = {} as User;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  async register(user: User) {
    // try {
    //   const result = await this.myAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
    //   console.log(result);
    // }
    // catch (e) {
    //   console.error(e);
    // }
  }
}
