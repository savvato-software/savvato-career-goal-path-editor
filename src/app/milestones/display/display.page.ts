import { Component, OnInit } from '@angular/core';
import {CommonModule, Location} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {ActivatedRoute, Router} from "@angular/router";
import {FunctionPromiseService, JWTApiService} from "@savvato-software/savvato-javascript-services";
import { MilestonesService } from "../../_services/milestones.service";
import {environment} from "../../../_environments/environment";
import {SavvatoCareerpathComponentModule} from "@savvato-software/savvato-careerpath-component";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-display',
  templateUrl: './display.page.html',
  styleUrls: ['./display.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, SavvatoCareerpathComponentModule],
  providers: [MilestonesService, JWTApiService, HttpClient]
})
export class DisplayPage implements OnInit {

  milestone: any = undefined;
  milestoneId: number = -1;

  funcKey = "milestone-cgcomp-ctrlr"

  constructor(private _location: Location,
              private _router: Router,
              private _route: ActivatedRoute,
              private _milestonesService: MilestonesService,
              private _functionPromiseService: FunctionPromiseService) {

  }

  ngOnInit() {
    let self = this;
    self._route.params.subscribe((params: any) => {
      self.milestoneId = params['milestoneId'];

      self._milestonesService.getMilestoneById(self.milestoneId).then((milestone: any) => {
        self.milestone = milestone;
      })

      self._functionPromiseService.initFunc(self.funcKey, () => {
        return new Promise((resolve, reject) => {
          resolve({
            getEnv: () => {
              return environment;
            },
            milestoneProviderFunction: () => {
              return self.milestone;
            },
            onLabourNameClick: (o: any) => {
              this._router.navigate(['/labours/display/' + o['id']]);
            }
          })
        })
      })
    })
  }

  getCareerGoalPathComponentController() {
    return this._functionPromiseService.waitAndGet(this.funcKey, this.funcKey, { });
  }

  onEditMilestoneBtnClick() {
    this._router.navigate(['/milestones/edit/' + this.milestoneId]);
  }

  onBackBtnClick() {
    this._location.back();
  }
}
