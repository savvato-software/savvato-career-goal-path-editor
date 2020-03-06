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

	selectedCollapseToLevel = 5;

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

	getCareerGoalName() {
		return this.careerGoal && this.careerGoal['name']
	}

	LEVEL_QUESTION = 5
	getQuestionsFromLabour(labour){
		if (labour && this.myLevelIsShowing(this.LEVEL_QUESTION)) {
			return labour['questions'];
		} else {
			return [ ];
		}
	}

	LEVEL_LABOURS = 4
	getLaboursFromMilestone(milestone) {
		if (milestone && this.myLevelIsShowing(this.LEVEL_LABOURS)) {
			return milestone['labours'];
		} else {
			return [ ];
		}
	}

	LEVEL_MILESTONE = 3
	getMilestonesFromPath(path) {
		if (path && this.myLevelIsShowing(this.LEVEL_MILESTONE)) {
			return path['milestones'];
		} else {
			return [ ];
		}
	}

	LEVEL_PATHS = 2
	getCareerGoalPaths(cg) {
		if (cg && this.myLevelIsShowing(this.LEVEL_PATHS)) {
			return cg['paths']
		} else {
			return [ ];
		}
	}

	LEVEL_CAREER_GOAL = 1
	getCareerGoal() {
		if (this.myLevelIsShowing(this.LEVEL_CAREER_GOAL)) {
			return [this.careerGoal];
		} else {
			return [ ];
		}
	}

	myLevelIsShowing(myLevel) {
		return this.selectedCollapseToLevel * 1.0 >= myLevel;
	}


	onEditCareerGoalBtnClick() {
		this._router.navigate(['/career-goals/edit/' + this.careerGoalId]);
	}
}
