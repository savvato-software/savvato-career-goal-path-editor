import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MilestonesPage } from './milestones.page';

describe('MilestonesPage', () => {
  let component: MilestonesPage;
  let fixture: ComponentFixture<MilestonesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MilestonesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MilestonesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
