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

    // if (id !== this.cachedId) {
    //   console.log('id lol', id);
    //   this.cachedId = id;
    //   this.mediaProvider.getSingleMedia(id).subscribe((res: Pic) => {
    //       switch (args[0]) {
    //         case 'small':
    //           this.thumbnail = res.thumbnails['w160'];
    //           break;
    //         case 'medium':
    //           this.thumbnail = res.thumbnails['w320'];
    //           break;
    //         case 'large':
    //           this.thumbnail = res.thumbnails['w640'];
    //           break;
    //         case 'screenshot':
    //           this.thumbnail = res.screenshot;
    //           break;
    //         default:
    //           this.thumbnail = res.thumbnails['w160'];
    //
    //       }
    //     }
    //   );
    //   return this.thumbnail;
    // }

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
