import { NgModule } from '@angular/core';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';

import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { AvisModule } from './avis/avis.module';
import { LienModule } from './lien/lien.module';
import { UsersDateModule } from './usersdate/usersdate.module';
import { TechniqueModule } from './technique/technique.module';
import { MarketingModule } from './marketing/marketing.module';


const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    AvisModule,
    LienModule,
    UsersDateModule,
    TechniqueModule,
    MarketingModule,
  ],
  declarations: [
    ...PAGES_COMPONENTS,
  ],
})
export class PagesModule {

}
