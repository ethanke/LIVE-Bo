import { Component } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';
import { Request, RequestMethod} from '@angular/http';
import { HttpClient } from '@angular/common/http'

import { Router, RouterModule } from '@angular/router'

@Component({
  selector: 'ngx-newapplet',
  styleUrls: ['./newapplet.component.scss'],
  templateUrl: './newapplet.component.html',
})
export class NewAppletComponent {

    @ViewChild('ifSelect') ifSelect: ElementRef;
    @ViewChild('ifSelectAction') ifSelectAction: ElementRef;
    @ViewChild('ifParamDiv') ifParamDiv: ElementRef;
    @ViewChild('thenSelect') thenSelect: ElementRef;
    @ViewChild('thenSelectReaction') thenSelectReaction: ElementRef;
    @ViewChild('thenParamDiv') thenParamDiv: ElementRef;

    ifChoices : any;
    ifAction : boolean;
    ifParam : boolean;
    currentIf: any;
    currentIfAction: any;
    currentIfActionParam: any;

    thenParam: boolean;
    thenChoices : any;
    then : boolean;
    thenReaction : boolean
    currentThen: any;
    currentThenReaction: any;
    currentThenReactionParam: any;

    constructor(private http: HttpClient, private router: Router) {
        this.then = false;
        this.ifChoices = [];
        this.currentIfActionParam = [];
        this.thenChoices = [];
        this.currentThenReactionParam = [];
        this.getModules();
    }

    getModules() {

    }

    changeIfService() {
        this.currentIf = this.ifChoices[this.ifSelect.nativeElement.selectedIndex - 1];
    }

    changeIfAction() {
        var i = 0;

        if (this.currentIfActionParam.length > 0) {
            this.currentIfActionParam = [];
        }
        this.currentIfAction = this.currentIf.actions[this.ifSelectAction.nativeElement.selectedIndex - 1];
        for (let item of Object.keys(this.currentIfAction)) {

            if (item != "name" && item != 'description') {
                this.currentIfActionParam.push({
                        key: item,
                        value: "",
                })
            }
        }
    }

    changeThenService() {
        this.currentThen = this.thenChoices[this.thenSelect.nativeElement.selectedIndex - 1];
        console.log(this.currentThen);
    }

    changeThenReaction() {
        var i = 0;

        if (this.currentThenReactionParam.length > 0) {
            this.currentThenReactionParam = [];
        }
        this.currentThenReaction = this.currentThen.reactions[this.thenSelectReaction.nativeElement.selectedIndex - 1];
        for (let item of Object.keys(this.currentThenReaction)) {

            if (item != "name" && item != 'description') {
                this.currentThenReactionParam.push({
                        key: item,
                        value: "",
                })
            }
        }
    }

    sendRequest() {
        var url = "http://10.16.253.16:8080/users/" + JSON.parse(localStorage.getItem('id')) + '/applets';
        var headers = new HttpHeaders();
        var body : any
        body = {
            token: JSON.parse(localStorage.getItem('token')),
            actionModule: this.currentIf.name,
            reactionModule: this.currentThen.name,
            action: this.currentIfAction.name,
            reaction: this.currentThenReaction.name,
            backgroundColor: "random",
            imageUrl: "https://picsum.photos/200/200/?random",
            actionData: {},
            reactionData: {},
        };
        for (let item of this.currentIfActionParam) {
            body.actionData[item.key] = item.value;
        }
        for (let item of this.currentThenReactionParam) {
            body.reactionData[item.key] = item.value;
        }
        headers.append('Content-Type', 'raw');
        this.http
          .post(url,
          JSON.stringify(body), {
            headers: headers
          })
          .subscribe((data : any) => {
              this.router.navigate(['/pages/myapplet'])
        }, (err: any) => {
            console.log(err);
            alert(err.error.status);
        });
    }


}


// ACTION == IF // REACTION == ELSE
