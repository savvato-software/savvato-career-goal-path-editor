import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { CareerGoalService } from '../_services/career-goal.service'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

	dirty = false;
	careerGoalId = undefined;
	careerGoal = undefined;
	isNew = true;

	constructor(private _location: Location,
			    private _router: Router,
			    private _route: ActivatedRoute,
			    private _careerGoalService: CareerGoalService) {

	}

	ngOnInit() {
		let self = this;

		self._route.params.subscribe((params) => {
			self.careerGoalId = params['careerGoalId'];

			self.careerGoal = {id: -1, name: ''};

			if (self.careerGoalId) { // this is an existing question.. it already has an id.
				self._careerGoalService.getCareerGoalById(self.careerGoalId).then((cg) => {
					self.careerGoal = cg;
					self.isNew = false;
				});
			}
		});
	}

	isDirty() {
		return this.dirty;
	}

	setDirty() {
		this.dirty = true;
	}

	getCareerGoalName() {
		return this.careerGoal && this.careerGoal["name"];
	}

	onNameChange(evt) {
		this.careerGoal["name"] = evt.currentTarget.value;
		this.setDirty();
	}

}
