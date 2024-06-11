import { Routes } from '@angular/router';
import { ScholarshipsComponent } from './feature-modules/scholarships/scholarships.component';
import { StudentApplicantsComponent } from './feature-modules/student-applicants/student-applicants.component';

export const routes: Routes = [
  {
    path: '',
    component: ScholarshipsComponent,
  },
  { path: 'scholarship/:id', component: StudentApplicantsComponent },
];
