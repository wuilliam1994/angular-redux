import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TakeOrdersComponent } from './take-orders.component';

describe('TakeOrdersComponent', () => {
  let component: TakeOrdersComponent;
  let fixture: ComponentFixture<TakeOrdersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TakeOrdersComponent]
    });
    fixture = TestBed.createComponent(TakeOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
