import { By } from 'protractor/built';
import { Http, HttpModule } from '@angular/http';

import { WeatherService } from '../../services/weather.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { CardWeatherComponent } from './card-weather.component';
import { CacheService, CacheStorageAbstract, CacheLocalStorage } from 'ng2-cache';

describe('CardWeatherComponent', () => {
  let component: CardWeatherComponent;
  let fixture: ComponentFixture<CardWeatherComponent>;
  const cardOptionCorrect = { cityName: 'Nuuk,gl', isActive: false };
  const cardOptionIncorrect = { cityName: 'test', isActive: false };
  let originalTimeout;

  beforeEach(async(() => {

    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

    TestBed.configureTestingModule({
      declarations: [ CardWeatherComponent ],
      imports: [HttpModule],
      providers: [WeatherService, 
      CacheService,
      { provide: CacheStorageAbstract, useClass: CacheLocalStorage }],
        schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
      })
      .compileComponents();
  }));

  beforeEach(() => {

    fixture = TestBed.createComponent(CardWeatherComponent);
    component = fixture.componentInstance;
    component.cityName = cardOptionCorrect.cityName;
    component.isActive = cardOptionCorrect.isActive;
    fixture.detectChanges();

  });

  afterEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  it('should create', inject([Http, WeatherService ], (Http, service: WeatherService) => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;
    expect(component).toBeTruthy();
  }));

  it('should not display error', async() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.error')).toBeNull;
  });

  it('should display error', async() => {
    component.cityName = cardOptionIncorrect.cityName;
    component.isActive = cardOptionIncorrect.isActive;

    const fixture = TestBed.createComponent(CardWeatherComponent);
    const compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelector('.error')).toBeTruthy;
  });

  it('should display in blue temperatures equal to or less than 5 degrees', async() => {
    fixture.whenRenderingDone().then(() => {
      fixture.componentInstance.weather.temp = 0;
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('.low')).toBeTruthy();
    });
  });

  it('should display in orange temperatures above 6 degrees and equal to or below 25', async() => {
    fixture.whenRenderingDone().then(() => {
      fixture.componentInstance.weather.temp = 20;
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('.medium')).toBeTruthy();
    });
  });

  it('should display in red temperatures above 26 degrees', async() => {
    
    fixture.whenRenderingDone().then(() => {
      fixture.componentInstance.weather.temp = 35;
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('.high')).toBeTruthy();
    });

  });

});
