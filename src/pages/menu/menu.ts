import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { LoginRegisterPage } from '../login-register/login-register';
import { ProfilePage } from '../profile/profile';
import { MediaProvider } from '../../providers/media/media';

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public mediaProvider: MediaProvider) {
  }
  tab1Root = HomePage;
  tab2Root = LoginRegisterPage;
  tab3Root = ProfilePage;

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

}
