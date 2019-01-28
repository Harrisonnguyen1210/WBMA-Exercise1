import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MediaProvider } from '../../providers/media/media';
import { Pic, User } from '../../interface/pic';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    public mediaProvider: MediaProvider) {
  }

  ionViewDidLoad() {
    if (this.mediaProvider.isLoggedIn === true) {
      this.requestUserInfo();
    }
  }
  url = 'https://media.mw.metropolia.fi/wbma/uploads/';
  username: string;
  email: string;
  avatar;

  requestUserInfo = () => {
    this.username = localStorage.getItem('username');
    this.email = localStorage.getItem('email');
    this.mediaProvider.getUserAvatar().subscribe((res: Pic[]) => {
      res.forEach(avatar => {
        if(avatar.user_id.toString() === localStorage.getItem('user_id')){
          this.avatar = avatar;
          console.log(this.avatar);
        }
      })
      // this.avatar = res.filter((avatar) =>{
      //   if(avatar.user_id === parseInt(localStorage.getItem('user_id')))
      //     return avatar
      //   }
      // );
    })
  };

  logout = () => {
    this.mediaProvider.isLoggedIn = false;
    localStorage.removeItem('token');
    this.navCtrl.parent.select(1);
  };

}
