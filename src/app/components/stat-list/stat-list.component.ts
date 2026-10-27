import { Component, OnInit, Input } from '@angular/core';
import { Stat } from 'src/app/models/stat';

@Component({
  selector: 'app-stat-list',
  templateUrl: './stat-list.component.html',
  styleUrl: './stat-list.component.scss'
})
export class StatListComponent implements OnInit {
  @Input() stats!: Stat[];

  ngOnInit(): void {
  }

}
