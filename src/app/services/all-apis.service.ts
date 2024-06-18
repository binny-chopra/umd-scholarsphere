import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, shareReplay } from 'rxjs';
import { ISponsorshipDetails } from '../interfaces/i-sponsorship-details';
import { IScholarDetails } from '../interfaces/i-scholar-details';
import { IStudentApplicants } from '../interfaces/i-student-applicants';

@Injectable({
  providedIn: 'root',
})
export class AllApisService {
  private hostUrl: string = 'http://127.0.0.1:5000';
  private studentsApplicantsCache!: Observable<IStudentApplicants[]>;
  private scholarDetailsCache!: Observable<IScholarDetails[]>;
  private sponsorDetailsCache!: Observable<ISponsorshipDetails[]>;
  constructor(private http: HttpClient) {}

  sponsorDetailsApi(): Observable<ISponsorshipDetails[]> {
    if (!this.sponsorDetailsCache) {
      this.sponsorDetailsCache = this.http
        .get<ISponsorshipDetails[]>(`/assets/mock-data/listOfSponsors.json`)
        .pipe(shareReplay(1))
        .pipe(map((response) => response));
    }
    return this.sponsorDetailsCache;
  }

  scholarDetailsApi(): Observable<IScholarDetails[]> {
    if (!this.scholarDetailsCache) {
      this.scholarDetailsCache = this.http
        .get<IScholarDetails[]>(`/assets/mock-data/listOfScholars.json`)
        .pipe(shareReplay(1))
        .pipe(map((response) => response));
    }
    return this.scholarDetailsCache;
  }

  studentApplicantsApi(): Observable<IStudentApplicants[]> {
    if (!this.studentsApplicantsCache) {
      this.studentsApplicantsCache = this.http
        .get<{ payload: IStudentApplicants[] }>(`${this.hostUrl}/students`)
        .pipe(shareReplay(1))
        .pipe(map((response) => response.payload));
    }
    return this.studentsApplicantsCache;
  }
}
