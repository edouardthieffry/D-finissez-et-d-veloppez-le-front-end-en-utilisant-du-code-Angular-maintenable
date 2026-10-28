import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { PieChart } from 'src/app/models/pie-chart';
import {PageHeader} from 'src/app/models/page-header';
import {Stat} from 'src/app/models/stat';
import {DataOlympicService} from 'src/app/services/olympic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private router: Router, private dataOlympicService: DataOlympicService) { }

  pageHeader !: PageHeader;
  statList !: Stat[];
  pieChart !: PieChart

  ngOnInit() {
    this.pageHeader = new PageHeader("Medals per Country", [
        new Stat("Total Countries", this.dataOlympicService.getTotalCountries()),
        new Stat("Total JOs", this.dataOlympicService.getTotalJOs())
    ]);
    this.pieChart = new PieChart(
      'Medals',
      'DashboardPieChart',
      this.dataOlympicService.getArrayOfCountries(),
      this.dataOlympicService.getArrayTotalMedalsByCountry(),
    );
  }

  onCountrySelected(countryName: string): void {
    this.router.navigate(['/country', countryName]);
  }
}
