import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscriber } from 'rxjs';
import { Weather } from 'src/app/core/models/weather';
import { WeatherRequest } from 'src/app/core/models/weather-request';
import { WeatherResponse } from 'src/app/core/models/weather-response';
import { WeatherService } from 'src/app/core/services/weather.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

  sub: Subscriber<any> | undefined;
  weatherRequest: WeatherRequest = new WeatherRequest();
  weather: Weather = new Weather();
  weatherResponse: WeatherResponse = new WeatherResponse();
  processing: boolean = false;

  constructor(private weatherService: WeatherService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
    this.activatedRoute.queryParams.subscribe(data => {
      this.weatherRequest.countryCode = data.code ? data.code : 'CO';
      this.weather = new Weather();
      this.getWeather();
    });
  }

  ngOnInit(): void {
  }

  getWeather() {
    this.processing = true;
    this.weatherService.getWeather(this.weatherRequest)
      .subscribe(data => {
        this.weatherResponse = data;
        this.weather = data;
        this.processing = false;
      }, err => {
        this.weather = new Weather();
        this.processing = false;
        console.error(err);
      })
  }

  getIconUrl() {
    return `url(${this.weather.icon})`;
  }
  

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

}
