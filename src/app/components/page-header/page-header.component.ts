import { Component, Input, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import type { PageHeader } from 'src/app/models/page-header';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrl: './page-header.component.scss'
})
export class PageHeaderComponent implements OnInit {
  private readonly _router = inject(Router);

  @Input() pageHeader!: PageHeader;

  isHome(): boolean {
    return this._router.isActive('/', {
      paths: 'exact',
      queryParams: 'ignored',
      fragment: 'ignored',
      matrixParams: 'ignored'
    });
  }

  ngOnInit(): void {
  }
}
