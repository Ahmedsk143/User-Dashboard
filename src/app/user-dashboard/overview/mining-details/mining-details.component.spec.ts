import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiningDetailsComponent } from './mining-details.component';

describe('MiningDetailsComponent', () => {
  let component: MiningDetailsComponent;
  let fixture: ComponentFixture<MiningDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiningDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiningDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
