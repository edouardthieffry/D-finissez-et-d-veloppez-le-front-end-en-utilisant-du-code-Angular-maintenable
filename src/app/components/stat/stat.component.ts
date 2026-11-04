import { Component, Input } from '@angular/core';
import type { Stat } from 'src/app/models/stat';

@Component({
  selector: 'app-stat',
  standalone: true,
  templateUrl: './stat.component.html',
  styleUrl: './stat.component.scss'
})
export class StatComponent {
  @Input() stat!: Stat;
}
