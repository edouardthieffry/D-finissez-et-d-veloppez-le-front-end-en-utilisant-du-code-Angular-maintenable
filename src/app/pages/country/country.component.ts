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
  public titlePage: string = '';
  public totalEntries: any = 0;
  public totalMedals: number = 0;
  public totalAthletes: number = 0;
  public error!: string;

  constructor(private route: ActivatedRoute, private dataOlympicService: DataOlympicService) {
  }

  pageHeader !: PageHeader;
  statList !: Stat[];

  ngOnInit() {
    let countryName: string | null = null
    this.route.paramMap.subscribe((param: ParamMap) => countryName = param.get('countryName'));
    this.totalEntries = this.dataOlympicService.getCountryTotalParticipations(countryName!);
    this.totalMedals = this.dataOlympicService.getCountryTotalMedals(countryName!);
    this.totalAthletes = this.dataOlympicService.getCountryTotalAthletes(countryName!);
    const years = this.dataOlympicService.getArrayOfYearsByCountryId(countryName!);
    const medals = this.dataOlympicService.getArrayOfMedalsByParticipationCountryId(countryName!);
    this.titlePage = countryName!;
    this.statList =[
        new Stat("Total participations", this.totalEntries),
        new Stat("Total medals", this.totalMedals),
        new Stat("Total athletes", this.totalAthletes)
    ];  
  
    this.pageHeader = new PageHeader(this.titlePage, this.statList);
    this.buildChart(years, medals);
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
