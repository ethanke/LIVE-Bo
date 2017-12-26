import { Component, ViewChild, ElementRef } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'ngx-modal',
  template: `
    <div class="modal-header">
      <span>{{ modalHeader }}</span>
      <button class="close" aria-label="Close" (click)="closeModal()">
        <span aria-hidden="true">&times;</span>
      </button>

    </div>
    <div class="modal-body">
        <div *ngIf="this.placeMode == true">
        <div class="row">
            <div class="col-md-8">
                <h3>{{ this.place.name }}</h3>
                <h5>{{ this.place.address }}</h5>
            </div>
            <div class="col-md-4">
                <img src="{{ this.placePic }}" style="width:100%">
            </div>
            <div class="row">
                <div class="col-md-8">
                    <div class="font-w-bold">Address : </div><p class="font-w-regular">{{ this.place.address }} </p>
                </div>
            </div>
                <div class="col-md-4">
                    <div class="font-w-bold">Ville : </div><p class="font-w-regular"> {{ this.place.city }}</p>
                </div>
        </div>
        <div class="row">
            <div class="font-w-bold">Code postal : </div><p class="font-w-regular"> {{ " " + this.place.code_postal }}</p>
        </div>
        </div>
        <div *ngIf="mapMode == true">
            <iframe
                width="600"
                height="450"
                frameborder="0" style="border:0"
                [src]="this.getMapString()" target="_parent" allowfullscreen>
            </iframe>
        </div>
        <div *ngIf="artistMode == true">
            <div class="row">
                <div class="col-md-8">
                    <h3>{{ this.artist.name }}</h3>
                    <h5>{{ this.artist.description }}</h5>
                </div>
                <div class="col-md-4">
                    <img src="{{ this.artistPic }}" style="width:100%">
                </div>
            </div>
            <div class="row">
                <div class="col-md-10">
                    <div class="font-w-bold">Style : </div><p class="font-w-regular">{{ this.artist.style }} </p>
                </div>
            </div>
            <div class="row">
                <div class="col-md-10">
                    <div class="font-w-bold">Email : </div><p class="font-w-regular"> {{ this.artist.email }}</p>
                </div>
            </div>
            <div class="row">
                <div class="col-md-10">
                    <div class="font-w-bold">N° de Date créer : </div><p class="font-w-regular"> {{ this.artist.event.length }}</p>
                </div>
            </div>
            <div class="row">
                <div class="col-md-10">
                    <div class="font-w-bold">N° de Live! : </div><p class="font-w-regular"> {{ this.artist.credit_live }}</p>
                </div>
            </div>
            <div class="row">
                <div class="col-md-10">
                    <div class="font-w-bold">Compte crée le : </div><p class="font-w-regular"> {{ this.artistCreationDate }}</p>
                </div>
            </div>
        </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-md btn-primary" (click)="closeModal()">{{ modalFooter }}</button>
    </div>

  `,
})

// AIzaSyD3i-eU3lG1T6qUa4Z0cAmd8BwyHWaPyMg Google API Key

export class ModalConcertsComponent {
  modalFooter: string;
  modalBody: string;
  modalHeader: string;
  modalContent: string = '';

  artistMode: boolean = false;
  artist: any;
  artistCreationDate: string;
  artistPic: string;
  mapMode: boolean = false;
  map: any;
  mapString: any;
  placeMode: boolean = false;
  place: any;
  placePic: string;


  constructor(private activeModal: NgbActiveModal, private sanitizer: DomSanitizer) {

  }

  setupArtist() {
      if (this.artistMode == true) {
          var tmpDate = new Date(this.artist.creationDate);
          this.artistCreationDate = tmpDate.getDay() + "/" + tmpDate.getMonth() + "/" + tmpDate.getFullYear();
          this.artistPic = this.artist.profil_image != undefined ? "http://92.222.78.82:8080/"  + this.artist.profil_image : undefined;
          console.log(this.artistPic);
      }
  }

  setupMap() {
      if (this.mapMode == true) {
          this.mapString = "https://www.google.com/maps/embed/v1/place?key=AIzaSyD3i-eU3lG1T6qUa4Z0cAmd8BwyHWaPyMg&q=" + this.map.name.replace(/ /g,'') + "+" + this.map.address.replace(/ /g,'') + "+" + this.map.city.replace(/ /g,'');
      }
  }

  setupPlace() {
      if (this.placeMode == true) {
          this.placePic = this.place.picture != undefined ? "http://92.222.78.82:8080/"  + this.place.picture : undefined;
          console.log("lol");
          console.log(this.place);
      }
  }

  getMapString() {
      return this.sanitizer.bypassSecurityTrustResourceUrl(this.mapString);
  }

  closeModal() {
      console.log(this.map);
    this.activeModal.close();
  }

}
