import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Statistic } from 'src/app/models';

import { TasksStatisticCardComponent } from './tasks-statistic-card.component';

const statistic: Statistic = {
  key: 'completed',
  icon: 'done',
  title: 'Completed tasks',
  statusClass: 'success',
  wrapperClass: 'completed-card',
  value: '5 of 20',
};

describe('TasksStatisticCardComponent', () => {
  let component: TasksStatisticCardComponent;
  let fixture: ComponentFixture<TasksStatisticCardComponent>;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TasksStatisticCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksStatisticCardComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be rendered correctly', () => {
    component.statistic = statistic;
    fixture.detectChanges();

    const card: DebugElement = el.query(By.css('.card')),
          cardHeader: DebugElement = card.query(By.css('.card-header')),
          icon: DebugElement = card.query(By.css('.material-icons')),
          value: DebugElement = card.query(By.css('.card-title')),
          title: DebugElement = card.query(By.css('.stat-card-title'));

    expect(card.nativeElement.classList).toContain(statistic.wrapperClass);
    expect(cardHeader.nativeElement.classList).toContain(`card-header-${statistic.statusClass}`);
    expect(icon.nativeElement.textContent).toBe(statistic.icon);
    expect(value.nativeElement.textContent.trim()).toBe(statistic.value);
    expect(title.nativeElement.textContent).toBe(statistic.title);
  });
});
