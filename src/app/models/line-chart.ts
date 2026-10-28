import Chart from 'chart.js/auto';

export class LineChart {
  public canvasId: string;
  public title: string;
  public labels: number[];
  public data: number[];
  public chart?: Chart;

  constructor(canvasId: string, title: string, labels: number[], data: number[]) {
    this.canvasId = canvasId;
    this.title = title
    this.labels = labels;
    this.data = data;
  }

  buildChart(): void {
    this.chart = new Chart(this.canvasId, {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: [
          {
            label: this.title,
            data: this.data,
            backgroundColor: '#0b868f',
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
      },
    });
  }
}
