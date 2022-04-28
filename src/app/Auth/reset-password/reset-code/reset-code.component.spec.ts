import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetCodeComponent } from './reset-code.component';

describe('ResetCodeComponent', () => {
  let component: ResetCodeComponent;
  let fixture: ComponentFixture<ResetCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetCodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
