import { Component } from '@angular/core';
import { ApplicationConstants } from '../../../assets/constants/application-constants';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  public title: string = ApplicationConstants.SCHOLARSHIP_SPHERE;
}
