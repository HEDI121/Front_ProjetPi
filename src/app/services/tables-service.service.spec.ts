import { TestBed } from '@angular/core/testing';

import { TablesServiceService } from './tables-service.service';

describe('TablesServiceService', () => {
  let service: TablesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TablesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
