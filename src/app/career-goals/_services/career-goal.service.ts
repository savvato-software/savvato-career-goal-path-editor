import { Injectable } from '@angular/core';
import { ApiService } from '../../_services/api.service'

import { environment } from '../../../_environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CareerGoalService {

	constructor(private _apiService: ApiService) { 

	}

	getCareerGoalById(id) {
      let url = environment.apiUrl + "/api/careergoal/" + id;

      let rtn = new Promise(
        (resolve, reject) => {
        this._apiService.getUnsecuredAPI(url).subscribe(
          (data) => {
            console.log("Call to getCareerGoalById(" + id + ") returned")
            console.log(data)
            resolve(data);
          }, (err) => {
            reject(err);
          });
        }
      );

      return rtn;
  }

	getAllCareerGoals() {
      let url = environment.apiUrl + "/api/careergoal/"

      let rtn = new Promise(
        (resolve, reject) => {
        this._apiService.getUnsecuredAPI(url).subscribe(
          (data) => {
            console.log("Call to getAllCareerGoals() returned")
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
