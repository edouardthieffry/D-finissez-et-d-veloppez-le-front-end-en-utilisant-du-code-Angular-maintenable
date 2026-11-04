import { Component, Input, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { StatListComponent } from '../stat-list/stat-list.component';
import type { PageHeader } from 'src/app/models/page-header';

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [
    RouterLink, 
    StatListComponent
  ],
  templateUrl: './page-header.component.html',
  styleUrl: './page-header.component.scss'
})
export class PageHeaderComponent {
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

}
