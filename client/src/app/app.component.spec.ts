import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { DeviceDetectorService } from 'ngx-device-detector';

import { AppComponent } from './app.component';
import { ThemesService, TutorialService } from './core/services';
import { SharedModule } from './shared/shared.module';
import { registerStore } from './core/+store';

describe('AppComponent', () => {
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
        ThemesService,
        DeviceDetectorService,
        TutorialService,
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
