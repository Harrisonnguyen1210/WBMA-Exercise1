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

  ionViewCanEnter() {
    this.getAllFiles();
  }

  getAllFiles = () => {
    this.mediaProvider.getAllMedia().
    subscribe((res: Pic[]) => {
      this.picArray = res;
      this.picArray.map(item => {
        this.mediaProvider.getSingleMedia(item.file_id).subscribe((singleFile: Pic) => {

          console.log(singleFile);
          item.thumbnails = singleFile.thumbnails;
        })
      });
      console.log('lololo');

      console.log(this.picArray);
    });
  };

  openPic = (imageSource) => {
    this.photoViewer.show(imageSource);
  };
}
