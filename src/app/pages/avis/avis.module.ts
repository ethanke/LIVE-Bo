import { NgModule } from '@angular/core';
import { AvisComponent } from './avis.component';
import { ThemeModule } from '../../@theme/theme.module';
import { StatusCardComponent } from './status-card/status-card.component';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  imports: [
    ThemeModule,
  ],
  declarations: [
    AvisComponent,
    StatusCardComponent,
    ModalComponent,
  ],
  entryComponents: [
     ModalComponent,
  ],
})
export class AvisModule {

}
