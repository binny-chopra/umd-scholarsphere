import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ISponsorshipDetails } from '../../interfaces/i-sponsorship-details';
import { AllApisService } from '../../services/all-apis.service';
import { ApplicationConstants } from '../../../assets/constants/application-constants';
import { CommonModule } from '@angular/common';
import { NewSponsorComponent } from '../new-sponsor/new-sponsor.component';

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
    NewSponsorComponent
  ],
  templateUrl: './sponsors.component.html',
  styleUrl: './sponsors.component.scss',
})
export class SponsorsComponent implements OnInit {
  addNewSponsorFlag: boolean = false;
  na: string = ApplicationConstants.NA_STRING;
  displayedColumns: string[] = Object.values(
    ApplicationConstants.SPONSOR_DETAILS
  );
  displayedColumnIds = ApplicationConstants.SPONSOR_DETAILS;
  dataSource!: MatTableDataSource<ISponsorshipDetails>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private allApiService: AllApisService) {}

  ngOnInit(): void {
    this.allApiService
      .sponsorDetailsApi()
      .subscribe((response: ISponsorshipDetails[]) => {
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  applyFilter(event: Event) {
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
