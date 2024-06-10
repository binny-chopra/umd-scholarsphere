import { Component } from '@angular/core';
import { SponsorsComponent } from '../sponsors/sponsors.component';
import { ScholarsComponent } from '../scholars/scholars.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormControl } from '@angular/forms';
import { ApplicationConstants } from '../../../assets/constants/application-constants';
import { StudentApplicantsComponent } from '../student-applicants/student-applicants.component';

@Component({
  selector: 'app-scholarships',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    MatIconModule,
    SponsorsComponent,
    ScholarsComponent,
    StudentApplicantsComponent,
  ],
  templateUrl: './scholarships.component.html',
  styleUrl: './scholarships.component.scss',
})
export class ScholarshipsComponent {
  public activeTabIndex: number = 0;
  public sponsorsLbl: string = ApplicationConstants.SPONSORS;
  public scholarsLbl: string = ApplicationConstants.SCHOLARS;
  public applicantsLbl: string = ApplicationConstants.STUDENT_APPLICANTS;
  private tabControl = new FormControl(0);

  constructor() {
    this.tabControl.valueChanges.subscribe((index) => {
      if (index) this.activeTabIndex = index;
    });
  }
}
