import { TestBed, inject } from '@angular/core/testing';

import { WorkShopService } from './work-shop.service';

describe('WorkShopService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WorkShopService]
    });
  });

  it('should be created', inject([WorkShopService], (service: WorkShopService) => {
    expect(service).toBeTruthy();
  }));
});
