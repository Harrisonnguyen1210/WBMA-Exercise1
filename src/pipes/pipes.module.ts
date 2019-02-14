import { NgModule } from '@angular/core';
import { ThumbnailPipe } from './thumbnail/thumbnail';
import { DescriptionPipe } from './description/description';
import { FilterPipe } from './filter/filter';
@NgModule({
	declarations: [ThumbnailPipe,
    DescriptionPipe,
    FilterPipe],
	imports: [],
	exports: [ThumbnailPipe,
    DescriptionPipe,
    FilterPipe]
})
export class PipesModule {}
