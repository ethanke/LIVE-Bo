import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MarketingComponent } from './marketing.component';
import { GoogleDataStudioComponent } from './gdstudio/gdstudio.component';
const routes: Routes = [{
  path: '',
  component: MarketingComponent,
  children: [
      {
          path: 'gdstudio',
          component: GoogleDataStudioComponent,
      }
    ],
}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MarketingRoutingModule { }
