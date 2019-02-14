import { Pipe, PipeTransform } from '@angular/core';
import { MediaProvider } from '../../providers/media/media';
import { Pic } from '../../interface/pic';

@Pipe({
  name: 'thumbnail',
  // pure: false,
})
export class ThumbnailPipe implements PipeTransform {

  constructor(private mediaProvider: MediaProvider) {

  }
  url = 'https://media.mw.metropolia.fi/wbma/uploads/';

  transform(id: number, ...args) {

    return new Promise((resolve, reject) => {
        this.mediaProvider.getSingleMedia(id).subscribe((response: Pic) => {
            if(response.thumbnails === undefined) {
              resolve('https://www.daimto.com/wp-content/uploads/2014/08/errorstop.png')
            }else{
              switch (args[0]) {
                case 'small':
                  resolve(this.url + response.thumbnails['w160']);
                  break;
                case 'large':
                  resolve(this.url + response.thumbnails['w640']);
                  break;
                case 'medium':
                  resolve(this.url + response.thumbnails['w320']);
                  break;
                case 'screenshot':
                  resolve(this.url + response.screenshot);
                  break;
                default:
                  resolve(this.url + response.thumbnails['w160']);
              }
            }
          },
          error => {
            console.log(error);
          },
        );
      },
    );
  }
}
