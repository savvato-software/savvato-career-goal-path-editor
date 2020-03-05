import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { LaboursService } from '../../_services/labours.service'

@Component({
  selector: 'app-display',
  templateUrl: './display.page.html',
  styleUrls: ['./display.page.scss'],
})
export class DisplayPage implements OnInit {

	labour = undefined;
	labourId = undefined;

	constructor(private _location: Location,
		    private _router: Router,
		    private _route: ActivatedRoute,
		    private _laboursService: LaboursService) {

	}

	ngOnInit() {
		let self = this;
		self._route.params.subscribe((params) => {
			self.labourId = params['labourId'];

			self._laboursService.getLabourById(self.labourId).then((labour) => {
				self.labour = labour;
			})
		})
	}

	getLabour() {
		return this.labour;
	}

	getLabourName() {
		return this.labour && this.labour['name']
	}

	getQuestions() {
		return this.labour && this.labour['questions'];
	}

	onEditLabourBtnClick() {
		this._router.navigate(['/labours/edit/' + this.labourId]);
	}
}
