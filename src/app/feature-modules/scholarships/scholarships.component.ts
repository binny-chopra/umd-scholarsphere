import { Component } from '@angular/core';
import { SponsorsComponent } from '../sponsors/sponsors.component';
import { ScholarsComponent } from '../scholars/scholars.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-scholarships',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    MatIconModule,
    SponsorsComponent,
    ScholarsComponent,
  ],
  templateUrl: './scholarships.component.html',
  styleUrl: './scholarships.component.scss',
})
export class ScholarshipsComponent {
  activeTabIndex: number = 0;
  tabControl = new FormControl(0);

  constructor() {
    this.tabControl.valueChanges.subscribe((index) => {
      if (index) this.activeTabIndex = index;
    });
  }
}
