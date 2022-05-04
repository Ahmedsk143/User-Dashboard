import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoosePlanSellerComponent } from './choose-plan-seller.component';

describe('ChoosePlanSellerComponent', () => {
  let component: ChoosePlanSellerComponent;
  let fixture: ComponentFixture<ChoosePlanSellerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChoosePlanSellerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoosePlanSellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
