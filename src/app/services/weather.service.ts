import { Weather } from '../models/weather.model';
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class WeatherService {

  private urlApi = 'http://api.openweathermap.org/data/2.5/weather';
  private keyApi = '822c49033328aefdde4faa6f129aacdd';
  private units = 'metric';

  constructor(private _http: Http) { }

  public getWeatherByCityName(cityNameComplete: string): Observable<Weather>{
    return this.requestApi({ q: cityNameComplete });
  }

  public getWeatherByCityId(cityId: string): Observable<Weather>{
    return this.requestApi({ id: cityId });
  }

  public requestApi(params: any){
    params.APPID = this.keyApi;
    params.units = this.units;

    return this._http.get(this.urlApi, {
        params: params
    })
    .map(response => 
      this.transformToModel(response.json())
    );
  }

  public transformToModel(res: Response): Weather{
    return new Weather(res);
  }

}
