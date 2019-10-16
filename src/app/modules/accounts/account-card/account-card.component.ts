import { Component, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { BankAccount } from '../../../shared/models/bank-account';
import { BankAccountService } from '../../../core/services/bank-account/bank-account.service';
import { AuthService } from '../../../core/services/auth/auth.service';
import { AuthResponse } from '../../../shared/models/auth-response';
import { BehaviorSubject, Subject } from 'rxjs';
import { delay, takeUntil, throttleTime } from 'rxjs/operators';

@Component({
  selector: 'app-account-card',
  templateUrl: './account-card.component.html',
  styleUrls: [ './account-card.component.scss' ],
})
export class AccountCardComponent implements OnInit, OnDestroy {
  @Input()
  accountNumber;

  @Output()
  depositMoney: EventEmitter<BankAccount> = new EventEmitter<BankAccount>();

  @Output()
  withdrawMoney: EventEmitter<BankAccount> = new EventEmitter<BankAccount>();

  @Output()
  manageAccount: EventEmitter<BankAccount> = new EventEmitter<BankAccount>();

  @Output()
  addNewAccount: EventEmitter<BankAccount> = new EventEmitter<BankAccount>();

  bankAccount: BankAccount;
  loading$ = new BehaviorSubject<boolean>(false);

  private unsubscribe$ = new Subject();

  constructor(
    private bankAccountService: BankAccountService,
    private authService: AuthService
  ) {
  }

  async ngOnInit() {
    this.loading$.next(true);

    const authState: AuthResponse = await this.authService.authState;
    setTimeout(() => {
      this.bankAccountService
        .getBankAccount(this.accountNumber, authState.idToken)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(bankAccount => {
          this.loading$.next(false);
          this.bankAccount = bankAccount;

          if (this.bankAccount !== null) {
            this.bankAccount.accountNumber = this.accountNumber;
          }
        });
    }, 1000);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  emitDepositMoney() {
    this.depositMoney.emit(this.bankAccount);
  }

  emitWithdrawMoney() {
    this.withdrawMoney.emit(this.bankAccount);
  }

  emitManageAccount() {
    this.manageAccount.emit(this.bankAccount);
  }
}
