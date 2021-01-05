import { Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { TestData, Category, Filter } from 'src/app/models';
import { SharedModule } from 'src/app/shared/shared.module';
import { CategoriesListComponent } from './categories-list.component';

const { categories } = TestData.data;

@Component({
  template: `
  <app-categories-list
    [categories]="categories"
    [filter]="filter"
    [selected]="selected"
    (sortByCategory)="onSortByCategory($event)"
    (categoryAdd)="onCategoryAdd()"
    (categoryEdit)="onCategoryEdit($event)"
  ></app-categories-list>
  `
})
class TestHostComponent {
  categories: Category[] = categories;
  filter: Filter;
  selected: Category;

  onSortByCategory(category: Category) {};
  onCategoryAdd() {};
  onCategoryEdit(category: Category) {};
}

describe('CategoriesListComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestHostComponent,
        CategoriesListComponent
      ],
      imports: [SharedModule],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render categories', () => {
    fixture.detectChanges();
    expect(el.queryAll(By.css('.nav-item')).length).toBe(2 + component.categories.length);
  });

  it('should render no results', () => {
    component.filter = { q: 'cat' };
    component.categories = [];
    fixture.detectChanges();
    expect(el.query(By.css('p.text-center')).nativeElement.textContent).toContain('No categories found');
  });

  it('should add "active" class on selected category', () => {
    component.selected = component.categories[0];
    fixture.detectChanges();
    expect(el.query(By.css('.active p')).nativeElement.textContent).toContain(component.categories[0].name);
  });

  it('should emit "sortByCategory" event with no arguments', () => {
    spyOn(component, 'onSortByCategory');
    fixture.detectChanges();

    el.query(By.css('.nav-item:first-child')).triggerEventHandler('click', null);
    expect(component.onSortByCategory).toHaveBeenCalledTimes(1);
    expect(component.onSortByCategory).toHaveBeenCalledWith(null);
  });

  it('should emit "sortByCategory" event with empty object', () => {
    spyOn(component, 'onSortByCategory');
    fixture.detectChanges();

    el.query(By.css('.nav-item:nth-child(2)')).triggerEventHandler('click', null);
    expect(component.onSortByCategory).toHaveBeenCalledTimes(1);
    expect(component.onSortByCategory).toHaveBeenCalledWith({} as Category);
  });

  it('should emit "sortByCategory" event with category object', () => {
    spyOn(component, 'onSortByCategory');
    fixture.detectChanges();

    el.query(By.css('.nav-item:last-child')).triggerEventHandler('click', null);
    expect(component.onSortByCategory).toHaveBeenCalledTimes(1);
    expect(component.onSortByCategory).toHaveBeenCalledWith(
      component.categories.sort((a: Category, b: Category) => a.name.localeCompare(b.name))[component.categories.length - 1]
    );
  });

  it('should emit "addCategory" event', () => {
    spyOn(component, 'onCategoryAdd');
    fixture.detectChanges();

    el.query(By.css('button[aria-label="Add new category"]')).nativeElement.click();
    expect(component.onCategoryAdd).toHaveBeenCalledTimes(1);
  });

  it('should emit "categoryEdit" event', () => {
    spyOn(component, 'onCategoryEdit');
    fixture.detectChanges();

    el.query(By.css(`button[aria-label="Edit ${component.categories[0].name}"]`)).nativeElement.click();
    expect(component.onCategoryEdit).toHaveBeenCalledTimes(1);
    expect(component.onCategoryEdit).toHaveBeenCalledWith(component.categories[0]);
  });
});
