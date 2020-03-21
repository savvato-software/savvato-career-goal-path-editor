import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { LaboursService } from '../_services/labours.service'

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
		    private _laboursService: LaboursService) {

	}

  ngOnInit() {
	let self = this;
	self._route.params.subscribe((params) => {
		self._laboursService.getAllLabours().then((labours: [{}]) => {
			self.labours = labours.sort((a,b) => { return a['name'].localeCompare(b['name']); });
		})
	})
  }

  getAllLabours() {
  	return this.labours;
  }

  onLabourClick(l) {
	this._router.navigate(['/labours/display/' + l['id']]);
  }

}
