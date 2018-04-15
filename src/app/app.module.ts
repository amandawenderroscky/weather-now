import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { TopBarComponent } from './components/topbar/topbar.component';
import { CardWeatherComponent } from './components/card-weather/card-weather.component';

import { WeatherService } from './services/weather.service';

import { CacheService, CacheStorageAbstract,CacheLocalStorage } from 'ng2-cache';

@NgModule({
  declarations: [AppComponent, TopBarComponent, HomeComponent, CardWeatherComponent],
  imports: [BrowserModule, AppRoutingModule, HttpModule, CommonModule],
  providers: [WeatherService, 
    CacheService,
    { provide: CacheStorageAbstract, useClass:CacheLocalStorage}],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {}