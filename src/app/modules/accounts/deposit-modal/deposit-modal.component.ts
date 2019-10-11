import { Component, Input, OnInit } from '@angular/core';
import { BankAccount } from '../../../shared/models/bank-account';
import { AlertController, ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { distinctUntilChanged, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-deposit-modal',
  templateUrl: './deposit-modal.component.html',
  styleUrls: [ './deposit-modal.component.scss' ],
})
export class DepositModalComponent implements OnInit {
  @Input()
  bankAccount: BankAccount;

  depositForm: FormGroup;

  get depositAmount() {
    return this.depositForm.get('depositAmount');
  }

  constructor(
    private modalController: ModalController,
    private fb: FormBuilder,
    private alertController: AlertController
  ) {
  }

  ngOnInit() {
    this.depositForm = this.fb.group({
      depositAmount: [ null, [ Validators.required ] ]
    });

    this.depositAmount.valueChanges.pipe(
      startWith(0),
      distinctUntilChanged())
      .subscribe(data => {
        if (data === 0) {
          this.depositAmount.setErrors({ zeroAmount: true });
        }
      });
  }

  async dismissModal(bankAccount: BankAccount) {
    await this.modalController.dismiss(bankAccount);
  }

  async depositMoney() {
    if (this.depositForm.valid) {
      const balance = parseFloat(this.bankAccount.balance.toString());
      const deposit = this.depositAmount.value;

      if (deposit === 0) {
        this.depositAmount.setErrors({ zeroAmount: true });
        return;
      }

      const alert = await this.alertController.create({
        header: 'Confirm deposit',
        message: `Would you like to continue with the deposit of R${deposit} into your account?`,
        buttons: [
          {
            text: 'No',
            role: 'cancel'
          },
          {
            text: 'Yes',
            cssClass: 'success',
            handler: () => {
              this.bankAccount.balance = balance + deposit;
              this.dismissModal(this.bankAccount);
            }
          }
        ]
      });

      await alert.present();
    }
  }

}
