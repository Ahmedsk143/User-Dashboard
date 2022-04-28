import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubUserComponent } from './sub-user.component';

describe('SubUserComponent', () => {
  let component: SubUserComponent;
  let fixture: ComponentFixture<SubUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
