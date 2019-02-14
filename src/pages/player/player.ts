import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FilterPipe } from '../../pipes/filter/filter';
import { MediaProvider } from '../../providers/media/media';

/**
 * Generated class for the PlayerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-player',
  templateUrl: 'player.html',
})
export class PlayerPage {

  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    public mediaProvider: MediaProvider) {
    console.log(this.navParams.get('item'));
    this.myItem = this.navParams.get('item');
    this.filter = FilterPipe.prototype.transform(this.myItem.description);
    this.mediaProvider.getUserInfo(this.myItem.user_id).subscribe(res => {
      this.user = res;
      console.log(res);
    });
  }

  myItem;
  filter = {
    brightness: 0,
    saturation: 0,
    sepia: 0,
    contrast: 0,
  };
  url = 'https://media.mw.metropolia.fi/wbma/uploads/';
  user;

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlayerPage');
  }

}
