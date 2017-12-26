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
        {{ modalBody }}
    </div>
    <div class="modal-footer">
        <div *ngIf="this.missingInfo == true">
            <button class="btn btn-md btn-primary" (click)="closeModal()">OK</button>
        </div>
        <div *ngIf="this.removeAvis == true">
            <button class="btn btn-md btn-primary" (click)="delete()">Oui</button>
            <button class="btn btn-md btn-primary" (click)="closeModal()">Non</button>
        </div>
        <div *ngIf="this.unReport == true">
            <button class="btn btn-md btn-primary" (click)="doUnReport()">Oui</button>
            <button class="btn btn-md btn-primary" (click)="closeModal()">Non</button>
        </div>
    </div>

  `,
})
export class ModalComponent {
    waitingForReview:Array<any>;
  removeAvis: boolean;
  unReport: boolean;
  missingInfo: boolean;
  modalFooter: string;
  modalBody: string;
  modalHeader: string;
  modalContent: string = `Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy
    nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis
    nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.`;

  constructor(private activeModal: NgbActiveModal, public http: HttpClient) {

  }

  closeModal() {
    this.activeModal.close();
  }


  doUnReport() {
     for (var i = 0; i < this.waitingForReview.length; i++) {
       if (this.waitingForReview[i].selected == true) {
         var body = 'token=' + localStorage["token"] + '&id=' + this.waitingForReview[i]._id;

         this.http
           .post('http://92.222.78.82:8080/validate/feedback',
           body, {
             headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'),
           })
           .subscribe((data:any) => {
             console.log(data);
             }, error => {
             console.log(JSON.stringify(error));
         });
         this.waitingForReview.splice(i, 1);
       }

     }
     this.closeModal()

  }

  delete() {
       for (var i = 0; i < this.waitingForReview.length; i++) {
         if (this.waitingForReview[i].selected == true) {
           var body = 'token=' + localStorage["token"] + '&id=' + this.waitingForReview[i]._id;



           this.http
             .post('http://92.222.78.82:8080/delete/feedback',
             body, {
               headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'),
             })
             .subscribe((data: any) => {
               console.log(data);
               }, error => {
               console.log(JSON.stringify(error));
           });
           this.waitingForReview.splice(i, 1);
         }


       }
       this.closeModal()
  }
}
