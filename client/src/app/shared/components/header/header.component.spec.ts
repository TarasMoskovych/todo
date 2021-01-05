import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Store } from '@ngrx/store';

import { AppState, registerStore } from 'src/app/core/+store';
import { TutorialService } from 'src/app/core/services';
import { SharedModule } from '../../shared.module';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let tutorialServiceSpy: jasmine.SpyObj<TutorialService>;
  let storeSpy: jasmine.SpyObj<Store<AppState>>;
  let el: DebugElement;
  let btn: DebugElement;

  beforeEach(async(() => {
    tutorialServiceSpy = jasmine.createSpyObj('TutorialService', ['start']);
    storeSpy = jasmine.createSpyObj('Store', ['dispatch', 'select']);

    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports: [
        SharedModule,
        ...registerStore(),
      ],
      providers: [
        { provide: TutorialService, useValue: tutorialServiceSpy },
        { provide: Store, useValue: storeSpy },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    btn = el.query(By.css('button.navbar-toggler'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init with opened sidenav', () => {
    fixture.detectChanges();
    expect(btn.nativeElement.classList).toContain('toggled');
  });

  it('should init with closed sidenav', () => {
    component.sidenavOpened = false;
    fixture.detectChanges();
    expect(btn.nativeElement.classList).not.toContain('toggled');
  });

  it('should emit toggleSidenav', () => {
    spyOn(component.toggleSidenav, 'emit');
    btn.triggerEventHandler('click', null);
    expect(component.toggleSidenav.emit).toHaveBeenCalledTimes(1);
  });

  it('should dispatch ToggleStatistic', () => {
    fixture.detectChanges();
    el.query(By.css('.navbar-brand.pointer.link')).nativeElement.click();
    expect(storeSpy.dispatch).toHaveBeenCalledTimes(1);
  });

  it('should start tutorial', () => {
    el.query(By.css('.tutorial-button')).triggerEventHandler('click', null);
    expect(tutorialServiceSpy.start).toHaveBeenCalledTimes(1);
  });
});
