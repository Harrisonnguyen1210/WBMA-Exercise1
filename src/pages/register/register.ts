import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MediaProvider } from '../../providers/media/media';
import { LogInResponse, User } from '../../interface/pic';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    private mediaProvider: MediaProvider,
    private alertController: AlertController, ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }


  user: User = {
    username: '',
    password: '',
    email: ''
  };

  re_password = '';
  validUsername = false;
  validEmail = false;
  validPass = false;
  confirmPass = false;

  register = () => {
    if(this.mediaProvider.isRegistered)this.showAlert('Username is registered, please try again');
    else if (this.validUsername) this.showAlert('Email not valid, try again');
    else if (this.validPass) this.showAlert('Password must have at least 5 characters, one letter and one number');
    else if (this.validEmail) this.showAlert('Email not valid, try again');
    else if (this.confirmPass) this.showAlert('Password doesn\'t match, please try again');

    else {
      this.mediaProvider.registerUser(this.user).
        subscribe((res: LogInResponse) => {
          console.log(res);
          this.mediaProvider.logInUser(this.user).
            subscribe((res: LogInResponse) => {
              localStorage.setItem('token', res.token);
              localStorage.setItem('username', res.user.email);
              localStorage.setItem('email', res.user.username);
              localStorage.setItem('user_id', String(res.user.user_id));
            });
          this.mediaProvider.isLoggedIn = true;
          this.navCtrl.pop();
          this.navCtrl.parent.select(0);
        }, error => {
          console.log(error);
        });
    }
  };

  showAlert = (notice: string) => {
    let alert = this.alertController.create({
      title: 'NOTICE',
      subTitle: notice,
      buttons: ['OK'],
    });
    alert.present();
  };

  checkUsername = () => {
    this.mediaProvider.checkIfUserExists(this.user).subscribe(res => {
      (!res.available) ? this.mediaProvider.isRegistered = true : this.mediaProvider.isRegistered = false
    });
    (this.user.username.length < 5) ? this.validUsername = true : this.validUsername = false;
  };

  checkEmail = () => {
    const rule = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    (this.user.email.length < 5 || !rule.test(this.user.email)) ? this.validEmail = true : this.validEmail = false;
  };

  checkPassword = () => {
    const rule = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/;
    (!rule.test(this.user.password)) ? this.validPass = true : this.validPass = false;
  };

  checkConfirmPass = () => {
    (this.user.password === this.re_password) ? this.confirmPass = false : this.confirmPass = true;
  };

}
