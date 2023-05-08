import { Component, OnInit } from '@angular/core';
import {CommonModule, Location} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {ActivatedRoute, Router} from "@angular/router";
import {FunctionPromiseService, JWTApiService} from "@savvato-software/savvato-javascript-services";
import {LaboursService} from "../../_services/labours.service";
import {environment} from "../../../_environments/environment";
import {SavvatoCareerpathComponentModule} from "@savvato-software/savvato-careerpath-component";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-display',
  templateUrl: './display.page.html',
  styleUrls: ['./display.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, SavvatoCareerpathComponentModule],
  providers: [LaboursService, JWTApiService, HttpClient]
})
export class DisplayPage implements OnInit {

  labour: any = undefined;
  labourId: number = -1;

  funcKey: string = "laboursDisplay-careerPath-comp-ctrlr"

  constructor(private _location: Location,
              private _router: Router,
              private _route: ActivatedRoute,
              private _laboursService: LaboursService,
              private _functionPromiseService: FunctionPromiseService) {

  }

  ngOnInit() {
    let self = this;
    self._route.params.subscribe((params: any) => {
      self.labourId = params['labourId'];

      self._laboursService.getLabourById(self.labourId).then((labour: any) => {
        self.labour = labour;
      })

      self._functionPromiseService.initFunc(self.funcKey, () => {
        return new Promise((resolve, reject) => {
          resolve({
            getEnv: () => {
              return environment;
            },
            labourProviderFunction: () => {
              return self.labour;
            }
          })
        })
      })
    })
  }

  getCareerGoalPathComponentController() {
    return this._functionPromiseService.waitAndGet(this.funcKey, this.funcKey, { });
  }

  onEditLabourBtnClick() {
    this._router.navigate(['/labours/edit/' + this.labourId]);
  }

  onBackBtnClick() {
    this._location.back();
  }
}

