import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import Chart from 'chart.js/auto';
import {PageHeader} from 'src/app/models/page-header';
import {Stat} from 'src/app/models/stat';
import {DataOlympicService} from 'src/app/services/olympic.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {
  public lineChart!: Chart<"line", string[], number>;

  constructor(private route: ActivatedRoute, private dataOlympicService: DataOlympicService) {
  }

  pageHeader !: PageHeader;
  statList !: Stat[];

  ngOnInit() {
    let countryName: string | null = null
    this.route.paramMap.subscribe((param: ParamMap) => countryName = param.get('countryName'));  
    this.pageHeader = new PageHeader(countryName!, [
        new Stat("Total participations", this.dataOlympicService.getCountryTotalParticipations(countryName!)),
        new Stat("Total medals", this.dataOlympicService.getCountryTotalMedals(countryName!)),
        new Stat("Total athletes", this.dataOlympicService.getCountryTotalAthletes(countryName!))
    ]);
    this.buildChart(this.dataOlympicService.getArrayOfYearsByCountryId(countryName!), this.dataOlympicService.getArrayOfMedalsByParticipationCountryId(countryName!));
  }

  buildChart(years: number[], medals: string[]) {
    const lineChart = new Chart("countryChart", {
      type: 'line',
      data: {
        labels: years,
        datasets: [
          {
            label: "medals",
            data: medals,
            backgroundColor: '#0b868f'
          },
        ]
      },
      options: {
        aspectRatio: 2.5
      }
    });
    this.lineChart = lineChart;
  }
}
