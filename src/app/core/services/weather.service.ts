import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpApi } from 'src/app/shared/constants/http-api';
import { environment } from 'src/environments/environment';
import { WeatherRequest } from '../models/weather-request';
import { WeatherResponse } from '../models/weather-response';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  public getWeather(productRequest: WeatherRequest): Observable<WeatherResponse | any> {
    const params = new HttpParams()
      .set('code', productRequest.countryCode ? productRequest.countryCode : '')

    return this.http.get(environment.services.weatherApi + HttpApi.weather, { params });
  }

}
