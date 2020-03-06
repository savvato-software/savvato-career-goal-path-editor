import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { PathsService } from '../../_services/paths.service'

@Component({
  selector: 'app-display',
  templateUrl: './display.page.html',
  styleUrls: ['./display.page.scss'],
})
export class DisplayPage implements OnInit {

	path = undefined;
	pathId = undefined;

	constructor(private _location: Location,
		    private _router: Router,
		    private _route: ActivatedRoute,
		    private _pathsService: PathsService) {

	}

	ngOnInit() {
		let self = this;
		self._route.params.subscribe((params) => {
			self.pathId = params['pathId'];

			self._pathsService.getPathById(self.pathId).then((path) => {
				self.path = path;
			})
		})
	}

	getPath() {
		return [this.path];
	}

	getPathName() {
		return this.path && this.path['name']
	}

	getPathMilestones() {
		return this.path && this.path['milestones'];
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
	
	selectedCollapseToLevel = this.LEVEL_LABOURS;
	myLevelIsShowing(myLevel) {
		return this.selectedCollapseToLevel * 1.0 >= myLevel;
	}

	onMilestoneNameClick(milestone) {
		this._router.navigate(['/milestones/display/' + milestone['id']]);
	}

	onLabourNameClick(labour) {
		this._router.navigate(['/labours/display/' + labour['id']]);
	}

	onEditPathBtnClick() {
		this._router.navigate(['/paths/edit/' + this.pathId]);
	}

	onBackBtnClick() {
		this._location.back();
	}
}
