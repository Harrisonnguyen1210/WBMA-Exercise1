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
    private mediaProvider: MediaProvider, private alertController: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  user: User = {
    username: '',
    password: '',
    email: '',
  };

  register = () => {
    this.mediaProvider.checkIfUserExists(this.user).subscribe(res => {
      if (!res.available) {
        this.showAlert('Username already registered, try another username');
      } else {
        this.mediaProvider.registerUser(this.user).
          subscribe((res: LogInResponse) => {
            console.log(res);
            this.mediaProvider.isLoggedIn = true;
            this.navCtrl.pop();
            this.navCtrl.parent.select(0);
            this.mediaProvider.logInUser(this.user).subscribe((res: LogInResponse) => {
              localStorage.setItem('token', res.token);
            })
          }, error => {
            console.log(error);
          });
      }
    }, err => {
      this.showAlert('Wrong username or password, try again');
    });
  };

  showAlert = (notice: string) => {
    let alert = this.alertController.create({
      title: 'NOTICE',
      subTitle: notice,
      buttons: ['OK'],
    });
    alert.present();
  };
}
