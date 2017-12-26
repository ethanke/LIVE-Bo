import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { LienRoutingModule } from './lien-routing.module';
import { LienComponent } from './lien.component';
import { GoogleAnalyticsComponent } from './ganalytics/ganalytics.component';
import { FacebookAnalyticsComponent } from './fanalytics/fanalytics.component';
import { GoogleDocsComponent } from './gdocs/gdocs.component';

const components = [
    FacebookAnalyticsComponent,
    GoogleAnalyticsComponent,
    LienComponent,
    GoogleDocsComponent,
];

@NgModule({
  imports: [
    ThemeModule,
    LienRoutingModule,
  ],
  declarations: [
    ...components,
  ],
  entryComponents: [
  ],
})
export class LienModule { }
