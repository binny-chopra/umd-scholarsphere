import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, shareReplay } from 'rxjs';
import { ISponsorshipDetails } from '../interfaces/i-sponsorship-details';
import { IScholarDetails } from '../interfaces/i-scholar-details';
import { IStudentApplicants } from '../interfaces/i-student-applicants';
import { ApplicationConstants } from '../../assets/constants/application-constants';

@Injectable({
  providedIn: 'root',
})
export class AllApisService {
  private hostUrl: string = ApplicationConstants.HOST_URL;
  private studentsApplicantsCache!: Observable<IStudentApplicants[]>;
  private scholarDetailsCache!: Observable<IScholarDetails[]>;
  private sponsorDetailsCache!: Observable<ISponsorshipDetails[]>;
  constructor(private http: HttpClient) { }

  sponsorsDetailsApi(): Observable<ISponsorshipDetails[]> {
    if (!this.sponsorDetailsCache) {
      this.sponsorDetailsCache = this.http
        .get<{ payload: ISponsorshipDetails[] }>(`${this.hostUrl}/sponsors`)
        .pipe(shareReplay(1))
        .pipe(map((response) => response.payload));
    }
    return this.sponsorDetailsCache;
  }

  addNewSponsorApi(sponsorDetails: ISponsorshipDetails): Observable<ISponsorshipDetails> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<{ payload: ISponsorshipDetails }>(`${this.hostUrl}/sponsors/new`, sponsorDetails, { headers })
      .pipe(map(response => response.payload));
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
