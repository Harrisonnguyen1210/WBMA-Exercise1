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
      // Another way if you dont want to check the existence of item.thumbnails in home.html
      // res.forEach(item => {
      //   this.mediaProvider.getSingleMedia(item.file_id).subscribe((file: Pic) => {
      //     this.picArray.push(file);
      //   })
      // })

      this.picArray = res;
      this.picArray.map(item => {
        this.mediaProvider.getSingleMedia(item.file_id).subscribe((singleFile: Pic) => {
          item.thumbnails = singleFile.thumbnails;
        })
      });
    });
  };

  openPic = (imageSource) => {
    this.photoViewer.show(imageSource);
  };
}
