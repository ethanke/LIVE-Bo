import { NgModule } from '@angular/core';
import { ConcertsComponent } from './concerts.component';
import { ThemeModule } from '../../../@theme/theme.module';
import { ModalConcertsComponent } from './modal/modal.component';

@NgModule({
  imports: [
    ThemeModule,
  ],
  declarations: [
    ConcertsComponent,
    ModalConcertsComponent,
  ],
  entryComponents: [
    ModalConcertsComponent,
  ],
})
export class ConcertsModule {

}
