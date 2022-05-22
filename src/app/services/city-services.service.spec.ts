import { TestBed, inject } from '@angular/core/testing';

import { CityServicesService } from './city-services.service';

describe('CityServicesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CityServicesService]
    });
  });

  it('should be created', inject([CityServicesService], (service: CityServicesService) => {
    expect(service).toBeTruthy();
  }));
});
