import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { CareerGoalService } from './_services/career-goal.service'

@Component({
  selector: 'app-career-goals',
  templateUrl: './career-goals.page.html',
  styleUrls: ['./career-goals.page.scss'],
})
export class CareerGoalsPage implements OnInit {

	careerGoals = undefined;

	constructor(private _location: Location,
		    private _router: Router,
		    private _route: ActivatedRoute,
		    private _careerGoalService: CareerGoalService) {

	}

  ngOnInit() {
	let self = this;
	self._route.params.subscribe((params) => {
		self._careerGoalService.getAllCareerGoals().then((careerGoals) => {
			self.careerGoals = careerGoals;
		})
	})
  }

  getAllCareerGoals() {
  	return this.careerGoals;
  }

}
