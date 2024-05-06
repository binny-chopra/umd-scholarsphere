import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ISponsorshipDetails } from '../interfaces/i-sponsorship-details';
import { IScholarDetails } from '../interfaces/i-scholar-details';

@Injectable({
  providedIn: 'root',
})
export class AllApisService {
  constructor(private http: HttpClient) {}

  sponsorDetailsApi(): Observable<ISponsorshipDetails[]> {
    return this.http.get<ISponsorshipDetails[]>(
      '/assets/mock-data/listOfSponsors.json'
    );
  }

  scholarDetailsApi(): Observable<IScholarDetails[]> {
    return this.http.get<IScholarDetails[]>(
      '/assets/mock-data/listOfScholars.json'
    );
  }
}
