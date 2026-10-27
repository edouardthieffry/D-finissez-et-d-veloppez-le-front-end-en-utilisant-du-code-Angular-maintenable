import { Component, Input, OnInit } from '@angular/core';
import { Stat } from 'src/app/models/stat';

@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrl: './stat.component.scss'
})
export class StatComponent implements OnInit {
  @Input() stat!: Stat;

  ngOnInit(): void {
  }
}
