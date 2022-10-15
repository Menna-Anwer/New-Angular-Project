import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UOrderComponent } from './uorder.component';

describe('UOrderComponent', () => {
  let component: UOrderComponent;
  let fixture: ComponentFixture<UOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
