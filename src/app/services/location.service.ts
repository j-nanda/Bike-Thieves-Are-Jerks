import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private backendUrl = 'http://localhost:3000'; // URL to web API

  constructor(private http: HttpClient) {}

  getLatestLocation(): Observable<any> {
    return this.http.get(`${this.backendUrl}/latest-location`);
  }
}
