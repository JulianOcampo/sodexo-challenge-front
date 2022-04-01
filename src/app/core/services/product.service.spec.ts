import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { WeatherService } from './weather.service';
import { RouterTestingModule } from '@angular/router/testing'
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { WeatherRequest } from '../models/weather-request';
import { environment } from 'src/environments/environment';
import { HttpApi } from 'src/app/shared/constants/http-api';

const weatherRequest: WeatherRequest = new WeatherRequest();

describe('WeatherService', () => {
  let service: WeatherService;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule, RouterTestingModule
      ],
      declarations: [],
      providers: [
        WeatherService,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(WeatherService);
    weatherRequest.countryCode = 'co';
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getWeather', () => {
    service.getWeather(weatherRequest).subscribe();
    const req = httpTestingController
      .expectOne(environment.services.weatherApi + HttpApi.weather +
        `?code=${weatherRequest.countryCode}`);

    expect(req.request.method).toEqual('GET');
  });
});
