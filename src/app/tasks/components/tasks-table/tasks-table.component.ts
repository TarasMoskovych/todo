import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, ViewChild, OnChanges, AfterViewInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { Task } from 'src/app/models';
import { CategoryEntity } from 'src/app/core/+store';

@Component({
  selector: 'app-tasks-table',
  templateUrl: './tasks-table.component.html',
  styleUrls: ['./tasks-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksTableComponent implements OnChanges, AfterViewInit {
  @Input() categories: CategoryEntity = {};
  @Input() tasks: Task[];
  @Output() taskEdit = new EventEmitter<{ task: Task, openModal: boolean }>();
  @ViewChild(MatSort) private sort: MatSort;
  @ViewChild(MatPaginator) private paginator: MatPaginator;

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
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    // @ts-ignore
    this.dataSource.sortingDataAccessor = (task: Task, sortHeaderId: string) => {
      switch (sortHeaderId) {
        case 'name': return task.name;
        case 'date': return task.date;
        case 'priority': return task.priority?.id;
        case 'category': return task.categoryId;
      }
    };
  }

  onTaskEdit(task: Task) {
    this.dispatchEdit(task, true);
  }

  onTaskCheck({ checked }: MatCheckboxChange, task: Task) {
    this.dispatchEdit({ ...task, completed: checked });
  }

  private dispatchEdit(task: Task, openModal = false) {
    this.taskEdit.emit({ task, openModal });
  }

}
