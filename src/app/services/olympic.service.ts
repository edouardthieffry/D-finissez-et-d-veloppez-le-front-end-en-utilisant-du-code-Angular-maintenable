import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, of, shareReplay, switchMap, throwError, delay } from 'rxjs';
import type { Country } from '../models/country';
import type { CountryChartData, OlympicChartData } from '../models/chart-data';
import type { Statistics } from '../models/stat';
import type { Participation } from '../models/participation';

@Injectable({
  providedIn: 'root'
})
export class DataOlympicService {
  private readonly _http = inject(HttpClient);
  private readonly _olympicData$: Observable<Country[]> = this._http
    .get<Country[]>('assets/mock/olympic.json')
    .pipe(shareReplay({ bufferSize: 1, refCount: true }));

  getOlympicsData(): Observable<Country[]> {
    return this._olympicData$;
  }

  getCountryDataByName(countryName: string): Observable<Country | undefined> {
    return this._olympicData$.pipe(
        delay(1000), // Simulate a delay for loading state
        map(countries => countries.find(country => country.country === countryName))
    );
  }

  getParticipationDataByCountryId(countryName: string): Observable<Participation[]> {
    return this.getCountryDataByName(countryName).pipe(
    
        switchMap(country => {
            if (!country) {
            return throwError(() => new Error(`Country ${countryName} not found.`));
            }
            if (country.participations.length === 0) {
            return throwError(() => new Error(`No participation data found for country ${countryName}.`));
            }
            return of(country.participations);
        })
    );
  }

  getCountryChartData(countryName: string): Observable<CountryChartData> {
    return this.getParticipationDataByCountryId(countryName).pipe(
        map(participations => ({
            years: participations.map(participation => participation.year),
            medals: participations.map(participation => participation.medalsCount)
        }))
    );
  }

  getOlympicChartData(): Observable<OlympicChartData> {
    return this._olympicData$.pipe(
        delay(1000), // Simulate a delay for loading state
        map(countries => ({
            countries: countries.map(country => country.country),
            medals: countries.map(country =>
            country.participations.reduce(
                (total, participation) => total + participation.medalsCount,
                0
            )
            )
        }))
    );
  }

  getOlympicStatistics(): Observable<Statistics> {
    return this._olympicData$.pipe(
      delay(1000), // Simulate a delay for loading state
      map(countries => ({
        stats: [
          { title: 'Total Countries', value: countries.length },
          {
            title: 'Total JOs',
            value: new Set(countries.flatMap(country =>
              country.participations.map(participation => participation.year)
            )).size
          }
        ]
      }))
    );
  }

  getStatisticsByCountry(countryName: string): Observable<Statistics> {
    return this.getCountryDataByName(countryName).pipe(
        switchMap(country => {
            if (!country) {
                return of({ stats: [] });
            }
            const totalParticipations = country.participations.length;
            const totalMedals = country.participations.reduce(
                (total, participation) => total + participation.medalsCount,
                0
            );
            const totalAthletes = country.participations.reduce(
                (total, participation) => total + participation.athleteCount,
                0
            );

            return of({
                stats: [
                    { title: 'Total Participations', value: totalParticipations },
                    { title: 'Total Medals', value: totalMedals },
                    { title: 'Total Athletes', value: totalAthletes }
                ]
            });
        })
    );
  }
}
