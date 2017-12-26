import { Component } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Headers, RequestOptions } from '@angular/http';
import { Request, RequestMethod} from '@angular/http';
import { HttpClient } from '@angular/common/http';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalArtisteComponent } from './modal/modal.component';


@Component({
  selector: 'ngx-artiste',
  styleUrls: ['./artiste.component.scss'],
  templateUrl: './artiste.component.html',
})

export class ArtisteComponent {

    artiste:Array<any>;
     currentPic:String;
     csv:String;
     sizeArtiste:number;
     searchArray:Array<any>;
     firstSearchArray:Array<any>;
     filterArray:Array<String>;
     addLive:any;
     artistMod:any;
     error: number;

     constructor(private modalService: NgbModal, public http: HttpClient, public router: Router) {
       this.artiste = [];
       this.sizeArtiste = 0;
       this.searchArray = [];
       this.addLive = {
         nombre: 0,
         artistId: "",
         picToRemove: 0,
       };
       this.artistMod = {
         nombre: 0,
         artistId: "",
         picToRemove: 0,
       };
       this.firstSearchArray = [];
       this.firstSearchArray.push({
         filter: "Nom",
         search: "",
         id: 0,
       });
       this.filterArray = ["Nom", "Email", "Description", "Style"];
       this.getAllArtist();
     }

     getAllArtist():void {
       var body = 'token=42';

       this.http
         .post('http://92.222.78.82:8080/get/artist',
         body, {
           headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
         })
         .subscribe((data: any) => {
             for (var i = 0; i < data.artist.length; i++) {
               var tmpDate = new Date(data.artist[i].creationDate);
               var year = tmpDate.getFullYear();
               this.artiste.push({
                 id: i,
                 _id: data.artist[i]._id,
                 name: data.artist[i].name,
                 email: data.artist[i].email,
                 desc : data.artist[i].description,
                 style : data.artist[i].style,
                 credit_live : data.artist[i].credit_live,
                 nb_date : data.artist[i].event.length,
                 profil : data.artist[i].profil_image != undefined ? "http://92.222.78.82:8080/"  + data.artist[i].profil_image : undefined,
                 back : data.artist[i].background_image != undefined ? "http://92.222.78.82:8080/"  + data.artist[i].background_image : undefined,
                 banned : data.artist[i].banned,
                 artist: data.artist[i],
                 creationDate : tmpDate.getDay() + "/" + tmpDate.getMonth() + "/" + year,
               })
               console.log(tmpDate);
               if (this.artiste[i].desc.length >= 100) { // On check si la taille de la description n'est pas > 150 pour éviter de surcharger le tableau
                   var strcpy = this.artiste[i].desc;
                   this.artiste[i].desc = "";
                   for (var j = 0; j < 97; j++) {
                       this.artiste[i].desc += strcpy[j];
                   }
                   this.artiste[i].desc += "...";
               }
               if (this.artiste[i].style.length >= 30) { // Pareil mais ici avec le style
                   var strcpy = this.artiste[i].style;
                   this.artiste[i].style = "";
                   for (var j = 0; j < 27; j++) {
                       this.artiste[i].style += strcpy[j];
                   }
                   this.artiste[i].style += "...";
               }
               this.sizeArtiste = data.artist.length;
             }
           }, error => {
           console.log(JSON.stringify(error));
       });
     }

     download(){
       this.createCSV();
       var csvData =  this.csv;
       var blob = new Blob([csvData], { type: 'text/csv' });
       var url = window.URL.createObjectURL(blob);
       window.open(url);
     }

     addFilter() {
       if (this.searchArray.length < this.filterArray.length - 1) {
         this.searchArray.push({
           filter: "Nom",
           search: "",
           id: this.searchArray.length + 1,
         });
       }
     }

     search() {
       var body = 'token=42';
       var newTab = [];
       newTab.push(this.firstSearchArray[0]);
       for (var i = 0; i < this.searchArray.length; i++) {
         newTab.push(this.searchArray[i]);
       }
       var nom : Array<any> = [];
       var email : Array<any> = [];
       var style : Array<any> = [];
       var desc : Array<any> = [];
       for (var i = 0; i < newTab.length; i++) {
         if (newTab[i].filter == "Nom") {
           console.log("on push a");
           nom.push("a");
         }
         if (newTab[i].filter == "Email") {
           email.push("a");
         }
         if (newTab[i].filter == "Style") {
           style.push("a");
         }
         if (newTab[i].filter == "Description") {
           desc.push("a");
         }
       }
       if (nom.length > 1 || email.length > 1 || style.length > 1 || desc.length > 1) {
         console.log("pa 2 filtre");
         this.error = 1;
         return;
       }
       for (var i = 0; i < newTab.length; i++) {
         var tmpStr : String;
         tmpStr = newTab[i].filter;
         console.log("TMPSTR : ");
         console.log(tmpStr);
         if (tmpStr == "Nom")
           body = body + '&nom=' + String(newTab[i].search);
         if (tmpStr == "Email")
           body = body + '&email=' + String(newTab[i].search);
         if (tmpStr == "Style")
           body = body + '&style=' + String(newTab[i].search);
         if (tmpStr == "Description")
           body = body + '&desc' + String(newTab[i].search);
       }

       console.log(body);
       this.http
         .post('http://92.222.78.82:8080/search/artist/',
         body, {
           headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
         })
         .subscribe((data: any) => {
             console.log(data);
             this.artiste = [];
             for (var i = 0; i < data.artist.length; i++) {
               var tmpDate = new Date(data.artist[i].creationDate);
               var year = tmpDate.getFullYear();
               this.artiste.push({
                 id: i,
                 _id: data.artist[i]._id,
                 name: data.artist[i].name,
                 email: data.artist[i].email,
                 desc : data.artist[i].description,
                 style : data.artist[i].style,
                 credit_live : data.artist[i].credit_live,
                 nb_date : data.artist[i].event.length,
                 profil : data.artist[i].profil_image != undefined ? "http://92.222.78.82:8080/"  + data.artist[i].profil_image : undefined,
                 back : data.artist[i].background_image != undefined ? "http://92.222.78.82:8080/"  + data.artist[i].background_image : undefined,
                 banned : data.artist[i].banned,
                 creationDate : tmpDate.getDay() + "/" + tmpDate.getMonth() + "/" + year,
               })

               this.sizeArtiste = data.artist.length;
             }
           }, error => {
           console.log(JSON.stringify(error));
       });
     }

     callType(value){
       console.log(value);
     }

     removeFilter() {
       if (this.searchArray.length > 0) {
         this.searchArray.splice(-1,1)
       }
     }


     reload() {
       location.reload();
     }

     showArtist(concert: any) {


         const activeModal = this.modalService.open(ModalArtisteComponent, {
           size: 'lg',
           backdrop: 'static',
         });

         console.log(concert);
         activeModal.componentInstance.modalHeader = "Fiche Artiste";
         activeModal.componentInstance.artistModeInSearch = true;
         if (concert.artist) {
             console.log("no search")
             activeModal.componentInstance.artist = concert.artist;
         } else {
             console.log("in search")
             activeModal.componentInstance.artist = concert;
         }
         activeModal.componentInstance.setupArtist();
         activeModal.componentInstance.modalFooter = "OK";
     }

     editArtist(item) {
       // var body = 'token=42' + '&artist_id=' + this.addLive.artistId;
       // var headers = new Headers();
       // headers.append('Content-Type', 'application/x-www-form-urlencoded');
       //
       // this.http
       //   .post('http://92.222.78.82:8080/ban/artist/',
       //   body, {
       //     headers: headers
       //   })
       //   .subscribe(data => {
       //       location.reload();
       //     }, error => {
       //     console.log(JSON.stringify(error));
       // });
     }

     createCSV() {
       var inf = "∞";
       this.csv = "Nom, E-mail, Description, Style, Date de création, Dates ajoutées, Nombre de Live!\n";
       var nbLive = 0;
       for (var i = 0; i < this.sizeArtiste; i++) {
         nbLive = this.artiste[i].credit_live < 999 ? this.artiste[i].credit_live : inf;
         this.csv = this.csv + "\"" + this.artiste[i].name + "\",\"" + this.artiste[i].email + "\",\"" + this.artiste[i].desc + "\",\"" + this.artiste[i].style + "\",\"" +  this.artiste[i].creationDate + "\",\"" + this.artiste[i].nb_date + "\",\"" + nbLive + "\"\n";
       }
     }

     addLiveShow() {
         const activeModal = this.modalService.open(ModalArtisteComponent, {
           size: 'lg',
           backdrop: 'static',
         });
         activeModal.componentInstance.artiste = this.artiste;
         activeModal.componentInstance.currentPic = this.currentPic;
         activeModal.componentInstance.csv = this.csv;
         activeModal.componentInstance.sizeArtiste = this.sizeArtiste;
         activeModal.componentInstance.searchArray = this.searchArray;
         activeModal.componentInstance.firstSearchArray = this.firstSearchArray;
         activeModal.componentInstance.filterArray = this.filterArray;
         activeModal.componentInstance.addLive = this.addLive;
         activeModal.componentInstance.error = this.error
         activeModal.componentInstance.modalHeader = 'Ajout de Live!';
         activeModal.componentInstance.doAddLive = true;

    }

    banArtisteShow() {
        const activeModal = this.modalService.open(ModalArtisteComponent, {
          size: 'lg',
          backdrop: 'static',
        });
        activeModal.componentInstance.artiste = this.artiste;
        activeModal.componentInstance.currentPic = this.currentPic;
        activeModal.componentInstance.csv = this.csv;
        activeModal.componentInstance.sizeArtiste = this.sizeArtiste;
        activeModal.componentInstance.searchArray = this.searchArray;
        activeModal.componentInstance.firstSearchArray = this.firstSearchArray;
        activeModal.componentInstance.filterArray = this.filterArray;
        activeModal.componentInstance.addLive = this.addLive;
        activeModal.componentInstance.error = this.error
        activeModal.componentInstance.modalHeader = "Bannissement d'artiste";
        activeModal.componentInstance.modalBody = "Êtes-vous sûr de vouloir bannir (cette mesure est définitive) : " +  this.addLive.name + " ?"
        activeModal.componentInstance.banMode = true;

   }

   deletePictureShow() {
       const activeModal = this.modalService.open(ModalArtisteComponent, {
         size: 'lg',
         backdrop: 'static',
       });
       activeModal.componentInstance.artiste = this.artiste;
       activeModal.componentInstance.currentPic = this.currentPic;
       activeModal.componentInstance.csv = this.csv;
       activeModal.componentInstance.sizeArtiste = this.sizeArtiste;
       activeModal.componentInstance.searchArray = this.searchArray;
       activeModal.componentInstance.firstSearchArray = this.firstSearchArray;
       activeModal.componentInstance.filterArray = this.filterArray;
       activeModal.componentInstance.addLive = this.addLive;
       activeModal.componentInstance.error = this.error
       activeModal.componentInstance.modalHeader = "Confirmation";
       activeModal.componentInstance.modalBody = "Êtes-vous sûr de supprimer cette image ?"
       activeModal.componentInstance.delPic = true;

  }

  showPictureShow() {
      const activeModal = this.modalService.open(ModalArtisteComponent, {
        size: 'lg',
        backdrop: 'static',
      });
      activeModal.componentInstance.artiste = this.artiste;
      activeModal.componentInstance.currentPic = this.currentPic;
      activeModal.componentInstance.csv = this.csv;
      activeModal.componentInstance.sizeArtiste = this.sizeArtiste;
      activeModal.componentInstance.searchArray = this.searchArray;
      activeModal.componentInstance.firstSearchArray = this.firstSearchArray;
      activeModal.componentInstance.filterArray = this.filterArray;
      activeModal.componentInstance.addLive = this.addLive;
      activeModal.componentInstance.error = this.error
      activeModal.componentInstance.modalHeader = "Image";
      activeModal.componentInstance.picMode = true;

 }
}
