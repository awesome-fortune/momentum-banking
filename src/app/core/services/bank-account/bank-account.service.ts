import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BankAccount } from '../../../shared/models/bank-account';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BankAccountService {

  constructor(private httpClient: HttpClient) { }

  getBankAccount(accountNumber: string, idToken: string): Observable<BankAccount> {
    return this.httpClient.get<BankAccount>(`${environment.api.accountsBaseUri}/${accountNumber}.json?auth=${idToken}`)
  }

  updateBankAccount(bankAccount: BankAccount) {
    console.log(bankAccount);
  }
}
