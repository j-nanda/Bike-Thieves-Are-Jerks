import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private _lat = new BehaviorSubject('');
  private _long = new BehaviorSubject('');

  constructor() { }

  setLat(value: string) {
    this._lat.next(value);
  }

  setLong(value: string) {
    this._long.next(value);
  }

  getLat() {
    return this._lat.asObservable();
  }

  getLong() {
    return this._long.asObservable();
  }
}