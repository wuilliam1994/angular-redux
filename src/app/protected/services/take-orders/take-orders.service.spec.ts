import { TestBed } from '@angular/core/testing';

import { TakeOrdersService } from './take-orders.service';

describe('TakeOrdersService', () => {
  let service: TakeOrdersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TakeOrdersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
