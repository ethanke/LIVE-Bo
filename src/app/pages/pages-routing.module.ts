import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AvisComponent } from './avis/avis.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
      {
          path: 'dashboard',
          component: DashboardComponent,
      },
      {
          path: 'avis',
          component: AvisComponent,
      },
      {
          path: 'lien',
          loadChildren: './lien/lien.module#LienModule',
      },
      {
          path: 'usersdate',
          loadChildren: './usersdate/usersdate.module#UsersDateModule',
      },
      {
          path: 'technique',
          loadChildren: './technique/technique.module#TechniqueModule',
      },
      {
          path: 'marketing',
          loadChildren: './marketing/marketing.module#MarketingModule',
      },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class PagesRoutingModule {

}
