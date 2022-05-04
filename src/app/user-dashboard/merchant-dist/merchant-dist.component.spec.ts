import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantDistComponent } from './merchant-dist.component';

describe('MerchantDistComponent', () => {
  let component: MerchantDistComponent;
  let fixture: ComponentFixture<MerchantDistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchantDistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchantDistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
