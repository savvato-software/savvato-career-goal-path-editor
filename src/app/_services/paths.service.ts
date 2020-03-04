import { Injectable } from '@angular/core';
import { ApiService } from './api.service'

import { environment } from '../../_environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PathsService {

	constructor(private _apiService: ApiService) { 

	}

	getPathById(id) {
      let url = environment.apiUrl + "/api/path/" + id;

      let rtn = new Promise(
        (resolve, reject) => {
        this._apiService.getUnsecuredAPI(url).subscribe(
          (data) => {
            console.log("Call to getPathById(" + id + ") returned")
            console.log(data)
            resolve(data);
          }, (err) => {
            reject(err);
          });
        }
      );

      return rtn;
  	}

	getAllPaths() {
      let url = environment.apiUrl + "/api/path/"

      let rtn = new Promise(
        (resolve, reject) => {
        this._apiService.getUnsecuredAPI(url).subscribe(
          (data) => {
            console.log("Call to getAllPaths() returned")
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
