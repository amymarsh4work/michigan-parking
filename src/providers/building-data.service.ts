import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Building } from './building.model';


@Injectable()
export class BuildingDataService {

  private buildingUrl = 'build/1008067.json';

  constructor(private http: Http) {}

  getBuilding():Observable<Building[]> {
    console.log(this.buildingUrl);
    //noinspection TypeScriptUnresolvedFunction,TypeScriptUnresolvedVariable
    return this.http
        .get(this.buildingUrl)
        .map(this.extractBuilding)
        .catch(this.handleError);
  }

  private extractBuilding(res: Response) {
    //noinspection TypeScriptUnresolvedFunction
    let body = res.json();
      console.log(body);
    return body.Buildings || {};
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
