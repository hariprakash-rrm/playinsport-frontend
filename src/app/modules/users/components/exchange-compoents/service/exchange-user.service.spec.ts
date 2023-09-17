import { TestBed } from '@angular/core/testing';

import { ExchangeUserService } from './exchange-user.service';

describe('ExchangeUserService', () => {
  let service: ExchangeUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExchangeUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
