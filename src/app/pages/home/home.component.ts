import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, combineLatest, map, of, startWith } from 'rxjs';
import { PieChart } from 'src/app/models/pie-chart';
import { DataOlympicService } from 'src/app/services/olympic.service';

@Component({
  selector: 'app-home',
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
