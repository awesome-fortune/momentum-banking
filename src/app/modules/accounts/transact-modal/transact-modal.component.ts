import { Component, Input, OnInit } from '@angular/core';
import { BankAccount } from '../../../shared/models/bank-account';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { CurrencyPipe, TitleCasePipe } from '@angular/common';
import { TransactionType } from '../../../shared/models/types';
import { distinctUntilChanged, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-transact-modal',
  templateUrl: './transact-modal.component.html',
  styleUrls: [ './transact-modal.component.scss' ],
})
export class TransactModalComponent implements OnInit {
  @Input()
  bankAccount: BankAccount;

  @Input()
  transactionType: TransactionType;

  form: FormGroup;

  get amount() {
    return this.form.get('amount');
  }

  constructor(
    private modalController: ModalController,
    private fb: FormBuilder,
    private alertController: AlertController,
    private currencyPipe: CurrencyPipe,
    private titleCasePipe: TitleCasePipe
  ) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      amount: [ null, [ Validators.required, Validators.min(1) ] ]
    });

    this.amount.valueChanges
      .pipe(
        startWith(0),
        distinctUntilChanged())
      .subscribe(amount => {
        const availableFunds = parseFloat(this.bankAccount.balance.toFixed(2)) + parseFloat(this.bankAccount.overdraft.toFixed(2));

        if ((this.transactionType === 'withdraw') && (availableFunds < amount)) {
          this.amount.setErrors({ insufficientFunds: true });
        }
      });
  }

  async dismissModal(bankAccount: BankAccount) {
    await this.modalController.dismiss(bankAccount);
  }

  async transact() {
    if (this.form.valid) {
      const balance = this.bankAccount.balance;
      const amount: number = this.amount.value;

      const alert = await this.alertController.create({
        header: `Confirm ${this.transactionType === 'deposit' ? 'deposit' : 'withdrawal'}`,
        // tslint:disable-next-line:max-line-length
        message: `${this.titleCasePipe.transform(this.transactionType)} ${this.currencyPipe.transform(amount, 'R')} ${this.transactionType === 'deposit' ? 'into' : 'from'} your account?`,
        buttons: [
          {
            text: 'No',
            role: 'cancel'
          },
          {
            text: 'Yes',
            cssClass: 'success',
            handler: () => {
              switch (this.transactionType) {
                case 'deposit':
                  this.bankAccount.balance = balance + amount;
                  break;
                case 'withdraw':
                  this.bankAccount.balance = balance - amount;
                  break;
                default:
                  throw new Error(`${this.transactionType} is not a supported transaction type`);
              }

              this.dismissModal(this.bankAccount);
            }
          }
        ]
      });

      await alert.present();
    }
  }

}
