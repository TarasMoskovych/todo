import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrioritiesTableComponent } from './priorities-table.component';

describe('PrioritiesTableComponent', () => {
  let component: PrioritiesTableComponent;
  let fixture: ComponentFixture<PrioritiesTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrioritiesTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrioritiesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
