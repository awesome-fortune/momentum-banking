import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BankAccount } from '../../../shared/models/bank-account';
import { BankAccountService } from '../../../core/services/bank-account/bank-account.service';
import { AuthService } from '../../../core/services/auth/auth.service';
import { AuthResponse } from '../../../shared/models/auth-response';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-account-card',
  templateUrl: './account-card.component.html',
  styleUrls: [ './account-card.component.scss' ],
})
export class AccountCardComponent implements OnInit {
  @Input()
  accountNumber;

  @Output()
  depositMoney: EventEmitter<BankAccount> = new EventEmitter();

  @Output()
  withdrawMoney: EventEmitter<BankAccount> = new EventEmitter();

  bankAccount: BankAccount;
  loading$ = new BehaviorSubject<boolean>(false);

  constructor(
    private bankAccountService: BankAccountService,
    private authService: AuthService
  ) {
  }

  async ngOnInit() {
    this.loading$.next(true);

    const authState: AuthResponse = await this.authService.authState;
    this.bankAccountService
      .getBankAccount(this.accountNumber, authState.idToken)
      .subscribe(bankAccount => {
        this.loading$.next(false);
        this.bankAccount = bankAccount;
      });
  }

  emitDepositMoney() {
    this.bankAccount.accountNumber = this.accountNumber;
    this.depositMoney.emit(this.bankAccount);
  }

  emitWithdrawMoney() {
    this.bankAccount.accountNumber = this.accountNumber;
    this.withdrawMoney.emit(this.bankAccount);
  }

}
