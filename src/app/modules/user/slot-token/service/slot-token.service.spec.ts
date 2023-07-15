import { TestBed } from '@angular/core/testing';

import { SlotTokenService } from './slot-token.service';

describe('SlotTokenService', () => {
  let service: SlotTokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SlotTokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
