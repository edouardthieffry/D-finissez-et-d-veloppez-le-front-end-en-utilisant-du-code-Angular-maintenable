import {Component, inject} from '@angular/core';
import { Router } from '@angular/router';
import { catchError, combineLatest, map, of } from 'rxjs';
import { PieChart } from 'src/app/models/pie-chart';
import {PageHeader} from 'src/app/models/page-header';
import {Stat} from 'src/app/models/stat';
import {DataOlympicService} from 'src/app/services/olympic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  private readonly _router = inject(Router);
  private readonly _dataOlympicService = inject(DataOlympicService);

  readonly pageHeader$ = combineLatest({
    totalCountries: this._dataOlympicService.getTotalCountries(),
    totalJOs: this._dataOlympicService.getTotalJOs()
  }).pipe(
    map(({totalCountries, totalJOs}) => ({
      status: 'ready' as const,
      pageHeader: new PageHeader('Medals per Country', [
        new Stat('Total Countries', totalCountries),
        new Stat('Total JOs', totalJOs)
      ])
    })),
    catchError(error => {
      console.error('Unable to load Olympic page header data.', error);
      return of({status: 'error' as const});
    })
  );

  readonly pieChart$ = combineLatest({
    countries: this._dataOlympicService.getArrayOfCountries(),
    totalMedals: this._dataOlympicService.getArrayTotalMedalsByCountry()
  }).pipe(
    map(({countries, totalMedals}) => ({
      status: 'ready' as const,
      pieChart: new PieChart('Medals', 'DashboardPieChart', countries, totalMedals)
    })),
    catchError(error => {
      console.error('Unable to load Olympic pie chart data.', error);
      return of({status: 'error' as const});
    })
  );

  onCountrySelected(countryName: string): void {
    void this._router.navigate(['/country', countryName]);
  }
}
