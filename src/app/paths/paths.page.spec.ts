import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PathsPage } from './paths.page';

describe('PathsPage', () => {
  let component: PathsPage;
  let fixture: ComponentFixture<PathsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PathsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PathsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
