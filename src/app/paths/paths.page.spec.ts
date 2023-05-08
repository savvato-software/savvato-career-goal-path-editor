import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PathsPage } from './paths.page';

describe('PathsPage', () => {
  let component: PathsPage;
  let fixture: ComponentFixture<PathsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PathsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
