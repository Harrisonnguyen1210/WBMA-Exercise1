import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MediaProvider } from '../../providers/media/media';
import { LoadingController } from 'ionic-angular';
import { Chooser } from '@ionic-native/chooser';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-upload',
  templateUrl: 'upload.html',
})
export class UploadPage {

  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    public mediaProvider: MediaProvider,
    public loadingCtrl: LoadingController, public chooser: Chooser,
    private alertController: AlertController) {
  }

  ionViewDidLoad() {
    setTimeout(() => {
    }, 5000);
  }

  fileData = '';
  file: File;
  myBlob: Blob;
  title: string;
  description: string;
  brightness = 100;
  thermometer = 100;
  water = 0;
  contrast = 100;
  showFilter = false;

  presentLoadingDefault() {
    const loading = this.loadingCtrl.create({
      content: 'Please wait...',
    });

    loading.present().catch();

    setTimeout(() => {
      loading.dismiss().catch();
      this.navCtrl.pop().catch();
    }, 5000);
  }

  onChoose = () => {
    this.chooser.getFile('image/gif,video/*').then(file => {
      if(!file.mediaType.includes('image')) this.showFilter = false;
      if (file.mediaType.includes('video'))
        this.fileData = 'https://dataself.com/wp-content/uploads/2018/08/Sage-X3-video-placeholder.jpg';
      else if (file.mediaType.includes('audio'))
        this.fileData = 'https://marketplace.bantu.my/assets/audio-placeholider-304b4c582a7bc94e6bfeefa1cde5582dd56ab86affa79b6cc9d70e3027926ee8.png';
      else if (file.mediaType.includes('image')) {
        this.showFilter = true;
        this.fileData = file.dataURI;
      }
      this.myBlob = new Blob([file.data], { type: file.mediaType });
    }).catch((error: any) => console.error(error));
  };

  onUpload = () => {
    console.log(this.file, this.title, this.description);
    if(this.file === undefined || this.title === undefined || this.description === undefined) this.showAlert('Please fill the form properly');
    else {
      const formData = new FormData();
      formData.append('title', this.title);
      formData.append('description', this.description +
        `### ${this.brightness} ### ${this.thermometer} ### ${this.water} ### ${this.contrast}`);
      formData.append('file', this.myBlob);
      this.mediaProvider.upload(formData).subscribe((res) => {
        this.presentLoadingDefault();
        console.log(res);
      });
    }
  };

  showAlert = (notice: string) => {
    let alert = this.alertController.create({
      title: 'NOTICE',
      subTitle: notice,
      buttons: ['OK'],
    });
    alert.present();
  };

  reset = () => {
    this.title = '';
    this.description = '';
    this.fileData = '';
    this.showFilter = false;
  };

}
