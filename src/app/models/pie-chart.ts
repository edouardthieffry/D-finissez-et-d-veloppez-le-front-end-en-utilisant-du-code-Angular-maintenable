import Chart from 'chart.js/auto';

export class PieChart {
    public title !: string;
    public canvasId !: string;
    public labels !: string[];
    public data !: number[];
    public chart ?: Chart;

    constructor(title: string, canvasId: string, labels: string[], data: number[]) {
        this.title = title;
        this.canvasId = canvasId;
        this.labels = labels;
        this.data = data;
    }
    buildChart(){
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
            }
            
        });
    }
    handleClickCountry(){
        const chart = this.chart;
        if(!chart){
            return;
        }else{
            chart.options.onClick = (evt,element) => {
                    if (evt.native) {
                        const points = chart.getElementsAtEventForMode(evt.native, 'point', { intersect: true }, true)
                        if (points.length) {
                            const firstPoint = points[0];
                            const countryName = chart.data.labels ? chart.data.labels[firstPoint.index] : '';
                            console.log('navigateByUrl');
                        }
                    }
                }
        }
    
    }
}