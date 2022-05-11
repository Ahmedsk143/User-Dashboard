import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseMinerComponent } from './choose-miner.component';

describe('ChooseMinerComponent', () => {
  let component: ChooseMinerComponent;
  let fixture: ComponentFixture<ChooseMinerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseMinerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseMinerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
