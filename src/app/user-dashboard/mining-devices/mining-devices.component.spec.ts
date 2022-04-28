import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiningDevicesComponent } from './mining-devices.component';

describe('MiningDevicesComponent', () => {
  let component: MiningDevicesComponent;
  let fixture: ComponentFixture<MiningDevicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiningDevicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiningDevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
