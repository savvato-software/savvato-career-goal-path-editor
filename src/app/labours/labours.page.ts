import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import {LaboursService} from "../_services/labours.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { JWTApiService } from "@savvato-software/savvato-javascript-services";

@Component({
  selector: 'app-labours',
  templateUrl: './labours.page.html',
  styleUrls: ['./labours.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule],
  providers: [LaboursService, JWTApiService, HttpClient]
})
export class LaboursPage implements OnInit {

  labours = undefined;

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              private _laboursService: LaboursService) {

  }

  ngOnInit() {
    let self = this;
    self._route.params.subscribe((params: any) => {
      self._laboursService.getAllLabours().then((labours: any) => {
        self.labours = labours.sort((a: any,b: any) => { return a['name'].localeCompare(b['name']); });
      })
    })
  }

  getAllLabours() {
    return this.labours;
  }

  onLabourClick(l: any) {
    this._router.navigate(['/labours/display/' + l['id']]);
  }

  onNewLabourBtnClick() {
    // todo: implement
  }

}
