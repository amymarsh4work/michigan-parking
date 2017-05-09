import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

import { Parking } from './parking.model';

@Injectable()
export class ParkingService {

  private readonly parkingUrl: string = 'assets/data/';

  constructor(public http: Http) {
    console.log('Hello Data Provider');
  }

  getParkingDetails(name:string):Observable<Parking> {

    return this.getLots()
        .map(lots => lots.filter(lot => lot.name === name)[0]);
  }

  /*getEpic(id:string): Observable<Epic> {
    return this.getEpics()
        .map(epics => epics.filter(epic => epic.id === id)[0]);
  }*/

  getLots():Observable<Parking[]> {
    return this.http
        .get(this.parkingUrl + 'parking-central.json')
        .map(this.extractParking)
        .catch(this.handleError);
  }

  private extractParking(res: Response) {
    let body = res.json();
    let resultsArr = [];
    console.log(body);
    //resultsArr.push(body);
    for (let key in body) {
      console.log(body[key]);
      resultsArr.push(body[key]);
    }
    return resultsArr;
  }

  public extractData(res:Response) {
    let body = res.json();
    let resultsArr = [];

    for (let key in body) {
      resultsArr.push({key: key, details: body[key]});
    }

    return resultsArr;
  }

  private handleError(error:any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
