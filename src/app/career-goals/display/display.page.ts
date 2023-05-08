import { Component, OnInit } from '@angular/core';
import {CommonModule, Location} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {ActivatedRoute, Router} from "@angular/router";
import {FunctionPromiseService, JWTApiService} from "@savvato-software/savvato-javascript-services";
import {CareerGoalService} from '../../_services/career-goal.service'
import {environment} from "../../../_environments/environment";
import {SavvatoCareerpathComponentModule} from "@savvato-software/savvato-careerpath-component";
import {HttpClient, HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-display',
  templateUrl: './display.page.html',
  styleUrls: ['./display.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,  SavvatoCareerpathComponentModule, HttpClientModule ],
  providers: [CareerGoalService, JWTApiService, HttpClient]
})
export class DisplayPage implements OnInit {

  careerGoal: any = undefined;
  careerGoalId: number = -1;

  funcKey: string = "careerGoalsDisplayCtrlr";

  constructor(private _location: Location,
              private _router: Router,
              private _route: ActivatedRoute,
              private _functionPromiseService: FunctionPromiseService,
              private _careerGoalService: CareerGoalService) {

  }

  ngOnInit() {
    let self = this;

    self._route.params.subscribe((params: any) => {
      self.careerGoalId = params['careerGoalId'];

      self._careerGoalService.getCareerGoalById(self.careerGoalId).then((careerGoal: any) => {
        self.careerGoal = careerGoal;
      })

      self._functionPromiseService.initFunc(self.funcKey, () => {
        return new Promise((resolve, reject) => {
          resolve({
            getEnv: () => {
              return environment;
            },
            careerGoalProviderFunction: () => {
              return self.careerGoal;
            },
            onPathNameClick: (o: any) => {
              this._router.navigate(['/paths/display/' + o['id']]);
            },
            onMilestoneNameClick: (o: any) => {
              this._router.navigate(['/milestones/display/' + o['id']]);
            },
            onLabourNameClick: (o: any) => {
              this._router.navigate(['/labours/display/' + o['id']]);
            },
            onQuestionClick: (o: any) => {
              // this._router.navigate(['/question/display/' + o['id']]);
            }
          })
        })
      })
    })
  }

  getCareerGoalPathComponentController() {
    return this._functionPromiseService.waitAndGet(this.funcKey, this.funcKey, { });
  }

  getCareerGoalName() {
    return this.careerGoal && this.careerGoal['name']
  }

  onEditCareerGoalBtnClick() {
    this._router.navigate(['/career-goals/edit/' + this.careerGoalId]);
  }
}
