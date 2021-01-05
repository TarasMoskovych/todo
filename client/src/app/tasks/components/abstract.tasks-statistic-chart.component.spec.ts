import { TitleCasePipe } from '@angular/common';
import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { SharedModule } from 'src/app/shared/shared.module';
import { AbstractTasksStatisticChartComponent } from './abstract.tasks-statistic-chart.component';

@Component({
  template: `<app-tasks-statistic [darkTheme]="darkTheme"></app-tasks-statistic>`
})
class TestHostComponent {
  darkTheme = false;
}

@Component({
  selector: 'app-tasks-statistic',
  template: ``
})
class TasksStatisticChartComponent extends AbstractTasksStatisticChartComponent {
  transform(value: string): string {
    return this.transformToTitleCase(value);
  }
}

describe('AbstractTasksStatisticChartComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let component: TestHostComponent;
  let el: DebugElement;
  let tasksStatisticChartComponent: TasksStatisticChartComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestHostComponent,
        TasksStatisticChartComponent,
      ],
      imports: [SharedModule],
      providers: [TitleCasePipe],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    tasksStatisticChartComponent = el.query(By.directive(TasksStatisticChartComponent)).injector.get(TasksStatisticChartComponent);
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should have darkTheme enabled', () => {
    component.darkTheme = true;
    fixture.detectChanges();

    expect(tasksStatisticChartComponent.darkTheme).toBeTrue();
    expect(tasksStatisticChartComponent.chartColors).toEqual([{
      borderColor: tasksStatisticChartComponent['darkColor'],
      backgroundColor: tasksStatisticChartComponent['darkColor'],
      pointBackgroundColor: tasksStatisticChartComponent['darkColor'],
    }]);
  });

  it('should have darkTheme disabled', () => {
    fixture.detectChanges();

    expect(tasksStatisticChartComponent.darkTheme).toBeFalse();
    expect(tasksStatisticChartComponent.chartColors).toEqual([{
      borderColor: tasksStatisticChartComponent['lightColor'],
      backgroundColor: tasksStatisticChartComponent['lightColor'],
      pointBackgroundColor: tasksStatisticChartComponent['lightColor'],
    }]);
  });

  it('should transform value to TitleCase', () => {
    expect(tasksStatisticChartComponent.transform('test value')).toBe('Test Value');
  });
});
