import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { CountryComponent } from './country.component';
import { DataOlympicService } from 'src/app/services/olympic.service';

describe('DetailComponent', () => {
  let component: CountryComponent;
  let fixture: ComponentFixture<CountryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountryComponent],
      providers: [
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: { paramMap: of(convertToParamMap({ countryName: 'Canada' })) }
        },
        { provide: DataOlympicService, useValue: {} }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountryComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
