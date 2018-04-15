import { City } from './city.model';

export class Weather {
    
        public id: number;
        public city: City;

        public temp: number;
        public humidity: number;
        public pressure: number;

        public updated_time: Date; 
    
        constructor(weatherData?: any) {
            if(weatherData){
                this.id = weatherData.id || null;
                this.city = new City(weatherData) || null;
                this.temp = Math.round(weatherData.main.temp) || null;
                this.humidity = Math.round(weatherData.main.humidity) || null;
                this.pressure = Math.round(weatherData.main.pressure) || null;
                this.updated_time = new Date();
            }
         }
    
    }