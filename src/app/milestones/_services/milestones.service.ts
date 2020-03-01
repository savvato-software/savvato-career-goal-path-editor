import { Injectable } from '@angular/core';
import { ApiService } from '../../_services/api.service'

import { environment } from '../../../_environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MilestonesService {

	constructor(private _apiService: ApiService) { 

	}

	getMilestoneById(id) {
      let url = environment.apiUrl + "/api/milestone/" + id;

      let rtn = new Promise(
        (resolve, reject) => {
        this._apiService.getUnsecuredAPI(url).subscribe(
          (data) => {
            console.log("Call to getMilestoneById(" + id + ") returned")
            console.log(data)
            resolve(data);
          }, (err) => {
            reject(err);
          });
        }
      );

      return rtn;
  }

	getAllMilestones() {
      let url = environment.apiUrl + "/api/milestone/"

      let rtn = new Promise(
        (resolve, reject) => {
        this._apiService.getUnsecuredAPI(url).subscribe(
          (data) => {
            console.log("Call to getAllMilestones() returned")
            console.log(data)
            resolve(data);
          }, (err) => {
            reject(err);
          });
        }
      );

      return rtn;
  }
}
