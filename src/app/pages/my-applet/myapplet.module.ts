import { NgModule } from '@angular/core';
import { MyAppletComponent } from './myapplet.component';
import { ThemeModule } from '../../@theme/theme.module';
import { StatusCardComponent } from './status-card/status-card.component';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  imports: [
    ThemeModule,
  ],
  declarations: [
    MyAppletComponent,
    StatusCardComponent,
    ModalComponent,
  ],
  entryComponents: [
      ModalComponent,
  ],
})
export class MyAppletModule {

}
