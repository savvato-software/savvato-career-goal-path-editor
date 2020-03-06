import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { MilestonesService } from '../../_services/milestones.service'

@Component({
  selector: 'app-display',
  templateUrl: './display.page.html',
  styleUrls: ['./display.page.scss'],
})
export class DisplayPage implements OnInit {

	milestone = undefined;
	milestoneId = undefined;

	constructor(private _location: Location,
		    private _router: Router,
		    private _route: ActivatedRoute,
		    private _milestonesService: MilestonesService) {

	}

	ngOnInit() {
		let self = this;
		self._route.params.subscribe((params) => {
			self.milestoneId = params['milestoneId'];

			self._milestonesService.getMilestoneById(self.milestoneId).then((milestone) => {
				self.milestone = milestone;
			})
		})
	}

	getMilestone() {
		return [this.milestone];
	}

	getMilestoneName() {
		return this.milestone && this.milestone['name']
	}

	getLabours() {
		return this.milestone && this.milestone['labours'];
	}

	onLabourNameClick(labour) {
		this._router.navigate(['/labours/display/' + labour['id']]);
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

	selectedCollapseToLevel = this.LEVEL_LABOURS;
	myLevelIsShowing(myLevel) {
		return this.selectedCollapseToLevel * 1.0 >= myLevel;
	}

	onEditMilestoneBtnClick() {
		this._router.navigate(['/milestones/edit/' + this.milestoneId]);
	}

	onBackBtnClick() {
		this._location.back();
	}
}
