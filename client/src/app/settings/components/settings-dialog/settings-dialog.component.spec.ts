import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { SharedModule } from 'src/app/shared/shared.module';
import { SettingsDialogComponent } from './settings-dialog.component';

describe('SettingsDialogComponent', () => {
  let component: SettingsDialogComponent;
  let fixture: ComponentFixture<SettingsDialogComponent>;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsDialogComponent ],
      imports: [
        SharedModule,
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsDialogComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();

    spyOn(component.toggleDarkTheme, 'emit');
    spyOn(component.toggleDialog, 'emit');
    spyOn(component.openPrioritiesDialog, 'emit');
    spyOn(component.setColor, 'emit');
    spyOn(component.setImage, 'emit');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not emit toggleDialog', () => {
    component.onCloseDialog(false);
    expect(component.toggleDialog.emit).toHaveBeenCalledTimes(0);
  });

  it('should emit toggleDialog', () => {
    component.onCloseDialog(true);
    expect(component.toggleDialog.emit).toHaveBeenCalledTimes(1);
  });

  it('should emit toggleDialog on click', () => {
    el.query(By.css('div > a')).nativeElement.click();
    expect(component.toggleDialog.emit).toHaveBeenCalledTimes(1);
  });

  it('should emit toggleDarkTheme', () => {
    component.onToggleDarkTheme();
    expect(component.toggleDarkTheme.emit).toHaveBeenCalledTimes(1);
  });

  it('should emit openPrioritiesDialog', () => {
    component.onPrioritiesDialogOpen();
    expect(component.openPrioritiesDialog.emit).toHaveBeenCalledTimes(1);
  });

  it('should emit setColor', () => {
    component.onSetColor(null);
    expect(component.setColor.emit).toHaveBeenCalledTimes(1);
  });

  it('should emit setImage', () => {
    component.onSetImage('assets/images/bg1.jpg');
    expect(component.setImage.emit).toHaveBeenCalledTimes(1);
  });
});
