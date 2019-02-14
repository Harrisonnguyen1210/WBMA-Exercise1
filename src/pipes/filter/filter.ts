import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the FilterPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    const pattern = '\\[f\\](.*?)\\[\\/f\\]';
    const re = new RegExp(pattern);
    try {
      return JSON.parse(re.exec(value)[1]);
    } catch (e) {
      console.log('this is called');
      return {
        brightness: 100,
        thermometer: 100,
        water: 0,
        contrast: 100,
      };
    }
  }
}
