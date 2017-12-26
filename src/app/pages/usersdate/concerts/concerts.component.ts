import { Component, ViewChild } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Headers, RequestOptions } from '@angular/http';
import { Request, RequestMethod} from '@angular/http';
import { HttpClient } from '@angular/common/http';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalConcertsComponent } from './modal/modal.component';

@Component({
  selector: 'ngx-concerts',
  styleUrls: ['./concerts.component.scss'],
  templateUrl: './concerts.component.html',
})

export class ConcertsComponent {

    concerts : any;

    constructor(private http : HttpClient, private modalService: NgbModal) {
        var body = 'token=42';

        var url = "http://92.222.78.82:8080/get/event";
        this.http
          .post(url,
          body, {
            headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'),
          })
          .subscribe((item:any) => {
              this.concerts = item.events;
            }, error => {
            console.log(JSON.stringify(error));
        });
    }

      showArtist(concert: any) {
          const activeModal = this.modalService.open(ModalConcertsComponent, {
            size: 'lg',
            backdrop: 'static',
          });
          activeModal.componentInstance.modalHeader = "Fiche Artiste";
          activeModal.componentInstance.modalFooter = "OK";
          activeModal.componentInstance.artistMode = true;
          activeModal.componentInstance.artist = concert.artist;
          activeModal.componentInstance.setupArtist();
          console.log(concert.artist);
      }

      showPlace(place: any) {
          const activeModal = this.modalService.open(ModalConcertsComponent, {
            size: 'lg',
            backdrop: 'static',
          });
          activeModal.componentInstance.modalHeader = "Lieu";
          activeModal.componentInstance.modalFooter = "OK";
          activeModal.componentInstance.place = place;
          activeModal.componentInstance.placeMode = true;
          activeModal.componentInstance.setupPlace();
          console.log(place);
      }

      showMap(place: any) {
          const activeModal = this.modalService.open(ModalConcertsComponent, {
            size: 'lg',
            backdrop: 'static',
          });
          activeModal.componentInstance.modalHeader = "Map";
          activeModal.componentInstance.modalFooter = "OK";
          activeModal.componentInstance.map = place;
          activeModal.componentInstance.mapMode = true;
          activeModal.componentInstance.setupMap();
          console.log(place);
      }



}
