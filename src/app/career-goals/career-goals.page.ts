import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { CareerGoalService } from "../_services/career-goal.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { JWTApiService } from "@savvato-software/savvato-javascript-services";

@Component({
  selector: 'app-career-goals',
  templateUrl: './career-goals.page.html',
  styleUrls: ['./career-goals.page.scss'],
  standalone: true,
  imports: [ IonicModule, CommonModule, HttpClientModule ],
  providers: [CareerGoalService, JWTApiService, HttpClient]
})
export class CareerGoalsPage implements OnInit {

  careerGoals = undefined;

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              private _careerGoalService: CareerGoalService
  ) {

  }

  ngOnInit() {
    let self = this;

    self._route.params.subscribe((params: any) => {
      self._careerGoalService.getAllCareerGoals().then((careerGoals: any) => {
        self.careerGoals = careerGoals.sort((a: any,b: any) => { return a['name'].localeCompare(b['name']); });
      })
    })
  }

  getAllCareerGoals() {
    return this.careerGoals;
  }

  onCareerGoalClick(cg: any) {
    this._router.navigate(['/career-goals/display/' + cg['id']]);
  }

  onNewCareerGoalBtnClick() {
    // todo
  }

}
