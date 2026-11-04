import { Component, Input } from '@angular/core';
import { StatComponent } from '../stat/stat.component';
import type { Stat } from 'src/app/models/stat';

@Component({
  selector: 'app-stat-list',
  standalone: true,
  imports: [
    StatComponent
  ],
  templateUrl: './stat-list.component.html',
  styleUrl: './stat-list.component.scss'
})
export class StatListComponent {
  @Input() stats!: Stat[];
}
