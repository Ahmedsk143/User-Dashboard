import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoveryMessageComponent } from './recovery-message.component';

describe('RecoveryMessageComponent', () => {
  let component: RecoveryMessageComponent;
  let fixture: ComponentFixture<RecoveryMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecoveryMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecoveryMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
