import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LienComponent } from './lien.component';
import { GoogleAnalyticsComponent } from './ganalytics/ganalytics.component';
import { FacebookAnalyticsComponent } from './fanalytics/fanalytics.component';
import { GoogleDocsComponent } from './gdocs/gdocs.component';

const routes: Routes = [{
  path: '',
  component: LienComponent,
  children: [
      {
          path: 'ganalytics',
          component: GoogleAnalyticsComponent,
      },
      {
          path: 'fanalytics',
          component: FacebookAnalyticsComponent,
      },
      {
          path: 'gdocs',
          component: GoogleDocsComponent,
      }
    ],
}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LienRoutingModule { }
