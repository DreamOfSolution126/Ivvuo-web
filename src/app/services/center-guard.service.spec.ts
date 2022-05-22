import { TestBed, inject } from '@angular/core/testing';

import { CenterGuardService } from './center-guard.service';

describe('CenterGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CenterGuardService]
    });
  });

  it('should be created', inject([CenterGuardService], (service: CenterGuardService) => {
    expect(service).toBeTruthy();
  }));
});
