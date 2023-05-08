import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CareerGoalsPage } from './career-goals.page';

describe('CareerGoalsPage', () => {
  let component: CareerGoalsPage;
  let fixture: ComponentFixture<CareerGoalsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CareerGoalsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
