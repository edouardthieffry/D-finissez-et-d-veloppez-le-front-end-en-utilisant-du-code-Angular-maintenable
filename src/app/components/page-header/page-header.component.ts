import { Component, Input, OnInit } from '@angular/core';
import { PageHeader } from 'src/app/models/page-header';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrl: './page-header.component.scss'
})
export class PageHeaderComponent implements OnInit {
  @Input() pageHeader!: PageHeader;

  ngOnInit(): void {
  }
}
