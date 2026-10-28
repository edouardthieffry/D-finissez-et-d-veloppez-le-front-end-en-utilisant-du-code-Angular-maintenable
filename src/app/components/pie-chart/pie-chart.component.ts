import { Component, Input, AfterViewInit } from '@angular/core';
import { PieChart } from 'src/app/models/pie-chart';
import Chart from 'chart.js/auto'; 

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss'
})
export class PieChartComponent implements AfterViewInit {
  @Input() pieChart !: PieChart;
  ngAfterViewInit() {
    this.pieChart.buildChart();
    this.pieChart.handleClickCountry();
  }
}
