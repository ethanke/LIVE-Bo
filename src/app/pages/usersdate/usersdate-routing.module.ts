import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersDateComponent } from './usersdate.component';
import { CreateEventComponent } from './createevent/createevent.component';
import { ConcertsComponent } from './concerts/concerts.component';
import { ArtisteComponent } from './artiste/artiste.component';


const routes: Routes = [{
  path: '',
  component: UsersDateComponent,
  children: [
      {
          path: 'createevent',
          component: CreateEventComponent,
      },
      {
          path: 'concerts',
          component:ConcertsComponent,
      },
      {
          path: 'artiste',
          component: ArtisteComponent,
      }
    ],
}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersDateRoutingModule { }
