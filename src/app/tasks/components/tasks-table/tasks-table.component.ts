import { Component, ChangeDetectionStrategy, Output, EventEmitter, ViewChild, OnChanges, AfterViewInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { Task } from 'src/app/models';
import { Constants } from 'src/app/shared/classes';
import { AbstractTasksListComponent } from '../abstract.tasks-list.component';

@Component({
  selector: 'app-tasks-table',
  templateUrl: './tasks-table.component.html',
  styleUrls: ['./tasks-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksTableComponent extends AbstractTasksListComponent implements OnChanges, AfterViewInit {
  @Output() taskRemove = new EventEmitter<Task>();
  @ViewChild(MatSort) private sort: MatSort;
  @ViewChild(MatPaginator) private paginator: MatPaginator;

  pageSizeOptions = Constants.PAGE_SIZE_OPTIONS;
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = [
    'color',
    'id',
    'name',
    'date',
    'priority',
    'category',
    'status',
  ];

  ngOnChanges() {
    this.dataSource.data = this.tasks;
    setTimeout(() => this.dataSource.paginator = this.paginator, 0);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    // @ts-ignore
    this.dataSource.sortingDataAccessor = (task: Task, sortHeaderId: string) => {
      switch (sortHeaderId) {
        case 'name': return task.name;
        case 'date': return task.date;
        case 'priority': return task.priority;
        case 'category': return task.category;
      }
    };
  }

  onTaskRemove(task: Task) {
    this.taskRemove.emit(task);
  }

  onTaskCheck({ checked }: MatCheckboxChange, task: Task) {
    this.dispatchEdit({ ...task, completed: checked });
  }

}
