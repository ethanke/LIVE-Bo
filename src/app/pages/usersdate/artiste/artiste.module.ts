import { NgModule } from '@angular/core';
import { ArtisteComponent } from './artiste.component';
import { ThemeModule } from '../../../@theme/theme.module';
import { ModalArtisteComponent } from './modal/modal.component';

@NgModule({
  imports: [
    ThemeModule,
  ],
  declarations: [
    ArtisteComponent,
    ModalArtisteComponent,
  ],
  entryComponents: [
    ModalArtisteComponent,
  ],
})
export class ArtisteModule {

}
