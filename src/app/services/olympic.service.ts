import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, of, shareReplay, switchMap, throwError } from 'rxjs';
import type { Country } from '../models/country';
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

  getArrayOfCountries(): Observable<string[]> {
    return this._olympicData$.pipe(
      map(countries => countries.map(country => country.country))
    );
  }

  getCountryDataById(id: number): Observable<Country | undefined> {
    return this._olympicData$.pipe(
      map(countries => countries.find(country => country.id === id))
    );
  }

  getCountryDataByName(countryName: string): Observable<Country | undefined> {
    return this._olympicData$.pipe(
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

  getCountryTotalMedals(countryName: string): Observable<number> {
    return this.getParticipationDataByCountryId(countryName).pipe(
      map(participations => participations.reduce(
        (total, participation) => total + participation.medalsCount,
        0
      ))
    );
  }

  getCountryTotalAthletes(countryName: string): Observable<number> {
    return this.getParticipationDataByCountryId(countryName).pipe(
      map(participations => participations.reduce(
        (total, participation) => total + participation.athleteCount,
        0
      ))
    );
  }

  getCountryTotalParticipations(countryName: string): Observable<number> {
    return this.getParticipationDataByCountryId(countryName).pipe(
      map(participations => participations.length)
    );
  }

  getArrayOfYearsByCountryId(countryName: string): Observable<number[]> {
    return this.getParticipationDataByCountryId(countryName).pipe(
      map(participations => participations.map(participation => participation.year))
    );
  }

  getArrayOfMedalsByParticipationCountryId(countryName: string): Observable<number[]> {
    return this.getParticipationDataByCountryId(countryName).pipe(
      map(participations => participations.map(participation => participation.medalsCount))
    );
  }

  getYearEdition(): Observable<number[]> {
    return this._olympicData$.pipe(
      map(countries => [...new Set(
        countries.flatMap(country =>
          country.participations.map(participation => participation.year)
        )
      )])
    );
  }

  getTotalJOs(): Observable<number> {
    return this.getYearEdition().pipe(map(years => years.length));
  }

  getTotalCountries(): Observable<number> {
    return this._olympicData$.pipe(map(countries => countries.length));
  }

  getArrayTotalMedalsByCountry(): Observable<number[]> {
    return this._olympicData$.pipe(
      map(countries => countries.map(country =>
        country.participations.reduce(
          (total, participation) => total + participation.medalsCount,
          0
        )
      ))
    );
  }
}
