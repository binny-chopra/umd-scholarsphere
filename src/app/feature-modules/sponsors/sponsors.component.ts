import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ISponsorshipDetails } from '../../interfaces/i-sponsorship-details';
import { ApplicationConstants } from '../../../assets/constants/application-constants';
import { CommonModule } from '@angular/common';
import { NewSponsorComponent } from '../new-sponsor/new-sponsor.component';
import { AllApisService } from '../../services/all-apis.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-sponsors',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    NewSponsorComponent,
  ],
  templateUrl: './sponsors.component.html',
  styleUrl: './sponsors.component.scss',
})
export class SponsorsComponent implements OnInit, AfterViewInit, OnDestroy {
  private destroy$ = new Subject<void>();
  public addNewSponsorFlag: boolean = false;
  public filterLbl: string = ApplicationConstants.FILTER;
  public filterExLbl: string = ApplicationConstants.FILTER_EX;
  public closeLbl: string = ApplicationConstants.CLOSE;
  public addNewSponsorLbl: string = ApplicationConstants.ADD_NEW_SPONSOR;
  public scholarshipIdLbl: string = ApplicationConstants.SCHOLARSHIP_ID;
  public scholarshipNameLbl: string = ApplicationConstants.SCHOLARSHIP_NAME;
  public totalAmountLbl: string = ApplicationConstants.TOTAL_AMOUNT;
  public rewardAmountLbl: string = ApplicationConstants.REWARD_AMOUNT;
  public renewableLbl: string = ApplicationConstants.RENEWABLE;
  public timelineLbl: string = ApplicationConstants.TIMELINE;
  public levelLbl: string = ApplicationConstants.LEVEL;
  public majorLbl: string = ApplicationConstants.MAJOR;
  public gpaLbl: string = ApplicationConstants.GPA;
  public needOrMeritLbl: string = ApplicationConstants.NEED_OR_MERIT;
  public stateLbl: string = ApplicationConstants.STATE;
  public countyLbl: string = ApplicationConstants.COUNTY;
  public noDataFilterLbl: string = ApplicationConstants.FILTER_NO_DATA;
  public displayedColumns: string[] = Object.values(
    ApplicationConstants.SPONSOR_DETAILS
  );
  public displayedColumnIds = ApplicationConstants.SPONSOR_DETAILS;
  public dataSource!: MatTableDataSource<ISponsorshipDetails>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private apiService: AllApisService) {}

  public ngOnInit(): void {
    this.apiService
      .sponsorDetailsApi()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: ISponsorshipDetails[]) => {
          this.dataSource = new MatTableDataSource(response);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: (error) => {
          console.error(
            'Error fetching sponsorDetailsApi in SponsorsComponent:',
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

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();

    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const searchText = filter.toLowerCase();
      const columnsToFilter = [
        this.displayedColumnIds.SCHOLARSHIP_ID,
        this.displayedColumnIds.SCHOLARSHIP_NAME,
        this.displayedColumnIds.TOTAL_AMOUNT,
        this.displayedColumnIds.AWARDED_AMOUNT,
        this.displayedColumnIds.RENEWABLE,
        this.displayedColumnIds.TIMELINE,
        ...Object.values(ApplicationConstants.SPONSOR_CRITERIA),
      ];

      // Check if any of the columns contain the search text
      return columnsToFilter.some((column) => {
        const columnValue = column
          .split('.')
          .reduce((obj, key) => obj[key], data);

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

  public currencyFormat(amountValue: number): string {
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

  public openScholarship(scholarshipId: string): void {
    const url = `http://localhost:4200/scholarship/${scholarshipId}`;
    window.open(url, '_blank');
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
