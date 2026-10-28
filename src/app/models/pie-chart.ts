import Chart from 'chart.js/auto';
import type { ActiveElement } from 'chart.js';

export class PieChart {
    public title !: string;
    public canvasId !: string;
    public labels !: string[];
    public data !: number[];
    public chart ?: Chart;

    constructor(title: string, canvasId:   string, labels: string[], data: number[]) {
        this.title = title;
        this.canvasId = canvasId;
        this.labels = labels;
        this.data = data;
    }
    buildChart(emitCountry: (countryName: string) => void){
        this.chart = new Chart(this.canvasId, {
            type: 'pie',
            data: {
                labels: this.labels,
                datasets: [{
                label: this.title,
                data: this.data,
                backgroundColor: ['#0b868f', '#adc3de', '#7a3c53', '#8f6263', 'orange', '#94819d'],
                hoverOffset: 4
                }],
            },
            options: {
                aspectRatio: 2.5,
                onClick: (_event, elements) => this.onCountryClick(elements, emitCountry),
            }
            
        });
    }

    private onCountryClick(elements: ActiveElement[], emitCountry: (countryName: string) => void): void {
        const selectedElement = elements[0];
        if (!selectedElement) {
            return;
        }

        const countryName = this.labels[selectedElement.index];
        if (countryName !== undefined) {
            emitCountry(countryName);
        }
    }
}