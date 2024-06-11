import { Injectable } from '@angular/core';
import { ISponsorshipDetails } from '../interfaces/i-sponsorship-details';
import { BehaviorSubject, Observable } from 'rxjs';
import { AllApisService } from './all-apis.service';

@Injectable({
  providedIn: 'root',
})
export class CommonResService {
  public sponsorDetailsRes!: ISponsorshipDetails[];
  constructor(private allApiService: AllApisService) {}

  private sponsorDetailsSubject = new BehaviorSubject<ISponsorshipDetails[]>(
    []
  );

  getSponsorDetails(): Observable<ISponsorshipDetails[]> {
    return this.sponsorDetailsSubject.asObservable();
  }

  sponsorDetailsApi() {
    this.allApiService
      .sponsorDetailsApi()
      .subscribe((response: ISponsorshipDetails[]) => {
        this.sponsorDetailsSubject.next(response);
      });
  }
}
