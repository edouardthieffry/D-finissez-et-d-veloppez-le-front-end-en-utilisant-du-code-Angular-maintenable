import { Component, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { PieChart } from 'src/app/models/pie-chart';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss'
})
export class PieChartComponent implements AfterViewInit {
  @Input() pieChart !: PieChart;

  @Output() countrySelected = new EventEmitter<string>();

  ngAfterViewInit() {
    this.pieChart.buildChart((countryName) => this.countrySelected.emit(countryName));
  }
}
