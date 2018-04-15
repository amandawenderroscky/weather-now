# WeatherNow

WeatherNow is an application designed to display the current temperature of cities around the world.

## Tools Used in Development

*  [Angular CLI](https://github.com/angular/angular-cli) - Angular Command Line Interface - version 1.7.4
* `Angular`- version 5.2.0
* `TypeScript` - version 2.5.3
* `NodeJs`- version 8.11.1
* [ng2-cache](https://github.com/Jackson88/ng2-cache) - Client side caching service for Angular2 - version 0.1.12
* `Protractor, Karma & Jasmine` - for tests
* [Open Weather Map](https://openweathermap.org/) - Api to get current weather and forecasts in various cities around the world

## Architecture

WeatherNow was made with `Angular 5` using Typescript and was developed based on components, with specific functions, based on the principles Clean Code, SOLID and DRY. Component style was created from CSS3 with SCSS.


* Components:

`AppComponent` - Responsible for creating the application and displaying the main page - single route created.

`TopBar` - Component responsible for creating the application header.

`CardWeather` - Receives as parameter some properties like the name of the city and country and is responsible for the construction and maintenance of the cards displayed on screen.

Checks if the application has cached data, and if it does not, check the service every 10 minutes.


* Services:

`WeatherService` - Responsible for consulting the OpenWeatherMap API and returning Weather models with their respective city.

`CacheService` - Data is being cached in LocalStorage for 10 minutes, from the service CacheService of the ng2-cache package.


* Models:

`City` - Class that has the data inherent to City.

`Weather` - Class that has Weather data.


* Pages:

`Home` - Application main page that builds the cards from a list of options.



# Development

### Getting Started

* Prerequisites:

This project have dependencies that require Node 6.9.0 or higher, together with NPM 3 or higher.

Prepare the development enviroment by running:

```
npm install -g @angular/cli
```

Install app dependencies by running inside app path:

```
npm i
```

## Development server

Serve app in development mode by running:

```
ng serve
```

Then open the address `http://localhost:4200/` in the browser. The app will automatically reload if you change any of the source files.


### Tests

You can run tests by running:

```
ng test
```

To execute the unit tests via [Karma](https://karma-runner.github.io).

* The following unit tests were implemented:

AppComponent:

    should create the app

    should have as title 'WeatherNow'

CardWeatherComponent:

    should create

    should not display error

    should display error

    should display in blue temperatures equal to or less than 5 degrees

    should display in orange temperatures above 6 degrees and equal to or below 25

    should display in red temperatures above 26 degrees

TopBarComponent:

    should create

    should render the logo

HomeComponent:

    should create

    must have a list with options for the cards

WeatherService:

    getWeatherByCityName()

    should return an Observable<Weather>


## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.


## TODO
* Improve test coverage
* Implement E2E tests
