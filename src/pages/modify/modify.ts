import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MediaProvider } from '../../providers/media/media';

@Component({
  selector: 'page-modify',
  templateUrl: 'modify.html',
})
export class ModifyPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public mediaProvider: MediaProvider) {
    this.file_id = this.navParams.get('item').file_id;
  }

  title: string;
  description: string;
  file_id: number;

  onChange = () => {
    const json = {
      title: this.title,
      description : this.description
    };
    this.mediaProvider.updateMedia(this.file_id, json).subscribe(res => {
      this.navCtrl.pop().catch();
    })
  };

}
