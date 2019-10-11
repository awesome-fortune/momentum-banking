import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BankAccount } from '../../../shared/models/bank-account';
import { BankAccountService } from '../../../core/services/bank-account/bank-account.service';
import { AuthService } from '../../../core/services/auth/auth.service';
import { AuthResponse } from '../../../shared/models/auth-response';

@Component({
  selector: 'app-account-card',
  templateUrl: './account-card.component.html',
  styleUrls: ['./account-card.component.scss'],
})
export class AccountCardComponent implements OnInit {
  @Input()
  accountNumber: string;

  @Output()
  depositMoney: EventEmitter<BankAccount> = new EventEmitter();

  @Output()
  withdrawMoney: EventEmitter<BankAccount> = new EventEmitter();

  bankAccount: BankAccount;

  constructor(
    private bankAccountService: BankAccountService,
    private authService: AuthService
  ) { }

  async ngOnInit() {
    const authState: AuthResponse = await this.authService.authState;
    this.bankAccountService
      .getBankAccount(this.accountNumber, authState.idToken)
      .subscribe(bankAccount => {
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
