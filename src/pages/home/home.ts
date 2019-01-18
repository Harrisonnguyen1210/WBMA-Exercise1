import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { HttpClient } from '@angular/common/http';
import { Pic } from '../../interface/pic';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  // add this to HomePage component
  constructor(
    public navCtrl: NavController, private photoViewer: PhotoViewer,
    private http: HttpClient) {
  }

  picArray: Pic[] = [];
  myArray: Pic[] = [];
  url = 'http://media.mw.metropolia.fi/wbma/uploads/';

  ngOnInit() {
    this.fetchArray();
  }

  fetchArray = () => {
    this.http.get<Pic[]>('http://media.mw.metropolia.fi/wbma/media').
      subscribe((res: Pic[]) => {
        this.picArray = res;
        this.picArray.map(item => {
          item.thumbnail = item.filename.substring(0,
            item.filename.length - 4) + '-tn160.png';
        });

        //Another way to use map
        // this.myArray = res.map(item => (
        //   {
        //     file_id: item.file_id,
        //     filename: item.filename,
        //     filesize: item.filesize,
        //     user_id: item.user_id,
        //     media_type: item.media_type,
        //     mime_type: item.mime_type,
        //     time_added: item.time_added,
        //     title: item.title,
        //     description: item.description,
        //     thumbnail: item.filename.substring(0, item.filename.length - 4) +
        //       '-tn160.png',
        //   }
        // ));
      });
  };

  openPic = (imageSource) => {
    this.photoViewer.show(imageSource);
  };
}
