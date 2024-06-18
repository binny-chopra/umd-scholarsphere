import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AllApisService } from '../../services/all-apis.service';
import { ApplicationConstants } from '../../../assets/constants/application-constants';
import { CommonModule } from '@angular/common';
import { IStudentApplicants } from '../../interfaces/i-student-applicants';
import { ISponsorshipDetails } from '../../interfaces/i-sponsorship-details';
import { SingleSponsorComponent } from '../single-sponsor/single-sponsor.component';
import { UtilService } from '../../services/util.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'student-applicants',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    SingleSponsorComponent,
  ],
  templateUrl: './student-applicants.component.html',
  styleUrl: './student-applicants.component.scss',
})
export class StudentApplicantsComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  public showSponsorDetails: boolean = false;
  public filterLbl: string = ApplicationConstants.FILTER;
  public filterExLbl: string = ApplicationConstants.FILTER_EX;
  public closeLbl: string = ApplicationConstants.CLOSE;
  public UIDLbl: string = ApplicationConstants.UID;
  public studentNameLbl: string = ApplicationConstants.STUDENT_NAME;
  public studentEmailLbl: string = ApplicationConstants.EMAIL;
  public gradDateLbl: string = ApplicationConstants.GRAD_DATE;
  public majorLbl: string = ApplicationConstants.MAJOR;
  public gpaLbl: string = ApplicationConstants.GPA;
  public stateLbl: string = ApplicationConstants.STATE;
  public countyLbl: string = ApplicationConstants.COUNTY;
  public majorityClassesLbl: string = ApplicationConstants.MAJORITY_CLASSES;
  public noDataFilterLbl: string = ApplicationConstants.FILTER_NO_DATA;
  public displayedColumns: string[] = Object.values(
    ApplicationConstants.STUDENT_APPLICANT_DETAILS
  );
  public displayedColumnIds = ApplicationConstants.STUDENT_APPLICANT_DETAILS;
  public dataSource!: MatTableDataSource<IStudentApplicants>;
  public selectedSponsor!: ISponsorshipDetails | undefined;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private utilService: UtilService,
    private apiService: AllApisService
  ) {}

  public ngOnInit(): void {
    this.dataSourceForUiFn([]);
    this.apiService
      .studentApplicantsApi()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: IStudentApplicants[]) => {
          if (
            this.utilService.url.includes('scholarship/') &&
            this.utilService.url.split('/').pop()
          ) {
            this.utilService.filteredStudentsForSponsor.subscribe(
              (filteredResponse: IStudentApplicants[]) => {
                this.dataSourceForUiFn(filteredResponse);
                this.showSponsorDetails = true;
              }
            );
          } else {
            this.dataSourceForUiFn(response);
            this.showSponsorDetails = false;
          }
        },
        error: (error) => {
          console.error(
            'Error fetching studentApplicantsApi in StudentApplicantsComponent:',
            error
          );
        },
      });
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();

    this.dataSource.filterPredicate = (
      data: IStudentApplicants,
      filter: string
    ) => {
      const searchText = filter.toLowerCase();
      const columnsToFilter = [
        this.displayedColumnIds.STUDENT_ID,
        this.displayedColumnIds.STUDENT_NAME,
        this.displayedColumnIds.STUDENT_EMAIL,
        this.displayedColumnIds.STUDENT_MAJOR,
        this.displayedColumnIds.GRAD_DATE,
        this.displayedColumnIds.GPA,
        this.displayedColumnIds.STATE,
        this.displayedColumnIds.COUNTY,
        this.displayedColumnIds.MAJORITY_CLASSES,
      ];

      // Check if any of the columns contain the search text
      return columnsToFilter.some((column) => {
        const columnValue = column
          .split('.')
          .reduce((obj, key) => (obj as any)?.[key], data) as any;
        if (columnValue === undefined || columnValue === null) {
          return false;
        }

        if (typeof columnValue === ApplicationConstants.NUMBER) {
          return columnValue.toString().includes(searchText);
        }

        if (Array.isArray(columnValue)) {
          return columnValue.some(
            (item) =>
              typeof item === ApplicationConstants.STRING &&
              item.toLowerCase().includes(searchText)
          );
        }

        if (typeof columnValue === ApplicationConstants.STRING) {
          return columnValue.toLowerCase().includes(searchText);
        }
        return false;
      });
    };

    this.dataSource.filter = filterValue;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private dataSourceForUiFn(ds: IStudentApplicants[]): void {
    this.dataSource = new MatTableDataSource(ds);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
