import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubUsersComponent } from './sub-users.component';

describe('SubUsersComponent', () => {
  let component: SubUsersComponent;
  let fixture: ComponentFixture<SubUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
