import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ISponsorshipDetails } from '../interfaces/i-sponsorship-details';
import { IScholarDetails } from '../interfaces/i-scholar-details';
import { IStudentApplicants } from '../interfaces/i-student-applicants';

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

  studentApplicantsApi(): Observable<IStudentApplicants[]> {
    return this.http
      .get<{ payload: IStudentApplicants[] }>('http://127.0.0.1:5000/students')
      .pipe(map((response) => response.payload));
  }
}
