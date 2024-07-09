import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDatepickerModule,
  MatDateRangePicker,
} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ApplicationConstants } from '../../../assets/constants/application-constants';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-new-scholar',
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
    MatNativeDateModule,
  ],
  templateUrl: './new-scholar.component.html',
  styleUrl: './new-scholar.component.scss',
})
export class NewScholarComponent implements OnInit {
  public submitLbl: string = ApplicationConstants.SUBMIT;
  public clearLbl: string = ApplicationConstants.CLEAR;
  public studentIdLbl: string = ApplicationConstants.STUDENT_ID;
  public studentNameLbl: string = ApplicationConstants.STUDENT_NAME;
  public scholarshipIdLbl: string = ApplicationConstants.SCHOLARSHIP_ID;
  public scholarshipNameLbl: string = ApplicationConstants.SCHOLARSHIP_NAME;
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
  public scholarForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.scholarForm = this.fb.group({
      studentId: ['', Validators.required],
      studentName: ['', Validators.required],
      scholarshipId: ['', Validators.required],
      scholarshipName: ['', Validators.required],
      awardedAmount: ['', Validators.required],
      renewable: ['', Validators.required],
      level: ['', Validators.required],
      major: ['', Validators.required],
      gpa: ['', Validators.required],
      needOrMerit: ['', Validators.required],
      state: ['', Validators.required],
      county: [''],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });
  }

  public onSubmit(): void {
    if (this.scholarForm.valid) {
      console.log(this.scholarForm.value);
    } else {
      console.log('Form is invalid');
    }
  }
}
