import { TestBed } from '@angular/core/testing';

import { MailService } from './mailservice.service';

describe('MailserviceService', () => {
  let service: MailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
