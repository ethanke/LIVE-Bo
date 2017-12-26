import { NgModule } from '@angular/core';
import { SearchComponent } from './search.component';
import { ThemeModule } from '../../@theme/theme.module';

@NgModule({
  imports: [
    ThemeModule,
  ],
  declarations: [
    SearchComponent,
  ],
  entryComponents: [
  ],
})
export class SearchModule {

}
