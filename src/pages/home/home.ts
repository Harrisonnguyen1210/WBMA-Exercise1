import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { Pic } from '../../interface/pic';
import { MediaProvider } from '../../providers/media/media';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  // add this to HomePage component
  constructor(public navCtrl: NavController, private photoViewer: PhotoViewer, private mediaProvider: MediaProvider) {
  }

  picArray: Pic[] = [];
  url = 'http://media.mw.metropolia.fi/wbma/uploads/';

  ionViewDidLoad() {
    this.getAllFiles();
  }

  getAllFiles = () => {
    this.mediaProvider.getAllMedia().
    subscribe((res: Pic[]) => {
      this.picArray = res;
      this.picArray.map(item => {
        item.thumbnail = item.filename.substring(0,
          item.filename.length - 4) + '-tn160.png';
      });

      // Another way to do map
      // this.picArray = res.map(item => {
      //   item.thumbnail = item.filename.substring(0,item.filename.length - 4) + '-tn160.png';
      //   return item;
      // })
    });
  };

  openPic = (imageSource) => {
    this.photoViewer.show(imageSource);
  };
}
