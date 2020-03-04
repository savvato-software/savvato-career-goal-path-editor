import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { CareerGoalService } from '../_services/career-goal.service'

@Component({
  selector: 'app-display',
  templateUrl: './display.page.html',
  styleUrls: ['./display.page.scss'],
})
export class DisplayPage implements OnInit {

	careerGoal = undefined;
	careerGoalId = undefined;

	constructor(private _location: Location,
		    private _router: Router,
		    private _route: ActivatedRoute,
		    private _careerGoalService: CareerGoalService) {

	}

	ngOnInit() {
		let self = this;
		self._route.params.subscribe((params) => {
			self.careerGoalId = params['careerGoalId'];

			self._careerGoalService.getCareerGoalById(self.careerGoalId).then((careerGoal) => {
				self.careerGoal = careerGoal;
			})
		})
	}

	getCareerGoal() {
		return this.careerGoal;
	}

	getCareerGoalName() {
		return this.careerGoal && this.careerGoal['name']
	}

	getCareerGoalPaths() {
		return this.careerGoal && this.careerGoal['paths'];
	}

	onEditCareerGoalBtnClick() {
		this._router.navigate(['/career-goals/edit/' + this.careerGoalId]);
	}
}
