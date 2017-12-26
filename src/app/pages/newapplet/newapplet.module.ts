import { NgModule } from '@angular/core';
import { NewAppletComponent } from './newapplet.component';
import { ThemeModule } from '../../@theme/theme.module';

@NgModule({
  imports: [
    ThemeModule,
  ],
  declarations: [
    NewAppletComponent,
  ],
  entryComponents: [
  ],
})
export class NewAppletModule {

}
