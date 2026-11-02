import {Component, inject} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {catchError, combineLatest, map, of, switchMap} from 'rxjs';
import {LineChart} from 'src/app/models/line-chart';
import {PageHeader} from 'src/app/models/page-header';
import {Stat} from 'src/app/models/stat';
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

  readonly viewModel$ = this._route.paramMap.pipe(
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
            participations: this._dataOlympicService.getCountryTotalParticipations(countryName),
            medals: this._dataOlympicService.getCountryTotalMedals(countryName),
            athletes: this._dataOlympicService.getCountryTotalAthletes(countryName),
            years: this._dataOlympicService.getArrayOfYearsByCountryId(countryName),
            medalsByYear: this._dataOlympicService.getArrayOfMedalsByParticipationCountryId(countryName)
          }).pipe(
            map(data => ({
              status: 'ready' as const,
              pageHeader: new PageHeader(country.country, [
                new Stat('Total participations', data.participations),
                new Stat('Total medals', data.medals),
                new Stat('Total athletes', data.athletes)
              ]),
              lineChart: new LineChart(
                'countryChart',
                'Medals',
                data.years,
                data.medalsByYear
              )
            }))
          );
        }),
      );
    }),
    catchError(error => {
      console.error('Unable to load country data.', error);
      return of({status: 'error' as const});
    })
  );
}
