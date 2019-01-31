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
    private alertController: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  user: User = {
    username: '',
    password: '',
    email: '',
    re_password: '',
  };

  confirmPass = false;

  register = () => {
    if(this.mediaProvider.isRegistered)this.showAlert('Username is registered, please try again');
    else if (this.confirmPass) this.showAlert('Password doesn\'t match, please try again');
    else {
      this.mediaProvider.registerUser(this.user).
        subscribe((res: LogInResponse) => {
          console.log(res);
          this.mediaProvider.isLoggedIn = true;
          this.navCtrl.pop();
          this.navCtrl.parent.select(0);
          this.mediaProvider.logInUser(this.user).
            subscribe((res: LogInResponse) => {
              localStorage.setItem('token', res.token);
            });
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
  };

  checkConfirmPass = () => {
    (this.user.password === this.user.re_password) ? this.confirmPass = false : this.confirmPass = true;
    console.log(this.confirmPass);
  };
}
