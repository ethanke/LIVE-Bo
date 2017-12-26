import { NgModule } from '@angular/core';
import { DiscoverComponent } from './discover.component';
import { ThemeModule } from '../../@theme/theme.module';
import { StatusCardComponent } from './status-card/status-card.component';

@NgModule({
  imports: [
    ThemeModule,
  ],
  declarations: [
    DiscoverComponent,
    StatusCardComponent,
  ],
  entryComponents: [
  ],
})
export class DiscoverModule {

}
