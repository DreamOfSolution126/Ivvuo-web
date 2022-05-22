import { TestBed, inject } from '@angular/core/testing';

import { WorkshopGuardService } from './workshop-guard.service';

describe('WorkshopGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WorkshopGuardService]
    });
  });

  it('should be created', inject([WorkshopGuardService], (service: WorkshopGuardService) => {
    expect(service).toBeTruthy();
  }));
});
