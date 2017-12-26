import { Component } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';
import { Request, RequestMethod} from '@angular/http';
import { HttpClient } from '@angular/common/http';
import {Http} from '@angular/http';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './modal/modal.component';

@Component({
  selector: 'ngx-avis',
  styleUrls: ['./avis.component.scss'],
  templateUrl: './avis.component.html',
})

export class AvisComponent {
  peopleTableData:Array<any>;
  waitingForReview:Array<any>;
  reportedReviewToRemove:Array<string>;

constructor(private modalService: NgbModal, public http: HttpClient) {
   this.waitingForReview = []
   this.getReportedReview();
   this.reportedReviewToRemove = []
 }

 isInArray(id: string) : boolean {
   for (let entry of this.reportedReviewToRemove) {
     if (entry == id) {
       console.log("true");
       return true;
     }
   }
   console.log("false");
   return false;
 }

   getReportedReview():void {

   var body = 'token=' + localStorage["token"] + '&signaled=' + 1;
   console.log(localStorage["token"])
   this.http
     .post('http://92.222.78.82:8080/get/feedback',
     body, {
       headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'),
     })
     .subscribe((data: any) => {
         for (var i = 0; i < data.feedback.length; i++) {
           this.waitingForReview.push({
             id: i,
             _id: data.feedback[i]._id,
             title: data.feedback[i].title,
             content: data.feedback[i].content,
             note: data.feedback[i].note,
             pseudo: data.feedback[i].pseudo,
             imageUrl: data.feedback[i].imageUrl,
             selected: false,
             date:  this.mySplit(this.mySplit(data.feedback[i].date, 2, '-'), 0, 'T') +'/'+ this.mySplit(data.feedback[i].date, 1, '-') +'/'+ this.mySplit(data.feedback[i].date, 0, '-'),
             status: "En attente",
             data: "tmp"

           })
         }
       }, error => {
       console.log(JSON.stringify(error));
   });
 }


 unsignalShow() {

        const activeModal = this.modalService.open(ModalComponent, {
          size: 'lg',
          backdrop: 'static',

        });
        activeModal.componentInstance.waitingForReview = this.waitingForReview;
        activeModal.componentInstance.modalHeader = 'Désignalé un avis';
        if (this.getReportedArray() !== 0) {
            activeModal.componentInstance.unReport = true;
            activeModal.componentInstance.modalBody = "Êtes-vous sûr de vouloir désignaliser " + this.getReportedArray() + " avis ?"
        }
        if (this.getReportedArray() === 0) {
            activeModal.componentInstance.missingInfo = true;
            activeModal.componentInstance.modalBody = "Vous devez selectionner au minimum un avis."
            activeModal.componentInstance.modalFooter = "Ok";
        }
 }

 delAvisShow() {
     console.log("on open ienb");

        const activeModal = this.modalService.open(ModalComponent, {
          size: 'lg',
          backdrop: 'static',

        });

        activeModal.componentInstance.modalHeader = 'Supprimer un avis';
        activeModal.componentInstance.waitingForReview = this.waitingForReview;
        if (this.getReportedArray() !== 0) {
            console.log("on reported in array");
            activeModal.componentInstance.removeAvis = true;
            activeModal.componentInstance.modalBody = "Êtes-vous sûr de vouloir supprimer " + this.getReportedArray() + " avis ?"
        }
        if (this.getReportedArray() === 0) {
            activeModal.componentInstance.missingInfo = true;
            activeModal.componentInstance.modalBody = "Vous devez selectionner au minimum un avis."
            activeModal.componentInstance.modalFooter = "Ok";
        }
 }

public mySplit (str : string, nb: number, toremove: string) {
   var array = str.split(toremove);
   return array[nb];
}



 setSelect(item: any) {
   item.selected = !item.selected;
 }

 getReportedArray() : number {
   var j = 0;
   for (var i = 0; i < this.waitingForReview.length; i++) {
     console.log(this.waitingForReview[i].selected);
     if (this.waitingForReview[i].selected === true) {
       j += 1;
     }
   }
   return j;
 }
}
