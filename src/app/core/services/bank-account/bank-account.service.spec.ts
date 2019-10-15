import { TestBed } from '@angular/core/testing';

import { BankAccountService } from './bank-account.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('BankAccountService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: BankAccountService = TestBed.get(BankAccountService);
    expect(service).toBeTruthy();
  });
});
