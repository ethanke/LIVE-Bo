import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { MarketingRoutingModule } from './marketing-routing.module';
import { NgDatepickerModule } from 'ng2-datepicker';

import { MarketingComponent } from './marketing.component';
import { GoogleDataStudioComponent } from './gdstudio/gdstudio.component';

const components = [
    GoogleDataStudioComponent,
    MarketingComponent,
];

@NgModule({
  imports: [
    ThemeModule,
    MarketingRoutingModule,
    NgDatepickerModule,
  ],
  declarations: [
    ...components,
  ],
  entryComponents: [
  ],
})
export class MarketingModule { }
