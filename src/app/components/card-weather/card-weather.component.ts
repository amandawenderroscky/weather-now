import { observable } from 'rxjs/symbol/observable';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import { Weather } from '../../models/weather.model';
import { WeatherService } from '../../services/weather.service';
import { UpperCasePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { CacheService } from 'ng2-cache/ng2-cache';

@Component({
  selector: 'app-card-weather',
  templateUrl: './card-weather.component.html',
  styleUrls: ['./card-weather.component.scss']
})

export class CardWeatherComponent implements OnInit {

  @Input() cityName: string;
  @Input() countryName: string;
  @Input() isActive: boolean;
  public cityNameComplete: string;
  public weather: Weather;
  public showErrorMessage: boolean = false;
  public isLoading: boolean = false;
  public updated_time: any;
  public intervalSubscription: Subscription;
  public cacheExpirationTimeInMinutes: number = 10;
  public intervalTimeInMinutes: number = 10;

  constructor(private _weatherService: WeatherService, public _cacheService: CacheService) { 
  }

  ngOnInit() {
    this.cityNameComplete = this.cityName + ',' + this.countryName;

    this.getWeatherFromCard(); 

    //updates the data every 10 minutes
    this.intervalSubscription = Observable.interval(this.intervalTimeInMinutes * 60 * 1000).subscribe(x => {
      this.showErrorMessage = false;
      this.isLoading = false;
      this.weather = null;
      this.getWeatherFromCard(); 
    });
    
  }

  ngOnDestroy(){
    if (this.intervalSubscription){
      this.intervalSubscription.unsubscribe();
    }
  }

  getWeatherFromCard(){
    this.isLoading = true;
    
    
    //includes a setTimeout to see the loading
    setTimeout(() => {

    this.updated_time = Date.now();
      
    //check if data exists in cache
    let exists: boolean = this._cacheService.exists(this.cityNameComplete);

    if(exists){
      let data: any|null = this._cacheService.get(this.cityNameComplete);

      if(data){
        this.setWeatherInCard(data);
      }else{
        this.setErrorInCard();
      }
    }else{
      this._weatherService.getWeatherByCityName(this.cityNameComplete).subscribe(
        weather => {

          this.setWeatherInCard(weather);

          //set weather in cache Service by name of city, with expiration time of 10 minutes
          this._cacheService.set(this.cityNameComplete, weather, {maxAge: this.cacheExpirationTimeInMinutes * 60});
        },
        () => {
          this.setErrorInCard();
        }
      );
    }    
    }, 1000); 

  }

  setWeatherInCard(weather: Weather){
    this.weather = weather;
    this.isLoading = false;
    this.updated_time = weather.updated_time;
  }

  setErrorInCard(){
    this.isLoading = false;
    this.showErrorMessage = true;
  }

  getClassFromTemperature(){
    if(this.weather.temp <= 5){
      return 'low';
    }else if(this.weather.temp > 26){
      return 'high';
    }else {
      return 'medium';
    }
  }

  toggleCardActivation(){
    this.isActive =  !this.isActive;
  }

}
