import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LaboursPage } from './labours.page';

describe('LaboursPage', () => {
  let component: LaboursPage;
  let fixture: ComponentFixture<LaboursPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaboursPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LaboursPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
