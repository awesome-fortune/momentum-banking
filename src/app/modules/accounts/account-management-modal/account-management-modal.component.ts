import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BankAccount } from '../../../shared/models/bank-account';
import { AlertController, ModalController } from '@ionic/angular';
import { AccountActionType, OverdraftLimitUpdate } from '../../../shared/models/types';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { distinctUntilChanged, startWith, takeUntil } from 'rxjs/operators';
import { CurrencyPipe } from '@angular/common';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-account-management-modal',
  templateUrl: './account-management-modal.component.html',
  styleUrls: [ './account-management-modal.component.scss' ],
})
export class AccountManagementModalComponent implements OnInit, OnDestroy {
  @Input()
  accountManagementTypeAction: AccountActionType;

  @Input()
  bankAccount: BankAccount;

  accountManagementForm: FormGroup;
  newAccountForm: FormGroup;

  private overdraftLimitUpdate: OverdraftLimitUpdate;
  private unsubscribe$ = new Subject();

  get overdraftLimitAmount() {
    return this.accountManagementForm.get('overdraftLimitAmount');
  }

  get initialOpeningBalance() {
    return this.newAccountForm.get('initialOpeningBalance');
  }

  get initialOverdraftLimit() {
    return this.newAccountForm.get('initialOverdraftLimit');
  }

  constructor(
    private modalController: ModalController,
    private fb: FormBuilder,
    private alertController: AlertController,
    private currencyPipe: CurrencyPipe
  ) {
  }

  ngOnInit() {
    if (this.accountManagementTypeAction === 'manage') {
      this.initAccountManagementForm();
    } else {
      this.initNewAccountForm();
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onChangeOverdraftLimitUpdate(data) {
    this.overdraftLimitUpdate = data.detail.value;
  }

  async dismissModal(bankAccount: BankAccount) {
    await this.modalController.dismiss(bankAccount);
  }

  async openNewAccount() {
    if (this.newAccountForm.valid) {
      this.bankAccount.balance = this.initialOpeningBalance.value;
      this.bankAccount.overdraft = this.initialOverdraftLimit.value;

      const alert = await this.alertController.create({
        header: 'Open new bank account',
        message: `
        Account number: ${this.bankAccount.accountNumber}
        Opening balance: ${this.currencyPipe.transform(this.bankAccount.balance, 'R')},
        Overdraft limit: ${this.currencyPipe.transform(this.bankAccount.overdraft, 'R')}
        `,
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel'
          },
          {
            text: 'Confirm',
            handler: () => {
              this.dismissModal(this.bankAccount);
            }
          }
        ]
      });

      await alert.present();
    }
  }

  async changeAccountLimits() {
    if (this.accountManagementForm.valid) {
      const overdraft = this.bankAccount.overdraft;
      const amount: number = this.overdraftLimitAmount.value;

      const alert = await this.alertController.create({
        header: `Confirm overdraft limit ${this.overdraftLimitUpdate === 'increase-overdraft' ? 'increase' : 'decrease'}`,
        // tslint:disable-next-line:max-line-length
        message: `${this.overdraftLimitUpdate === 'increase-overdraft' ? 'Increase' : 'Decrease'} overdraft limit by ${this.currencyPipe.transform(amount, 'R')}?`,
        buttons: [
          {
            text: 'No',
            role: 'cancel'
          },
          {
            text: 'Yes',
            cssClass: 'success',
            handler: () => {
              switch (this.overdraftLimitUpdate) {
                case 'increase-overdraft':
                  this.bankAccount.overdraft = overdraft + amount;
                  break;
                case 'decrease-overdraft':
                  this.bankAccount.overdraft = overdraft - amount;
                  break;
              }

              this.dismissModal(this.bankAccount);
            }
          }
        ]
      });

      await alert.present();
    }
  }

  private initAccountManagementForm() {
    this.accountManagementForm = this.fb.group({
      overdraftLimitAmount: [ '', [ Validators.required, Validators.min(1) ] ],
      increaseOverdraftLimit: [ true ],
      decreaseOverdraftLimit: { value: false, disabled: parseFloat(this.bankAccount.overdraft.toFixed(2)) === 0 }
    });

    this.overdraftLimitAmount.valueChanges
      .pipe(
        distinctUntilChanged(),
        takeUntil(this.unsubscribe$))
      .subscribe(amount => {
        const overdraft = parseFloat(this.bankAccount.overdraft.toFixed(2));
        const balance = parseFloat(this.bankAccount.balance.toFixed(2));

        if (this.overdraftLimitUpdate === 'decrease-overdraft'
          && (overdraft - amount < 0)
          || ((balance < 0) && (overdraft - amount < balance * -1))) {
          this.overdraftLimitAmount.setErrors({ invalidAmount: true });
        }
      });
  }

  private initNewAccountForm() {
    this.newAccountForm = this.fb.group({
      initialOverdraftLimit: [ null, [ Validators.required, Validators.min(0) ] ],
      initialOpeningBalance: [ null, [ Validators.required, Validators.min(0) ] ]
    });
  }
}
