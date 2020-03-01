import { Injectable } from '@angular/core';
import { ApiService } from '../../_services/api.service'

import { environment } from '../../../_environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LabourService {

	constructor(private _apiService: ApiService) { 

	}

	getLabourById(id) {
      let url = environment.apiUrl + "/api/labour/" + id;

      let rtn = new Promise(
        (resolve, reject) => {
        this._apiService.getUnsecuredAPI(url).subscribe(
          (data) => {
            console.log("Call to getLabourById(" + id + ") returned")
            console.log(data)
            resolve(data);
          }, (err) => {
            reject(err);
          });
        }
      );

      return rtn;
  }

	getAllLabours() {
      let url = environment.apiUrl + "/api/labour/"

      let rtn = new Promise(
        (resolve, reject) => {
        this._apiService.getUnsecuredAPI(url).subscribe(
          (data) => {
            console.log("Call to getAllLabours() returned")
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
