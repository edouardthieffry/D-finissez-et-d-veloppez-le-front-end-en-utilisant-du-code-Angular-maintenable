import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {LineChart} from 'src/app/models/line-chart';
import {PageHeader} from 'src/app/models/page-header';
import {Stat} from 'src/app/models/stat';
import {DataOlympicService} from 'src/app/services/olympic.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {
  constructor(private route: ActivatedRoute, private dataOlympicService: DataOlympicService, private router: Router) {
  }

  pageHeader !: PageHeader;
  statList !: Stat[];
  lineChart!: LineChart;

  ngOnInit() {
  const countryName = this.route.snapshot.paramMap.get('countryName');
  const countries = this.dataOlympicService.getArrayOfCountries();

  if (!countryName || !countries.includes(countryName)) {
    this.router.navigate(['/not-found']);
    return;
  }
    
    this.pageHeader = new PageHeader(countryName, [
        new Stat("Total participations", this.dataOlympicService.getCountryTotalParticipations(countryName!)),
        new Stat("Total medals", this.dataOlympicService.getCountryTotalMedals(countryName!)),
        new Stat("Total athletes", this.dataOlympicService.getCountryTotalAthletes(countryName!))
    ]);
    this.lineChart = new LineChart(
      'countryChart',
      'Medals',
      this.dataOlympicService.getArrayOfYearsByCountryId(countryName!),
      this.dataOlympicService.getArrayOfMedalsByParticipationCountryId(countryName!),
    );
  }
}
