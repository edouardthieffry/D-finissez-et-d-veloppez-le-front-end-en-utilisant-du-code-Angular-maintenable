import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';
import { catchError, combineLatest, map, of, startWith } from 'rxjs';
import { PageHeaderComponent } from 'src/app/components/page-header/page-header.component';
import { PieChartComponent } from 'src/app/components/pie-chart/pie-chart.component';
import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';
import { PieChart } from 'src/app/models/pie-chart';
import { DataOlympicService } from 'src/app/services/olympic.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    AsyncPipe, 
    PageHeaderComponent, 
    PieChartComponent, 
    SpinnerComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  private readonly _router = inject(Router);
  private readonly _dataOlympicService = inject(DataOlympicService);

  readonly dashboard$ = combineLatest({
    olympicStatistics: this._dataOlympicService.getOlympicStatistics(),
    chartData: this._dataOlympicService.getOlympicChartData()
  }).pipe(
    map(({ olympicStatistics, chartData }) => ({
      status: 'ready' as const,
      pageHeader: {
        title: 'Medals per Country',
        stats: olympicStatistics.stats
      },
      pieChart: new PieChart('Medals', 'DashboardPieChart', chartData.countries, chartData.medals)
    })),
    startWith({ status: 'loading' as const }),
    catchError(error => {
      console.error('Unable to load Olympic dashboard data.', error);
      return of({ status: 'error' as const });
    })
  );

  onCountrySelected(countryName: string): void {
    void this._router.navigate(['/country', countryName]);
  }
}
