import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { TechniqueRoutingModule } from './technique-routing.module';

import { TechniqueComponent } from './technique.component';
import { MonitoringComponent } from './monitoring/monitoring.component';
import { ApiComponent } from './api/api.component';

const components = [
    MonitoringComponent,
    ApiComponent,
    TechniqueComponent,
];

@NgModule({
  imports: [
    ThemeModule,
    TechniqueRoutingModule,
  ],
  declarations: [
    ...components,
  ],
  entryComponents: [
  ],
})
export class TechniqueModule { }
