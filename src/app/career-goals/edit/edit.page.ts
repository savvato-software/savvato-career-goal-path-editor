import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { CareerGoalService } from '../_services/career-goal.service'
import { PathsService } from '../../_services/paths.service'

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

	paths = undefined;

	constructor(private _location: Location,
			    private _router: Router,
			    private _route: ActivatedRoute,
			    private _pathService: PathsService,
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

					self._pathService.getAllPaths().then((paths: [{}]) => {
						self.paths = paths.map(
							(p) => { 
								p['isSelected'] = self.careerGoal['paths']
									.map((cgp) => cgp['id'])
									.includes(p['id'])
								return p;
							}
						);
					});
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

	getPaths() {
		return this.paths
	}

	onNameChange(evt) {
		this.careerGoal["name"] = evt.currentTarget.value;
		this.setDirty();
	}

	isSaveBtnEnabled() {
		return this.isDirty() && this.paths.find((path) => path['isSelected']);
	}

	onPathSelectionChanged(evt) {
		this.setDirty();
	}

	onSaveBtnClick() {
		this._careerGoalService.save(this.careerGoal, this.paths.filter(p => p['isSelected']).map(p => p['id']).join()).then((careerGoal) => {
			this.careerGoal = careerGoal;
			this.dirty = false;
		})
	}
}
