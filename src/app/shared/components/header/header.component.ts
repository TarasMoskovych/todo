import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState, tasksShowStatisticSelector, ToggleStatistic, categoriesSelectedSelector } from 'src/app/core/+store';
import { TutorialService } from 'src/app/core/services';
import { Category } from 'src/app/models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  selectedCategory$: Observable<Category> = this.store.select(categoriesSelectedSelector);
  statistic$: Observable<boolean> = this.store.select(tasksShowStatisticSelector);

  constructor(
    private store: Store<AppState>,
    private tutorialService: TutorialService,
  ) { }

  onToggleStatistic(e: MouseEvent, toggler: boolean) {
    e.preventDefault();
    this.store.dispatch(new ToggleStatistic(toggler));
  }

  onStartTutorial() {
    this.tutorialService.start();
  }
}
