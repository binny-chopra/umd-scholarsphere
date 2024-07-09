import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, MatSortable } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AllApisService } from '../../services/all-apis.service';
import { ApplicationConstants } from '../../../assets/constants/application-constants';
import { CommonModule, DatePipe } from '@angular/common';
import { IStudentApplicants } from '../../interfaces/i-student-applicants';
import { ISponsorshipDetails } from '../../interfaces/i-sponsorship-details';
import { SingleSponsorComponent } from '../single-sponsor/single-sponsor.component';
import { UtilService } from '../../services/util.service';
import { Subject, takeUntil } from 'rxjs';
import { IColDef } from '../../interfaces/i-common';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

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
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
  styleUrl: './student-applicants.component.scss',
  providers: [DatePipe],
})
export class StudentApplicantsComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  private destroy$ = new Subject<void>();
  public showSponsorDetails: boolean = false;
  public filterLbl: string = ApplicationConstants.FILTER;
  public filterExLbl: string = ApplicationConstants.FILTER_EX;
  public closeLbl: string = ApplicationConstants.CLOSE;
  public noDataFilterLbl: string = ApplicationConstants.FILTER_NO_DATA;
  public displayedColumns: string[] = Object.values(
    ApplicationConstants.STUDENT_APPLICANT_DETAILS
  );
  public displayedColumnIds = ApplicationConstants.STUDENT_APPLICANT_DETAILS;
  public dataSource!: MatTableDataSource<IStudentApplicants>;
  public selectedSponsor!: ISponsorshipDetails | undefined;
  public colDef: IColDef[] = [
    {
      id: ApplicationConstants.STUDENT_APPLICANT_DETAILS.STUDENT_ID,
      label: ApplicationConstants.UID,
    },
    {
      id: ApplicationConstants.STUDENT_APPLICANT_DETAILS.STUDENT_NAME,
      label: ApplicationConstants.STUDENT_NAME,
    },
    {
      id: ApplicationConstants.STUDENT_APPLICANT_DETAILS.STUDENT_EMAIL,
      label: ApplicationConstants.EMAIL,
    },
    {
      id: ApplicationConstants.STUDENT_APPLICANT_DETAILS.STUDENT_MAJOR,
      label: ApplicationConstants.MAJOR,
    },
    {
      id: ApplicationConstants.STUDENT_APPLICANT_DETAILS.GPA,
      label: ApplicationConstants.GPA,
    },
    {
      id: ApplicationConstants.STUDENT_APPLICANT_DETAILS.GRAD_DATE,
      label: ApplicationConstants.GRAD_DATE,
    },
    {
      id: ApplicationConstants.STUDENT_APPLICANT_DETAILS.MAJORITY_CLASSES,
      label: ApplicationConstants.MAJORITY_CLASSES,
    },
    {
      id: ApplicationConstants.STUDENT_APPLICANT_DETAILS.STATE,
      label: ApplicationConstants.STATE,
    },
    {
      id: ApplicationConstants.STUDENT_APPLICANT_DETAILS.COUNTY,
      label: ApplicationConstants.COUNTY,
    },
    {
      id: ApplicationConstants.STUDENT_APPLICANT_DETAILS.TIMESTAMP,
      label: ApplicationConstants.APP_DATE,
    },
  ];
  public quesForCandidate: { [key: string]: string }[] =
    ApplicationConstants.QUES_FOR_CANDIDATE;
  public expandedElement!: IStudentApplicants | null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private utilService: UtilService,
    private apiService: AllApisService,
    private datePipe: DatePipe
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

  public ngAfterViewInit(): void {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  trackById(item: any): string {
    return item.id;
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
      const columnsToFilter = this.colDef.map((col) => col.id);

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

    this.dataSource.sortingDataAccessor = (item: IStudentApplicants, property) => {
      switch (property) {
        case 'timestamp':
          return new Date(item.timestamp);
        default:
          return (item as any)[property];
      }
    };

    // Sort by timestamp ascending by default
    if (this.dataSource.sort) {
      this.dataSource.sort.direction = 'asc';
      this.dataSource.sort.active = 'timestamp';
    }
  }


  formatTimestamp(timestamp: string): string {
    const dateObj = new Date(timestamp.replace(' AST', ' GMT-4'));
    return this.datePipe.transform(dateObj, 'MMM - dd - yyyy, HH:mm:ss') ?? '';
  }
}
