import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable, Input } from '@angular/core';
import { Country } from '../models/country';
import { Participation } from '../models/participation';
@Injectable({
  providedIn: 'root'
})
export class DataOlympicService {
    private olympicData = [
        new Country(1, "Italy", [
            new Participation(1, 2012, "Londres", 28, 372),
            new Participation(2, 2016, "Rio de Janeiro", 28, 375),
            new Participation(3, 2020, "Tokyo", 40, 381),
        ]),
        new Country(2, "Spain", [
            new Participation(1, 2012, "Londres", 20, 315),
            new Participation(2, 2016, "Rio de Janeiro", 17, 312),
            new Participation(3, 2020, "Tokyo", 17, 321),
        ]),
        new Country(3, "United States", [
            new Participation(1, 2012, "Londres", 109, 610),
            new Participation(2, 2016, "Rio de Janeiro", 123, 652),
            new Participation(3, 2020, "Tokyo", 113, 626),
        ]),
        new Country(4, "Germany", [
            new Participation(1, 2012, "Londres", 44, 425),
            new Participation(2, 2016, "Rio de Janeiro", 44, 422),
            new Participation(3, 2020, "Tokyo", 37, 425),
        ]),
        new Country(5, "France", [
            new Participation(1, 2012, "Londres", 35, 423),
            new Participation(2, 2016, "Rio de Janeiro", 45, 412),
            new Participation(3, 2020, "Tokyo", 33, 403),
        ]),
    ];
    
    getCountryDataById(countryName: string): Country {
        const country = this.olympicData.find(country => country.country === countryName);
        if (!country) {
            throw new Error(`Country with ID ${countryName} not found.`);
        }
        return country;
    }

    getParticipationDataByCountryId(countryName: string): Participation[] {
        const country = this.getCountryDataById(countryName);
        if(!country.participations || country.participations.length === 0) {
            throw new Error(`No participation data found for country with ID ${countryName}.`);
        }
        return country.participations;
    }

    getCountryTotalMedals(countryName: string): number {
        const participations = this.getParticipationDataByCountryId(countryName);
        return participations.reduce((total, participation) => total + participation.medalsCount, 0);
    }
    
    getCountryTotalAthletes(countryName: string): number {
        const participations = this.getParticipationDataByCountryId(countryName);
        return participations.reduce((total, participation) => total + participation.athleteCount, 0);
    }
    getCountryTotalParticipations(countryName: string): number {
        const participations = this.getParticipationDataByCountryId(countryName);
        return participations.length;
    }
    getArrayOfYearsByCountryId(countryName: string): number[] {
        const participations = this.getParticipationDataByCountryId(countryName);
        return participations.map(participation => participation.year);
    }
    
    getArrayOfMedalsByParticipationCountryId(countryName: string): string[] {
        const participations = this.getParticipationDataByCountryId(countryName);
        return participations.map(participation => participation.medalsCount.toString());
    }

    getYearEdition(): number[] {
        const yearEdition: number[] = [];
        this.olympicData.forEach(country => {
            country.participations.forEach(participation => {
                if (!yearEdition.includes(participation.year)) {
                    yearEdition.push(participation.year);
                }
            });
        });
        return yearEdition;
    }

    getTotalJOs(): number {
        return this.getYearEdition().length;
    }
    getTotalCountries(): number {
        return this.olympicData.length;
    }
    getArrayTotalMedalsByCountry(): number[] {
        return this.olympicData.map(country => this.getCountryTotalMedals(country.country));
    }
    getArrayOfCountries(): string[] {
        return this.olympicData.map(country => country.country);
    }

}