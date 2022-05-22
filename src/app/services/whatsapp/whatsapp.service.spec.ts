import { TestBed, inject } from '@angular/core/testing';

import { WhatsappService } from './whatsapp.service';

describe('WhatsappService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WhatsappService]
    });
  });

  it('should be created', inject([WhatsappService], (service: WhatsappService) => {
    expect(service).toBeTruthy();
  }));
});
