import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { UsersDateRoutingModule } from './usersdate-routing.module';
import { NgDatepickerModule } from 'ng2-datepicker';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';

import { ArtisteComponent } from './artiste/artiste.component';
import { UsersDateComponent } from './usersdate.component';
import { CreateEventComponent } from './createevent/createevent.component';
import { ConcertsComponent } from './concerts/concerts.component';
import { ModalConcertsComponent } from './concerts/modal/modal.component';
import { ModalArtisteComponent } from './artiste/modal/modal.component';
import { Ng4GeoautocompleteModule } from 'ng4-geoautocomplete';

const components = [
    CreateEventComponent,
    UsersDateComponent,
    ArtisteComponent,
    ConcertsComponent,
    ModalConcertsComponent,
    ModalArtisteComponent
];

@NgModule({
  imports: [
    ThemeModule,
    UsersDateRoutingModule,
    NgDatepickerModule,
    Ng2AutoCompleteModule,
    Ng4GeoautocompleteModule,
  ],
  declarations: [
    ...components,
  ],
  entryComponents: [
      ModalConcertsComponent,
      ModalArtisteComponent
  ],
})
export class UsersDateModule { }
