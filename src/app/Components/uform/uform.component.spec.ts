import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UFormComponent } from './uform.component';

describe('UFormComponent', () => {
  let component: UFormComponent;
  let fixture: ComponentFixture<UFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
