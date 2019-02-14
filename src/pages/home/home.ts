import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Pic } from '../../interface/pic';
import { MediaProvider } from '../../providers/media/media';
import { Observable } from 'rxjs';
import { UploadPage } from '../upload/upload';
import { PlayerPage } from '../player/player';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  // add this to HomePage component
  constructor(
    public navCtrl: NavController, private mediaProvider: MediaProvider) {
  }

  picArray: Observable<Pic[]>;

  ionViewDidEnter() {
    this.getAllFiles();
    if (localStorage.getItem('token')) {
      this.mediaProvider.isLoggedIn = true;
      this.navCtrl.parent.select(0);
      console.log('has token');
    }
  }

  getAllFiles = () => {
    this.picArray = this.mediaProvider.getAllMedia();
  };

  upload = () => {
    this.navCtrl.push(UploadPage).catch();
  };

  viewMedia = (item) => {
    console.log(item);
    this.navCtrl.push(PlayerPage, {
      item: item
    }).catch();
  };
}
