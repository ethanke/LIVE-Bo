import { Component } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';
import { Request, RequestMethod} from '@angular/http';
import { HttpClient } from '@angular/common/http'

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './modal/modal.component';


import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'ngx-myapplet',
  styleUrls: ['./myapplet.component.scss'],
  templateUrl: './myapplet.component.html',
})
export class MyAppletComponent {
  tableInfo : any;
  toggleTab : any;
  tableOrdered: any;

  constructor(private modalService: NgbModal, private http: HttpClient, private router: Router) {
    this.tableInfo = [];
    this.toggleTab = new Array();
    this.tableOrdered = [];
    var url = "http://10.16.253.16:8080/users/" + JSON.parse(localStorage.getItem('id')) + "/applets";
    this.http.get(url).subscribe((data : any) => {
        for (let item of data) {
            this.tableOrdered.push({
              id: item.id,
              name: item.name,
              action: item.action,
              backcolor: item.backgroundColor,
              imageUrl: item.imageUrl,
              reaction: item.reaction,
              description: item.description,
              active: item.active,
            })

        }
        for (var i = 0; i < data.length; i++)
          {

            var tmp = [];
            for (var j = 0; j < 3 && i < data.length; j++) {
              tmp.push({
                id: data[i].id,
                active: data[i].active,
                name: data[i].name,
                action: data[i].action,
                backcolor: data[i].backgroundColor,
                imageUrl: data[i].imageUrl,
                reaction: data[i].reaction,
                description: data[i].description,
                enumPlace: i
              })
              console.log(data[i]);
              if (j + 1 < 3) {
                i++;
              }
            }
            this.tableInfo.push(tmp);
          }
    });
  }

  toggleUpdate(index: number) {
    this.tableOrdered[index].active = !this.tableOrdered[index].active;
    var url = "http://10.16.253.16:8080/users/" + JSON.parse(localStorage.getItem('id')) + '/applets/active';
    var headers = new HttpHeaders();
    var body : any
    body = {
        token: JSON.parse(localStorage.getItem('token')),
        appletId: this.tableOrdered[index].id,
        active: this.tableOrdered[index].active,
    };
    headers.append('Content-Type', 'raw');
    console.log("BODY :: " + body.active);
    this.http
      .post(url,
      JSON.stringify(body), {
        headers: headers
      })
      .subscribe((data : any) => {

    }, (err: any) => {
        alert(err.error.status);
    });
  }

  showMissingInformation(ip: string, port: string, time: string) {

    const activeModal = this.modalService.open(ModalComponent, {
      size: 'lg',
      backdrop: 'static',
    });
    activeModal.componentInstance.modalHeader = 'Add new applets';
    activeModal.componentInstance.modalContent = 'blabla';
    activeModal.componentInstance.modalFooter = "Add";
  }

  addNewApplet() {
      this.router.navigate(['/pages/newapplet']);
  }
}
