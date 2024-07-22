import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  MatDateRangePicker,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { ApplicationConstants } from '../../../assets/constants/application-constants';
import { AllApisService } from '../../services/all-apis.service';
import { Subject, takeUntil } from 'rxjs';
import { ISponsorshipDetails } from '../../interfaces/i-sponsorship-details';

@Component({
  selector: 'app-new-sponsor',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatDateRangePicker,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './new-sponsor.component.html',
  styleUrl: './new-sponsor.component.scss',
})
export class NewSponsorComponent implements OnInit {
  public submitLbl: string = ApplicationConstants.SUBMIT;
  public clearLbl: string = ApplicationConstants.CLEAR;
  public scholarshipIdLbl: string = ApplicationConstants.SCHOLARSHIP_ID;
  public scholarshipNameLbl: string = ApplicationConstants.SCHOLARSHIP_NAME;
  public totalAmountLbl: string = ApplicationConstants.TOTAL_AMOUNT;
  public awardedAmountLbl: string = ApplicationConstants.AWARDED_AMOUNT;
  public renewableLbl: string = ApplicationConstants.RENEWABLE;
  public startDateLbl: string = ApplicationConstants.START_DATE;
  public endDateLbl: string = ApplicationConstants.END_DATE;
  public levelLbl: string = ApplicationConstants.LEVEL;
  public majorLbl: string = ApplicationConstants.MAJOR;
  public gpaLbl: string = ApplicationConstants.GPA;
  public needOrMeritLbl: string = ApplicationConstants.NEED_OR_MERIT;
  public stateLbl: string = ApplicationConstants.STATE;
  public countyLbl: string = ApplicationConstants.COUNTY;
  public renewableOptions: string[] = ApplicationConstants.YES_NO;
  public levelOptions: string[] = ApplicationConstants.COURSE_LEVEL;
  public majorOptions: string[] = ApplicationConstants.MAJORS;
  public needMeritOptions: string[] = ApplicationConstants.NEED_MERIT;
  public sponsorForm!: FormGroup;
  private newSponsor!: ISponsorshipDetails;
  private destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder, private apiService: AllApisService) { }

  ngOnInit(): void {
    this.newSponsor = {
      scholarshipId: '',
      scholarshipName: '',
      totalAmount: 0,
      awardedAmount: 0,
      renewable: '',
      timeline: '',
      criteria: {
        level: [],
        major: [],
        gpa: '',
        needOrMerit: '',
        state: '',
        county: [],
      }
    }
    this.initForm();
  }

  initForm(): void {
    this.sponsorForm = this.fb.group({
      scholarshipId: ['', Validators.required],
      scholarshipName: ['', Validators.required],
      totalAmount: ['', Validators.required],
      awardedAmount: ['', Validators.required],
      renewable: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      level: ['', Validators.required],
      major: ['', Validators.required],
      gpa: ['', Validators.required],
      needOrMerit: ['', Validators.required],
      state: ['', Validators.required],
      county: [''],
    });
  }

  public onSubmit(): void {
    if (this.sponsorForm.valid) {
      this.newSponsor = {
        scholarshipId: this.sponsorForm.get('scholarshipId')?.value,
        scholarshipName: this.sponsorForm.get('scholarshipName')?.value,
        totalAmount: this.sponsorForm.get('totalAmount')?.value,
        awardedAmount: this.sponsorForm.get('awardedAmount')?.value,
        renewable: this.sponsorForm.get('renewable')?.value,
        timeline: this.sponsorForm.get('startDate')?.value + ' - ' + this.sponsorForm.get('endDate')?.value,
        criteria: {
          level: this.getArrayFromString(this.sponsorForm.get('level')?.value),
          major: this.getArrayFromString(this.sponsorForm.get('major')?.value),
          gpa: this.sponsorForm.get('gpa')?.value,
          needOrMerit: this.sponsorForm.get('needOrMerit')?.value,
          state: this.sponsorForm.get('state')?.value,
          county: this.getArrayFromString(this.sponsorForm.get('county')?.value),
        }
      };
      console.log(this.newSponsor)
      this.apiService.addNewSponsorApi(this.newSponsor).pipe(takeUntil(this.destroy$)).subscribe({
        next: (response) => {
          console.log('Sponsor added successfully:', response);
          this.sponsorForm.reset();
        },
        error: (error) => {
          console.error('Error adding sponsor:', error);
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }

  // private getArrayFromString(value: string | undefined): string[] {
  //   if (!value) return [];
  //   const items = value.split(',').map((item: string) => item.trim());
  //   return items.length === 1 ? [items[0]] : items;
  // }

  private getArrayFromString(value: string | string[] | undefined): string[] {
    if (!value) return [];
    if (Array.isArray(value)) {
      return value.map((item: string) => item.trim());
    }
    return value.split(',').map((item: string) => item.trim());
  }
}
