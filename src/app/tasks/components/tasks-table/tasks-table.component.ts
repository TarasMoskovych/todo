import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, ViewChild, OnChanges, AfterViewInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Task } from 'src/app/models';

@Component({
  selector: 'app-tasks-table',
  templateUrl: './tasks-table.component.html',
  styleUrls: ['./tasks-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksTableComponent implements OnChanges, AfterViewInit {
  @Input() tasks: Task[];
  @Output() taskCheck = new EventEmitter<Task>();
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

  onTaskCheck({ checked }: MatCheckboxChange, task: Task) {
    this.taskCheck.emit({ ...task, completed: checked });
  }

}
