import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MilestonesPage } from './milestones.page';

describe('MilestonesPage', () => {
  let component: MilestonesPage;
  let fixture: ComponentFixture<MilestonesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MilestonesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
