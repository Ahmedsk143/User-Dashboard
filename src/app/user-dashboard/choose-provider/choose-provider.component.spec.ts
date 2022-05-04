import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseProviderComponent } from './choose-provider.component';

describe('ChooseProviderComponent', () => {
  let component: ChooseProviderComponent;
  let fixture: ComponentFixture<ChooseProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseProviderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
