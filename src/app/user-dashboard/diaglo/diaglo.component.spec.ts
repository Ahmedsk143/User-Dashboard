import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagloComponent } from './diaglo.component';

describe('DiagloComponent', () => {
  let component: DiagloComponent;
  let fixture: ComponentFixture<DiagloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagloComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
