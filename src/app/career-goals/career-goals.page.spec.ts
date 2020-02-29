import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CareerGoalsPage } from './career-goals.page';

describe('CareerGoalsPage', () => {
  let component: CareerGoalsPage;
  let fixture: ComponentFixture<CareerGoalsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CareerGoalsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CareerGoalsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
