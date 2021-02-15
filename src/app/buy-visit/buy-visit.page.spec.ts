import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BuyVisitPage } from './buy-visit.page';

describe('BuyVisitPage', () => {
  let component: BuyVisitPage;
  let fixture: ComponentFixture<BuyVisitPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyVisitPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BuyVisitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
