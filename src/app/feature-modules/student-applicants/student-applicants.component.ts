import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AllApisService } from '../../services/all-apis.service';
import { ApplicationConstants } from '../../../assets/constants/application-constants';
import { CommonModule } from '@angular/common';
import { IStudentApplicants } from '../../interfaces/i-student-applicants';

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
  ],
  templateUrl: './student-applicants.component.html',
  styleUrl: './student-applicants.component.scss',
})
export class StudentApplicantsComponent implements OnInit {
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

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private allApiService: AllApisService) {}

  ngOnInit(): void {
    this.allApiService.studentApplicantsApi().subscribe({
      next: (response: IStudentApplicants[]) => {
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (error) => {
        console.error('Error fetching student applicants:', error);
      },
    });
  }

  applyFilter(event: Event) {
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
}
