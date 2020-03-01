import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { LabourService } from './_services/labour.service'

@Component({
  selector: 'app-labours',
  templateUrl: './labours.page.html',
  styleUrls: ['./labours.page.scss'],
})
export class LaboursPage implements OnInit {

	labours = undefined;

	constructor(private _location: Location,
		    private _router: Router,
		    private _route: ActivatedRoute,
		    private _labourService: LabourService) {

	}

  ngOnInit() {
	let self = this;
	self._route.params.subscribe((params) => {
		self._labourService.getAllLabours().then((labours) => {
			self.labours = labours;
		})
	})
  }

  getAllLabours() {
  	return this.labours;
  }
}
