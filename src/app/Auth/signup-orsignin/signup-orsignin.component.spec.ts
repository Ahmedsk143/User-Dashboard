import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupOrsigninComponent } from './signup-orsignin.component';

describe('SignupOrsigninComponent', () => {
  let component: SignupOrsigninComponent;
  let fixture: ComponentFixture<SignupOrsigninComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupOrsigninComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupOrsigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
