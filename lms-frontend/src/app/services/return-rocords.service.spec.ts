import { TestBed } from '@angular/core/testing';

import { ReturnRocordsService } from './return-rocords.service';

describe('ReturnRocordsService', () => {
  let service: ReturnRocordsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReturnRocordsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
