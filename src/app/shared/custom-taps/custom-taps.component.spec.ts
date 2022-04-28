import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomTapsComponent } from './custom-taps.component';

describe('CustomTapsComponent', () => {
  let component: CustomTapsComponent;
  let fixture: ComponentFixture<CustomTapsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomTapsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomTapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
