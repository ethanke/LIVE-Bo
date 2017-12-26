import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TechniqueComponent } from './technique.component';
import { MonitoringComponent } from './monitoring/monitoring.component';
import { ApiComponent } from './api/api.component';

const routes: Routes = [{
  path: '',
  component: TechniqueComponent,
  children: [
      {
          path: 'monitoring',
          component: MonitoringComponent,
      },
      {
          path: 'api',
          component: ApiComponent,
      }
    ],
}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TechniqueRoutingModule { }
