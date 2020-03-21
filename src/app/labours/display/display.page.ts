import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { FunctionPromiseService } from '@savvato-software/savvato-javascript-services';
import { LaboursService } from '../../_services/labours.service'

import { environment } from '../../../_environments/environment';

@Component({
  selector: 'app-display',
  templateUrl: './display.page.html',
  styleUrls: ['./display.page.scss'],
})
export class DisplayPage implements OnInit {

	labour = undefined;
	labourId = undefined;

	funcKey = "laboursDisplay-careerPath-comp-ctrlr"

	constructor(private _location: Location,
		    private _router: Router,
		    private _route: ActivatedRoute,
		    private _laboursService: LaboursService,
		    private _functionPromiseService: FunctionPromiseService) {

	}

	ngOnInit() {
		let self = this;
		self._route.params.subscribe((params) => {
			self.labourId = params['labourId'];

			self._laboursService.getLabourById(self.labourId).then((labour) => {
				self.labour = labour;
			})

			self._functionPromiseService.initFunc(self.funcKey, () => {
				return new Promise((resolve, reject) => {
						resolve({
							getEnv: () => {
								return environment;
							},
							labourProviderFunction: () => {
								return self.labour;
							}
						})
					})
				})
		})
	}

	getCareerGoalPathComponentController() {
		return this._functionPromiseService.waitAndGet(this.funcKey, this.funcKey, { });
	}

	onEditLabourBtnClick() {
		this._router.navigate(['/labours/edit/' + this.labourId]);
	}

	onBackBtnClick() {
		this._location.back();
	}
}
