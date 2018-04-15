import { Weather } from '../models/weather.model';
import { TestBed, inject } from '@angular/core/testing';
import { HttpModule, Http, Response, ResponseOptions, XHRBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { WeatherService } from './weather.service';

describe('WeatherService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [WeatherService, { provide: XHRBackend, useClass: MockBackend }],
      
    });
  });

  describe('getWeatherByCityName()', () => {
    it('should return an Observable<Weather>', 
      inject([WeatherService, XHRBackend], (service: WeatherService, mockBackend) => {
  
      const weatherOption = { cityName: 'Nuuk,gl' };
  
      const mockResponse = {
            "coord": {
                "lon": -51.74,
                "lat": 64.17
            },
            "weather": [{
                "id": 802,
                "main": "Clouds",
                "description": "scattered clouds",
                "icon": "03d"
            }],
            "base": "stations",
            "main": {
                "temp": -4.49,
                "pressure": 1007.7,
                "humidity": 100,
                "temp_min": -4.49,
                "temp_max": -4.49,
                "sea_level": 1024.45,
                "grnd_level": 1007.7
            },
            "wind": {
                "speed": 2.32,
                "deg": 345.004
            },
            "clouds": {
                "all": 32
            },
            "dt": 1523804537,
            "sys": {
                "message": 0.0024,
                "country": "GL",
                "sunrise": 1523778776,
                "sunset": 1523833366
            },
            "id": 3421319,
            "name": "Nuuk",
            "cod": 200
        
      };
  
      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });
  
      service.getWeatherByCityName(weatherOption.cityName).subscribe((weather: Weather) => {
        expect(weather).toBeDefined();
      });
    }));
  });

  
});
