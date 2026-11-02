import {Component, inject} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {catchError, combineLatest, map, of, startWith, switchMap} from 'rxjs';
import { LineChart } from 'src/app/models/line-chart';
import type { PageHeader } from 'src/app/models/page-header';
import {DataOlympicService} from 'src/app/services/olympic.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent {
  private readonly _route = inject(ActivatedRoute);
  private readonly _dataOlympicService = inject(DataOlympicService);
  private readonly _router = inject(Router);

  public readonly viewModel$ = this._route.paramMap.pipe(
    switchMap(params => {
      const countryName = params.get('countryName');
      if (!countryName) {
        void this._router.navigate(['/not-found']);
        return of({status: 'not-found' as const});
      }

      return this._dataOlympicService.getCountryDataByName(countryName).pipe(
        switchMap(country => {
          if (!country) {
            void this._router.navigate(['/not-found']);
            return of({status: 'not-found' as const});
          }

          return combineLatest({
            stats: this._dataOlympicService.getStatisticsByCountry(countryName),
            chartData: this._dataOlympicService.getCountryChartData(countryName)
          }).pipe(
            map(data => ({
              status: 'ready' as const,
              pageHeader: {
                title: country.country,
                stats: data.stats?.stats ?? []
              },
              lineChart: new LineChart(
                'countryChart',
                'Medals',
                data.chartData.years,
                data.chartData.medals
              )
            }))
          ).pipe(startWith({status: 'loading' as const}));
        }),
      );
    }),
    catchError(error => {
      console.error('Unable to load country data.', error);
      return of({status: 'error' as const});
    })
  );
}
