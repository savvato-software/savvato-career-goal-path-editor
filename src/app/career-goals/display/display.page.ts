import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { FunctionPromiseService } from '@savvato-software/savvato-javascript-services';
import { CareerGoalService } from '../_services/career-goal.service'

import { environment } from '../../../_environments/environment';

@Component({
  selector: 'app-display',
  templateUrl: './display.page.html',
  styleUrls: ['./display.page.scss'],
})
export class DisplayPage implements OnInit {

	careerGoal = undefined;
	careerGoalId = undefined;

	funcKey = undefined;

	constructor(private _location: Location,
			    private _router: Router,
			    private _route: ActivatedRoute,
			    private _functionPromiseService: FunctionPromiseService,
			    private _careerGoalService: CareerGoalService) {

	}

	ngOnInit() {
		let self = this;
		self._route.params.subscribe((params) => {
			self.careerGoalId = params['careerGoalId'];

			self._careerGoalService.getCareerGoalById(self.careerGoalId).then((careerGoal) => {
				self.careerGoal = careerGoal;
			})

			self._functionPromiseService.initFunc(self.funcKey, () => {
				return new Promise((resolve, reject) => {
						resolve({
							getEnv: () => {
								return environment;
							},
							getCareerGoalProviderFunction: () => {
								return self.careerGoal;
							},
							onPathNameClick: (o) => {
								this._router.navigate(['/paths/display/' + o['id']]);
							},
							onMilestoneNameClick: (o) => {
								this._router.navigate(['/milestones/display/' + o['id']]);
							},
							onLabourNameClick: (o) => {
								this._router.navigate(['/labours/display/' + o['id']]);							
							},
							onQuestionClick: (o) => {
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
