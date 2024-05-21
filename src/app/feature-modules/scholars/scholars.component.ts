import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AllApisService } from '../../services/all-apis.service';
import { ApplicationConstants } from '../../../assets/constants/application-constants';
import { CommonModule } from '@angular/common';
import { IScholarDetails } from '../../interfaces/i-scholar-details';
import { NewScholarComponent } from '../new-scholar/new-scholar.component';

@Component({
  selector: 'app-scholars',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    NewScholarComponent,
  ],
  templateUrl: './scholars.component.html',
  styleUrl: './scholars.component.scss',
})
export class ScholarsComponent implements OnInit {
  public addNewScholarFlag: boolean = false;
  public filterLbl: string = ApplicationConstants.FILTER;
  public filterExLbl: string = ApplicationConstants.FILTER_EX;
  public closeLbl: string = ApplicationConstants.CLOSE;
  public addNewScholarLbl: string = ApplicationConstants.ADD_NEW_SCHOLAR;
  public UIDLbl: string = ApplicationConstants.UID;
  public studentNameLbl: string = ApplicationConstants.STUDENT_NAME;
  public scholarshipIdLbl: string = ApplicationConstants.SCHOLARSHIP_ID;
  public scholarshipNameLbl: string = ApplicationConstants.SCHOLARSHIP_NAME;
  public rewardAmountLbl: string = ApplicationConstants.REWARD_AMOUNT;
  public renewableLbl: string = ApplicationConstants.RENEWABLE;
  public timelineLbl: string = ApplicationConstants.TIMELINE;
  public majorLbl: string = ApplicationConstants.MAJOR;
  public gpaLbl: string = ApplicationConstants.GPA;
  public needOrMeritLbl: string = ApplicationConstants.NEED_OR_MERIT;
  public stateLbl: string = ApplicationConstants.STATE;
  public countyLbl: string = ApplicationConstants.COUNTY;
  public noDataFilterLbl: string = ApplicationConstants.FILTER_NO_DATA;
  public displayedColumns: string[] = Object.values(
    ApplicationConstants.SCHOLAR_DETAILS
  );
  public displayedColumnIds = ApplicationConstants.SCHOLAR_DETAILS;
  public dataSource!: MatTableDataSource<IScholarDetails>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private allApiService: AllApisService) {}

  ngOnInit(): void {
    this.allApiService
      .scholarDetailsApi()
      .subscribe((response: IScholarDetails[]) => {
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();

    this.dataSource.filterPredicate = (
      data: IScholarDetails,
      filter: string
    ) => {
      const searchText = filter.toLowerCase();
      const columnsToFilter = [
        this.displayedColumnIds.STUDENT_ID,
        this.displayedColumnIds.STUDENT_NAME,
        this.displayedColumnIds.SCHOLARSHIP_ID,
        this.displayedColumnIds.SCHOLARSHIP_NAME,
        this.displayedColumnIds.REWARD_AMOUNT,
        this.displayedColumnIds.RENEWABLE,
        this.displayedColumnIds.TIMELINE,
        ...Object.values(ApplicationConstants.SCHOLAR_CRITERIA),
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

  currencyFormat(amountValue: number): string {
    if (!amountValue || isNaN(amountValue)) {
      return amountValue.toString();
    }
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amountValue);
  }
}
