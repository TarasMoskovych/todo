import { TitleCasePipe } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { Label, SingleOrMultiDataSet, Color } from 'ng2-charts';

import { ChartTheme } from 'src/app/models';

@Component({ template: '' })
export abstract class AbstractTasksStatisticChartComponent implements OnInit, OnChanges {
  @Input() darkTheme: boolean;

  protected readonly lightColor = '#fff';
  protected readonly darkColor = '#ddd';

  readonly chartTheme: ChartTheme = {
    borderColor: {
      default: this.lightColor,
      dark: this.darkColor,
    },
    backgroundColor: {
      default: this.lightColor,
      dark: this.darkColor,
    },
    pointBackgroundColor: {
      default: this.lightColor,
      dark: this.darkColor,
    },
  };
  chartData: SingleOrMultiDataSet = [];
  chartLabels: Label[] = [];
  chartOptions: ChartOptions;
  chartColors: Color[];

  constructor(protected titleCasePipe: TitleCasePipe) {}

  ngOnInit() {
    this.draw();
  }

  ngOnChanges(changes: SimpleChanges) {
    changes.darkTheme && this.toggleChartTheme();
  }

  protected draw(fontColor?: string, chartTheme?: Partial<ChartTheme>): void {
    this.chartOptions = {
      responsive: true,
      title: null,
       legend: {
        display: false
      },
      scales: {
        xAxes: [{
          stacked: true,
          ticks: {
            fontColor,
          },
        }],
        yAxes: [{
          stacked: true,
          ticks: {
            fontColor,
            min: 0,
            beginAtZero: true,
          },
        }]
      },
    };

    Object.assign(this.chartTheme, chartTheme);
    this.toggleChartTheme();
  }

  protected toggleChartTheme(): void {
    const theme = this.darkTheme ? 'dark' : 'default';

    this.chartColors = [
      {
        borderColor: this.chartTheme.borderColor[theme],
        backgroundColor: this.chartTheme.backgroundColor[theme],
        pointBackgroundColor: this.chartTheme.pointBackgroundColor[theme],
      },
    ];
  }

  protected transformToTitleCase(value: string): string {
    return this.titleCasePipe.transform(value);
  }

}
