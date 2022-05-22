import { TestBed, inject } from '@angular/core/testing';

import { OrderReportsService } from './order-reports.service';

describe('OrderReportsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrderReportsService]
    });
  });

  it('should be created', inject([OrderReportsService], (service: OrderReportsService) => {
    expect(service).toBeTruthy();
  }));
});
