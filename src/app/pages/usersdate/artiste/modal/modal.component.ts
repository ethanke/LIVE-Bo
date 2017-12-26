import { Component, ViewChild, ElementRef } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpHeaders } from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';
import { Request, RequestMethod} from '@angular/http';
import { HttpClient } from '@angular/common/http';
import {Http} from '@angular/http';


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
        <div *ngIf="artistModeInSearch == true">
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
                    <div class="font-w-bold">N° de Date créer : </div><p class="font-w-regular"> {{ this.artist.nb_date }}</p>
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
        <div *ngIf="this.delPic == true">
            <img src="{{ this.currentPic }}" style="width:100%">
        </div>
        <div *ngIf="this.picMode == true">
            <img src="{{ this.currentPic }}" style="width:100%">
        </div>
        {{ modalBody }}
        <div *ngIf="this.doAddLive == true">
            <input class="form-control" id="inputSuccess1" style=" color: #7D7D7D" type="number" min="1" step="1" #t (change)="addLive.nombre = t.value;">
        </div>
    </div>
    <div class="modal-footer">
        <div *ngIf="this.artistMode == true">
            <button class="btn btn-md btn-primary" (click)="closeModal()">OK</button>
        </div>
        <div *ngIf="this.artistModeInSearch == true">
            <button class="btn btn-md btn-primary" (click)="closeModal()">OK</button>
        </div>
        <div *ngIf="this.picMode == true">
            <button class="btn btn-md btn-primary" (click)="closeModal()">OK</button>
        </div>
        <div *ngIf="this.delPic == true">
            <button class="btn btn-md btn-primary" (click)="doDelPic();">Oui</button>
            <button class="btn btn-md btn-primary" (click)="closeModal();">Non</button>
        </div>
        <div *ngIf="this.doAddLive == true">
            <button class="btn btn-md btn-primary" (click)="addLiveRequest();">Ajouter</button>
            <button class="btn btn-md btn-primary" (click)="closeModal();">Quitter</button>
        </div>
        <div *ngIf="this.banMode == true">
            <button class="btn btn-md btn-primary" (click)="banArtist();">Oui</button>
            <button class="btn btn-md btn-primary" (click)="closeModal();">Non</button>
        </div>
    </div>

  `,
})
export class ModalArtisteComponent {
    artiste:Array<any>;
     currentPic:String;
     csv:String;
     sizeArtiste:number;
     searchArray:Array<any>;
     firstSearchArray:Array<any>;
     filterArray:Array<String>;
     addLive:any;
     error: number;

    picMode: boolean;
    delPic: boolean;
    doAddLive: boolean;
    doGesturePic: boolean;
    banMode: boolean;
    modalFooter: string;
    modalBody: string;
    modalHeader: string;


      artistMode: boolean = false;
      artistModeInSearch: boolean = false;
      artist: any;
      artistCreationDate: string;
      artistPic: string;

  constructor(private activeModal: NgbActiveModal, public http: HttpClient) {

  }

  ngOnInit() {
      if (this.picMode == true || this.delPic == true) {
          if (this.currentPic == undefined || this.currentPic == null || this.currentPic == "") {
              this.modalBody = "Pas d'image pour cet(te) artiste.";
          }
      }
  }

  closeModal() {
      console.log(this.currentPic);
    this.activeModal.close();
  }


  doDelPic() {
      if (this.addLive.picToRemove == 1)
        var body = 'token=42' + '&artist_id=' + this.addLive.artistId + "&photo=profil_image"
      if (this.addLive.picToRemove == 2)
        var body = 'token=42' + '&artist_id=' + this.addLive.artistId + "&photo=background_image"
      console.log(body);
      var headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');

      this.http
        .post('http://92.222.78.82:8080/del/artist/photo',
        body, {
          headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'),
        })
        .subscribe((data: any) => {
            console.log(data);
            location.reload();
          }, error => {
          console.log(JSON.stringify(error));
      });
      this.closeModal()
  }

  addLiveRequest() {
    var body = 'token=42' + '&artist_id=' + this.addLive.artistId + '&count=' + String(this.addLive.nombre);


    this.http
      .post('http://92.222.78.82:8080/add/artist/live',
      body, {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'),
      })
      .subscribe(data => {
          console.log(data);
          location.reload();
        }, error => {
        console.log(JSON.stringify(error));
    });
    this.closeModal()
  }

  setupArtist() {
      if (this.artistMode == true) {
          var tmpDate = new Date(this.artist.creationDate);
          this.artistCreationDate = tmpDate.getDay() + "/" + tmpDate.getMonth() + "/" + tmpDate.getFullYear();
          this.artistPic = this.artist.profil_image != undefined ? "http://92.222.78.82:8080/"  + this.artist.profil_image : undefined;
          console.log(this.artistPic);
      }
      if (this.artistModeInSearch == true) {
          var tmpDate = new Date(this.artist.creationDate);
          this.artistCreationDate = tmpDate.getDay() + "/" + tmpDate.getMonth() + "/" + tmpDate.getFullYear();
          this.artistPic = this.artist.profil;
      }
  }



  banArtist() {
    var body = 'token=42' + '&artist_id=' + this.addLive.artistId;

    this.http
      .post('http://92.222.78.82:8080/ban/artist/',
      body, {
         headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'),
      })
      .subscribe(data => {
          console.log(this.addLive.artistId);
          location.reload();
        }, error => {
        console.log(JSON.stringify(error));
    });
    this.closeModal();
  }

}
