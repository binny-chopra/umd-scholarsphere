import { Component, OnDestroy, OnInit } from '@angular/core';
import { ISponsorshipDetails } from '../../interfaces/i-sponsorship-details';
import { UtilService } from '../../services/util.service';
import { IStudentApplicants } from '../../interfaces/i-student-applicants';
import { AllApisService } from '../../services/all-apis.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'single-sponsor',
  standalone: true,
  imports: [],
  templateUrl: './single-sponsor.component.html',
  styleUrl: './single-sponsor.component.scss',
})
export class SingleSponsorComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  private sponsorDetailsRes!: ISponsorshipDetails[];
  public selectedSponsor!: ISponsorshipDetails | undefined;

  constructor(
    private apiService: AllApisService,
    private utilService: UtilService
  ) {}

  public ngOnInit(): void {
    this.apiService
      .sponsorsDetailsApi()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (sponsorResponse: ISponsorshipDetails[]) => {
          this.sponsorDetailsRes = sponsorResponse;
          this.apiService
            .studentApplicantsApi()
            .pipe(takeUntil(this.destroy$))
            .subscribe({
              next: (studentResponse: IStudentApplicants[]) => {
                this.sponsorDetailsRes = sponsorResponse;
                if (this.sponsorDetailsRes?.length > 0) {
                  const scholarshipId: string =
                    this.utilService.url.split('/').pop() ?? '';
                  if (scholarshipId)
                    this.filteredStudentsFn(studentResponse, scholarshipId);
                  this.selectedSponsor = this.sponsorDetailsRes.find(
                    (sponsor: ISponsorshipDetails) =>
                      sponsor.scholarshipId === scholarshipId
                  );
                }
              },
              error: (error) => {
                console.error(
                  'Error fetching studentApplicantsApi in SingleSponsorComponent:',
                  error
                );
              },
            });
        },
        error: (error) => {
          console.error(
            'Error fetching sponsorsDetailsApi in SingleSponsorComponent:',
            error
          );
        },
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private filteredStudentsFn(
    studentApplicants: IStudentApplicants[],
    scholarshipId: string
  ) {
    let currentScholarship: ISponsorshipDetails | undefined =
      this.sponsorDetailsRes.find(
        (sponsor: ISponsorshipDetails) =>
          sponsor.scholarshipId === scholarshipId
      );

    if (!currentScholarship || !currentScholarship.criteria) {
      return;
    }

    const { level, major, gpa, state, county } = currentScholarship?.criteria;
    const filteredStudentApplicants: IStudentApplicants[] =
      studentApplicants.filter((student) => {
        const matchesLevel = level.includes(student.majorityClasses);
        const matchesMajor = major.includes(student.studentMajor);
        const matchesGPA = parseFloat(student.gpa) >= parseFloat(gpa);
        const matchesState = student.state === state;
        const matchesCounty = county ? county.includes(student.county) : true;
        return matchesState;
      });
    if (filteredStudentApplicants?.length > 0) {
      this.utilService.filteredStudentsForSponsor.next(
        filteredStudentApplicants
      );
    }
  }
}
