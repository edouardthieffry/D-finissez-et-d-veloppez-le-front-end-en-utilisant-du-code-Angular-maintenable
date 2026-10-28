import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PieChartComponent } from './pie-chart.component';
import { PieChart } from 'src/app/models/pie-chart';

describe('PieChartComponent', () => {
  let component: PieChartComponent;
  let fixture: ComponentFixture<PieChartComponent>;
  let onCountryClick: (countryName: string) => void;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PieChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PieChartComponent);
    component = fixture.componentInstance;
    component.pieChart = new PieChart('Medals', 'test-chart', ['France'], [1]);
    spyOn(component.pieChart, 'buildChart').and.callFake((callback) => {
      onCountryClick = callback;
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit the selected country name', () => {
    const countrySelected = jasmine.createSpy('countrySelected');
    component.countrySelected.subscribe(countrySelected);

    onCountryClick('France');

    expect(countrySelected).toHaveBeenCalledOnceWith('France');
  });
});
