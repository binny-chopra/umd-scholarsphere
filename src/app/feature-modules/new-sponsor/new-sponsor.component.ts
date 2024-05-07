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
  renewableOptions: string[] = ApplicationConstants.YES_NO;
  levelOptions: string[] = ApplicationConstants.COURSE_LEVEL;
  majorOptions: string[] = ApplicationConstants.MAJORS;
  needMeritOptions: string[] = ApplicationConstants.NEED_MERIT;
  sponsorForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.sponsorForm = this.fb.group({
      scholarshipId: ['', Validators.required],
      scholarshipName: ['', Validators.required],
      totalAmount: ['', Validators.required],
      awardedAmount: ['', Validators.required],
      renewable: ['', Validators.required],
      timeline: ['', Validators.required],
      level: ['', Validators.required],
      major: ['', Validators.required],
      gpa: ['', Validators.required],
      needOrMerit: ['', Validators.required],
      state: ['', Validators.required],
      county: [''],
    });
  }

  onSubmit(): void {
    if (this.sponsorForm.valid) {
      console.log(this.sponsorForm.value);
    } else {
      console.log('Form is invalid');
    }
  }
}
