import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { WeatherRequest } from 'src/app/core/models/weather-request';
import { WeatherResponse } from 'src/app/core/models/weather-response';
import { WeatherService } from 'src/app/core/services/weather.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { SearchComponent } from './search.component';

class MockServiceProduct {
  getWeather(weatherRequest: WeatherRequest): Observable<WeatherResponse | any> {
    return of({
      "description": "overcast clouds",
      "icon": "https://openweathermap.org/img/wn/04d@2x.png",
      "temp": 18.8,
      "searchTime": 1648765128,
      "feelsLikeCelsius": 18.88,
      "clouds": 87,
      "windSpeed": 0.45,
      "lat": 4.570868,
      "lon": -74.297333,
      "longName": "Colombia",
      "shortName": "CO",
      "placeId": "ChIJo5QVrjqkFY4RQKPy7wSaDZo",
      "searchTimeDate": "31 Mar 2022 22:18:48",
      "feelsLikefahrenheit": 65.98400000000001
    })
  }
}
describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        RouterTestingModule,
        SharedModule,
        BrowserAnimationsModule],
      declarations: [SearchComponent],
      providers: [
        {
          provide: WeatherService, useClass: MockServiceProduct
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should getWeather', () => {
    component.getWeather();
    expect(component.weatherResponse.shortName).toEqual('CO');
  });

});
