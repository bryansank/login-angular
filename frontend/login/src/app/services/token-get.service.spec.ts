import { TestBed } from '@angular/core/testing';

import { TokenGetService } from './token-get.service';

describe('TokenGetService', () => {
  let service: TokenGetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenGetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
