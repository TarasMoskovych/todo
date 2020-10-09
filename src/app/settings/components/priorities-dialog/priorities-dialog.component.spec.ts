import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrioritiesDialogComponent } from './priorities-dialog.component';

describe('PrioritiesDialogComponent', () => {
  let component: PrioritiesDialogComponent;
  let fixture: ComponentFixture<PrioritiesDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrioritiesDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrioritiesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
