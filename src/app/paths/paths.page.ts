import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { PathsService } from './_services/paths.service'

@Component({
  selector: 'app-paths',
  templateUrl: './paths.page.html',
  styleUrls: ['./paths.page.scss'],
})
export class PathsPage implements OnInit {

	paths = undefined;

	constructor(private _location: Location,
		    private _router: Router,
		    private _route: ActivatedRoute,
		    private _pathService: PathsService) {

	}

  ngOnInit() {
	let self = this;
	self._route.params.subscribe((params) => {
		self._pathService.getAllPaths().then((paths) => {
			self.paths = paths;
		})
	})
  }

  getAllPaths() {
  	return this.paths;
  }
}
