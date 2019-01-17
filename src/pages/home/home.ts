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
  constructor(public navCtrl: NavController, private photoViewer: PhotoViewer, private http: HttpClient) {
  }
  picArray: Pic[] = [];
  ngOnInit(){
    this.fetchArray();
  }
  fetchArray = () => {
    this.http.get<Pic[]>('../../assets/json/test.json').subscribe((res: Pic[]) => {
      this.picArray = res;
      console.log(res);
    });
  };

  openPic = (imageSource) => {
    this.photoViewer.show(imageSource);
  }
}
