import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MediaProvider } from '../../providers/media/media';
import { LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-upload',
  templateUrl: 'upload.html',
})
export class UploadPage {

  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    public mediaProvider: MediaProvider, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadPage');
  }

  fileData = '';
  file: File;
  title: string;
  description: string;
  brightness;
  thermometer;
  water;
  contrast;


  presentLoadingDefault() {
    const loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present().catch();

    setTimeout(() => {
      loading.dismiss().catch();
      this.navCtrl.pop().catch();
    }, 5000);
  }

  onUpload = () => {
    const formData = new FormData();
    formData.append('title', this.title);
    formData.append('description', this.description);
    formData.append('file', this.file);
    this.mediaProvider.upload(formData).subscribe((res) => {
      this.presentLoadingDefault();
      console.log(res);
    });
  };

  handleChange = ($event) => {
    this.file = $event.target.files[0];
    this.showPreview();
  };

  showPreview = () => {
    const reader = new FileReader();
    reader.onloadend = () => {
      this.fileData = reader.result;
    };
    if(this.file.type.includes('video')) {
      this.fileData = 'https://dataself.com/wp-content/uploads/2018/08/Sage-X3-video-placeholder.jpg'
    }else if(this.file.type.includes('audio')) {
      this.fileData = 'https://marketplace.bantu.my/assets/audio-placeholder-304b4c582a7bc94e6bfeefa1cde5582dd56ab86affa79b6cc9d70e3027926ee8.png'
    }
    else{
      reader.readAsDataURL(this.file);
    }
  };

}
