import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { FunctionPromiseService } from '@savvato-software/savvato-javascript-services';
import { PathsService } from '../../_services/paths.service'

import { environment } from '../../../_environments/environment';

@Component({
  selector: 'app-display',
  templateUrl: './display.page.html',
  styleUrls: ['./display.page.scss'],
})
export class DisplayPage implements OnInit {

	path = undefined;
	pathId = undefined;

	funcKey = "pathsDisplayCtrlr";

	constructor(private _location: Location,
			    private _router: Router,
			    private _route: ActivatedRoute,
			    private _pathsService: PathsService,
			    private _functionPromiseService: FunctionPromiseService) {

	}

	ngOnInit() {
		let self = this;
		self._route.params.subscribe((params) => {
			self.pathId = params['pathId'];

			self._pathsService.getPathById(self.pathId).then((path) => {
				self.path = path;
			})

			self._functionPromiseService.initFunc(self.funcKey, () => {
				return new Promise((resolve, reject) => {
						resolve({
							getEnv: () => {
								return environment;
							},
							pathProviderFunction: () => {
								return self.path;
							},
							onMilestoneNameClick: (o) => {
								this._router.navigate(['/milestones/display/' + o['id']]);
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

	getPath() {
		return [this.path];
	}

	getPathName() {
		return this.path && this.path['name']
	}

	getPathMilestones() {
		return this.path && this.path['milestones'];
	}

	onEditPathBtnClick() {
		this._router.navigate(['/paths/edit/' + this.pathId]);
	}

	onBackBtnClick() {
		this._location.back();
	}
}
