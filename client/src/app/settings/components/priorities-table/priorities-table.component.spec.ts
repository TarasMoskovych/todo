import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TestData } from 'src/app/models';

import { SharedModule } from 'src/app/shared/shared.module';
import { PrioritiesTableComponent } from './priorities-table.component';

const { priorities } = TestData.data;

describe('PrioritiesTableComponent', () => {
  let component: PrioritiesTableComponent;
  let fixture: ComponentFixture<PrioritiesTableComponent>;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrioritiesTableComponent ],
      imports: [
        SharedModule,
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrioritiesTableComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    component.priorities = priorities;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render priorities list', () => {
    expect(el.queryAll(By.css('tbody tr')).length).toBe(priorities.length);
  });

  it('should emit "priorityEdit"', () => {
    const editBtn: DebugElement = el.query(By.css('.edit:first-child'));
    spyOn(component.priorityEdit, 'emit');
    editBtn.triggerEventHandler('click', null);

    expect(component.priorityEdit.emit).toHaveBeenCalledTimes(1);
    expect(component.priorityEdit.emit).toHaveBeenCalledWith(priorities[0]);
  });

  it('should emit "priorityRemove"', () => {
    const editBtn: DebugElement = el.query(By.css(`[aria-label="Remove ${priorities[1].name}"]`));
    spyOn(component.priorityRemove, 'emit');
    editBtn.triggerEventHandler('click', null);

    expect(component.priorityRemove.emit).toHaveBeenCalledTimes(1);
    expect(component.priorityRemove.emit).toHaveBeenCalledWith(priorities[1]);
  });

});
