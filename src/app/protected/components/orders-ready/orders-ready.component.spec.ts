import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersReadyComponent } from './orders-ready.component';

describe('OrdersReadyComponent', () => {
  let component: OrdersReadyComponent;
  let fixture: ComponentFixture<OrdersReadyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrdersReadyComponent]
    });
    fixture = TestBed.createComponent(OrdersReadyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
