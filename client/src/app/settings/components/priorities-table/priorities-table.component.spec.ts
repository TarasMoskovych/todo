import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { registerStore } from 'src/app/core/+store';
import { SharedModule } from 'src/app/shared/shared.module';
import { PrioritiesTableComponent } from './priorities-table.component';

describe('PrioritiesTableComponent', () => {
  let component: PrioritiesTableComponent;
  let fixture: ComponentFixture<PrioritiesTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrioritiesTableComponent ],
      imports: [
        SharedModule,
        ...registerStore(),
      ],
      schemas: [NO_ERRORS_SCHEMA],
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
