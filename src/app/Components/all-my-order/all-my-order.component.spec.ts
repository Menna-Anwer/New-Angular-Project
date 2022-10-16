import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllMyOrderComponent } from './all-my-order.component';

describe('AllMyOrderComponent', () => {
  let component: AllMyOrderComponent;
  let fixture: ComponentFixture<AllMyOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllMyOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllMyOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
