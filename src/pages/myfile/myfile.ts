import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MediaProvider } from '../../providers/media/media';
import { Observable } from 'rxjs';
import { Pic } from '../../interface/pic';
import { PlayerPage } from '../player/player';
import { ModifyPage } from '../modify/modify';

@Component({
  selector: 'page-myfile',
  templateUrl: 'myfile.html',
})
export class MyFilePage {

  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    public mediaProvider: MediaProvider) {
  }

  fileArray: Observable<Pic[]>;

  ionViewDidEnter() {
    this.getAllFiles();
  }

  getAllFiles = () => {
    this.fileArray = this.mediaProvider.getUserFiles();
  };

  viewMedia = (item) => {
    console.log(item);
    this.navCtrl.push(PlayerPage, {
      item: item,
    }).catch();
  };

  modifyMedia = (item) => {
    this.navCtrl.push(ModifyPage, {'item': item}).catch();
  };

  deleteMedia = (file_id) => {
    this.mediaProvider.deleteMedia(file_id).subscribe(() => {
      this.getAllFiles();
    });
  };
}
