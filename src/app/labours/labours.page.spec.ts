import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LaboursPage } from './labours.page';

describe('LaboursPage', () => {
  let component: LaboursPage;
  let fixture: ComponentFixture<LaboursPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LaboursPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
