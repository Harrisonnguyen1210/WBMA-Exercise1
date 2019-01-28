import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MediaProvider } from '../../providers/media/media';
import { LogInResponse, User } from '../../interface/pic';
import { RegisterPage } from '../register/register';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-login-register',
  templateUrl: 'login-register.html',
})
export class LoginRegisterPage {

  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    private mediaProvider: MediaProvider,
    private alertController: AlertController) {
  }

  user: User = {
    username: '',
    password: '',
  };

  login = () => {
    this.mediaProvider.logInUser(this.user).subscribe((res: LogInResponse) => {
      this.mediaProvider.isLoggedIn = true;
      console.log(res);
      localStorage.setItem('token', res.token);
      localStorage.setItem('username', res.user.email);
      localStorage.setItem('email', res.user.username);
      localStorage.setItem('user_id', String(res.user.user_id));
      console.log(localStorage.getItem('user_id'));
      this.navCtrl.parent.select(0);
    }, error => {
      this.showAlert();
    });
  };

  goToRegister = () => {
    this.navCtrl.push(RegisterPage);
  };

  showAlert = () => {
    let alert = this.alertController.create({
      title: 'NOTICE',
      subTitle: 'Wrong username or password, try again',
      buttons: ['OK'],
    });
    alert.present();
  };
}
