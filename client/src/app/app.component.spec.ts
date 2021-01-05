import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { DeviceDetectorService } from 'ngx-device-detector';

import { AppComponent } from './app.component';
import { ThemesService, TutorialService } from './core/services';
import { SharedModule } from './shared/shared.module';
import { AppState, registerStore } from './core/+store';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let store: Store<AppState>;
  let themesService: ThemesService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        NoopAnimationsModule,
        SharedModule,
        ...registerStore(),
      ],
      providers: [
        { provide: ThemesService, useValue: jasmine.createSpyObj('themesService', ['toggleDarkTheme']) },
        DeviceDetectorService,
        TutorialService,
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    store = TestBed.inject(Store);
    themesService = TestBed.inject(ThemesService);
  });

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should init theme', () => {
    spyOn(store, 'select').and.returnValue(of(true));
    fixture.detectChanges();

    expect(store.select).toHaveBeenCalledTimes(1);
    expect(themesService.toggleDarkTheme).toHaveBeenCalledTimes(1);
    expect(themesService.toggleDarkTheme).toHaveBeenCalledWith(true);
  });
});
