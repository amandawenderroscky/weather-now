export class City {
    
        public id: number;
        public name: string;
        public country: string;
        public coord: Object;

        constructor(weatherData?: any) {
            if(weatherData){
                this.id = weatherData.id || null;
                this.name = weatherData.name || null;
                this.coord = weatherData.coord || null;
                this.country = weatherData.sys.country || null;
            }
         }
    
    }