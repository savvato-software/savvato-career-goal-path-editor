import { Injectable } from '@angular/core';
import { JWTApiService } from '@savvato-software/savvato-javascript-services';

import { environment } from '../../_environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

	constructor(private _apiService: JWTApiService) {

	}

  getAllQuestions() {
    let url = environment.apiUrl + "/api/question/all"

    let rtn = new Promise(
      (resolve, reject) => {
      this._apiService.getUnsecuredAPI(url).subscribe(
        (data: any) => {
          resolve(data);
        }, (err: any) => {
          reject(err);
        });
      }
    );

    return rtn;
  }

  getLineItemLevelAssociations(questionId: number) {
    let url = environment.apiUrl + "/api/question/" + questionId + "/lineitem/levels";

    let rtn = new Promise(
      (resolve, reject) => {
      this._apiService.getUnsecuredAPI(url).subscribe(
        (data: any) => {
          resolve(data);
        }, (err: any) => {
          reject(err);
        });
      }
    );

    return rtn;
  }

  setLineItemLevelAssociations(questionId: number, lilvassociations: any) {
    let url = environment.apiUrl + "/api/question/" + questionId + "/lineitem/levels";

    // let data = '';
    //
    // for (var x=0; x < lilvassociations.length; x++) {
    //   if (x > 0) data += '&';
    //
    //   data += 'liId' + x + '=' + lilvassociations[x][0] + '&liVal' + x + '=' + lilvassociations[x][1];
    // }
    //
    // if (data.length > 0)
    //   data += '&count=' + lilvassociations.length;

    // @ts-ignore
    let data = lilvassociations.map(([liId, liValue]) => ({ liId, liValue }));

    let rtn = new Promise(
      (resolve, reject) => {
      this._apiService.postUnsecuredAPI_w_body(url, data).subscribe(
        (data: any) => {
          resolve(data);
        }, (err: any) => {
          reject(err);
        });
      }
    );

    return rtn;
  }

  getQuestionById(id: number) {
      let url = environment.apiUrl + "/api/question/" + id;

      let rtn = new Promise(
        (resolve, reject) => {
        this._apiService.getUnsecuredAPI(url).subscribe(
          (data: any) => {
            console.log("Call to getQuestionById(" + id + ") returned")
            console.log(data)
            resolve(data);
          }, (err: any) => {
            reject(err);
          });
        }
      );

      return rtn;
  }

  getByTopic(topicId: number) {
      let url = environment.apiUrl + "/api/techprofile/topic/" + topicId + "/questions";

      let rtn = new Promise(
        (resolve, reject) => {
        this._apiService.getUnsecuredAPI(url).subscribe(
          (data: any) => {
            resolve(data);
          }, (err: any) => {
            reject(err);
          });
        }
      );

      return rtn;
  }

  getByLineItem(lineItemId: number) {
      let url = environment.apiUrl + "/api/techprofile/lineitem/" + lineItemId + "/questions";

      let rtn = new Promise(
        (resolve, reject) => {
        this._apiService.getUnsecuredAPI(url).subscribe(
          (data: any) => {
            resolve(data);
          }, (err: any) => {
            reject(err);
          });
        }
      );

      return rtn;
  }

  getByLineItemAndLevel(lineItemId: number, levelIdx: number) {
      // TODO: Change this to api/techprofile/lineitem/ID/level/ID/questions
      let url = environment.apiUrl + "/api/question/" + lineItemId + "/" + levelIdx;

      let rtn = new Promise(
        (resolve, reject) => {
        this._apiService.getUnsecuredAPI(url).subscribe(
          (data: any) => {
            resolve(data);
          }, (err: any) => {
            reject(err);
          });
        }
      );

      return rtn;
  }

	getUserHistoryForQuestion(userId: number, questionId: number) {
      let url = environment.apiUrl + "/api/user/" + userId + "/question/" + questionId + "/history";

      let rtn = new Promise(
        (resolve, reject) => {
        this._apiService.getUnsecuredAPI(url).subscribe(
          (data: any) => {
            resolve(data);
          }, (err: any) => {
            reject(err);
          });
        }
      );

      return rtn;
	}

  setSessionScore(userId: number, questionId: number, sessionId: number, dataObj: any) {
      let url = environment.apiUrl + "/api/user/" + userId + "/question/" + questionId + "/history";
      // let data = "sessionId=" + sessionId + "&score=" + dataObj["score"];
      //
      // if (dataObj["comment"])
      //   data += "&comment=" + dataObj["comment"];

      let data = {sessionId: sessionId, score: dataObj["score"], comment: dataObj["comment"]};

      let rtn = new Promise(
        (resolve, reject) => {
        this._apiService.postUnsecuredAPI_w_body(url, data).subscribe(
          (data: any) => {
            console.log("Question Session Score Updated!");
            console.log(data);

            resolve(data);
          }, (err: any) => {
            reject(err);
          });
      });

      return rtn;
  }

  save(question: any, lilvassociations: any) {
    let url = environment.apiUrl + "/api/question/save";

    return new Promise(
      (resolve, reject) => {
        this._apiService.postUnsecuredAPI_w_body(url, {question: question, lilvassociations: lilvassociations}).subscribe(
          (data: any) => {
            resolve(data)
          }, (err: any) => {
            reject(err)
          });
      });
  }

}
