import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { FunctionPromiseService } from '@savvato-software/savvato-javascript-services';
import { MilestonesService } from '../../_services/milestones.service'

import { environment } from '../../../_environments/environment';

@Component({
  selector: 'app-display',
  templateUrl: './display.page.html',
  styleUrls: ['./display.page.scss'],
})
export class DisplayPage implements OnInit {

	milestone = undefined;
	milestoneId = undefined;

	funcKey = "milestone-cgcomp-ctrlr"

	constructor(private _location: Location,
		    private _router: Router,
		    private _route: ActivatedRoute,
		    private _milestonesService: MilestonesService,
			private _functionPromiseService: FunctionPromiseService) {

	}

	ngOnInit() {
		let self = this;
		self._route.params.subscribe((params) => {
			self.milestoneId = params['milestoneId'];

			self._milestonesService.getMilestoneById(self.milestoneId).then((milestone) => {
				self.milestone = milestone;
			})

			self._functionPromiseService.initFunc(self.funcKey, () => {
				return new Promise((resolve, reject) => {
						resolve({
							getEnv: () => {
								return environment;
							},
							milestoneProviderFunction: () => {
								return self.milestone;
							},
							onLabourNameClick: (o) => {
								this._router.navigate(['/labours/display/' + o['id']]);							
							}
						})
					})
				})
		})
	}

	getCareerGoalPathComponentController() {
		return this._functionPromiseService.waitAndGet(this.funcKey, this.funcKey, { });
	}

	onEditMilestoneBtnClick() {
		this._router.navigate(['/milestones/edit/' + this.milestoneId]);
	}

	onBackBtnClick() {
		this._location.back();
	}
}
