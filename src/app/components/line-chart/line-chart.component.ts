import { AfterViewInit, Component, Input } from '@angular/core';
import type { LineChart } from 'src/app/models/line-chart';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.scss'
})
export class LineChartComponent implements AfterViewInit {
  @Input() lineChart!: LineChart;

  ngAfterViewInit(): void {
    this.lineChart.buildChart();
  }
}
