import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantMinerComponent } from './merchant-miner.component';

describe('MerchantMinerComponent', () => {
  let component: MerchantMinerComponent;
  let fixture: ComponentFixture<MerchantMinerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchantMinerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchantMinerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
