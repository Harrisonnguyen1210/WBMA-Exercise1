import { Pipe, PipeTransform } from '@angular/core';
import { MediaProvider } from '../../providers/media/media';
import { Pic } from '../../interface/pic';

@Pipe({
  name: 'thumbnail',
  // pure: false,
})
export class ThumbnailPipe implements PipeTransform {

  private thumbnail = '';
  private cachedId: number;

  constructor(private mediaProvider: MediaProvider) {

  }

  transform(id: number, ...args) {

    return new Promise((resolve, reject) => {
        this.mediaProvider.getSingleMedia(id).subscribe((response: Pic) => {
            switch (args[0]) {
              case 'large':
                resolve(response.thumbnails['w640']);
                break;
              case 'medium':
                resolve(response.thumbnails['w320']);
                break;
              case 'screenshot':
                resolve(response.screenshot);
                break;
              default:
                resolve(response.thumbnails['w160']);
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
