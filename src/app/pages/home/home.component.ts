import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, combineLatest, map, of, startWith } from 'rxjs';
import { PageHeader } from 'src/app/models/page-header';
import { PieChart } from 'src/app/models/pie-chart';
import { Stat } from 'src/app/models/stat';
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
    totalCountries: this._dataOlympicService.getTotalCountries(),
    totalJOs: this._dataOlympicService.getTotalJOs(),
    countries: this._dataOlympicService.getArrayOfCountries(),
    totalMedals: this._dataOlympicService.getArrayTotalMedalsByCountry()
  }).pipe(
    map(({ totalCountries, totalJOs, countries, totalMedals }) => ({
      status: 'ready' as const,
      pageHeader: new PageHeader('Medals per Country', [
        new Stat('Total Countries', totalCountries),
        new Stat('Total JOs', totalJOs)
      ]),
      pieChart: new PieChart('Medals', 'DashboardPieChart', countries, totalMedals)
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
