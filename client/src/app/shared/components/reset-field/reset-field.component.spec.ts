import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetFieldComponent } from './reset-field.component';

describe('ResetFieldComponent', () => {
  let component: ResetFieldComponent;
  let fixture: ComponentFixture<ResetFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
