import { TestBed, inject } from '@angular/core/testing';

import { CampanasServicioService } from './campanas-servicio.service';

describe('CampanasServicioService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CampanasServicioService]
    });
  });

  it('should be created', inject([CampanasServicioService], (service: CampanasServicioService) => {
    expect(service).toBeTruthy();
  }));
});
