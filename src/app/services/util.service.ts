import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IStudentApplicants } from '../interfaces/i-student-applicants';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  public url: string = window.location.href;
  public filteredStudentsForSponsor = new BehaviorSubject<IStudentApplicants[]>(
    []
  );

  constructor() {}
}
