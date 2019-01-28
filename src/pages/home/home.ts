import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { Pic } from '../../interface/pic';
import { MediaProvider } from '../../providers/media/media';
import { Observable } from 'rxjs';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  // add this to HomePage component
  constructor(
    public navCtrl: NavController, private photoViewer: PhotoViewer,
    private mediaProvider: MediaProvider) {
  }

  picArray: Observable<Pic[]>;
  url = 'https://media.mw.metropolia.fi/wbma/uploads/';

  ngOnInit() {
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

  openPic = (imageSource) => {
    this.photoViewer.show(imageSource);
  };
}
