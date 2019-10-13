import { Component, OnInit } from '@angular/core';
import { ClientDetailsService } from '../../core/services/client-details/client-details.service';
import { AuthResponse } from '../../shared/models/auth-response';
import { AuthService } from '../../core/services/auth/auth.service';
import { catchError, map } from 'rxjs/operators';
import { BankAccount } from '../../shared/models/bank-account';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { BankAccountService } from '../../core/services/bank-account/bank-account.service';
import { BehaviorSubject, of } from 'rxjs';
import { ClientDetails } from '../../shared/models/client-details';
import { Router } from '@angular/router';
import { TransactModalComponent } from './transact-modal/transact-modal.component';
import { TransactionType } from '../../shared/models/types';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.page.html',
  styleUrls: ['./accounts.page.scss'],
})
export class AccountsPage implements OnInit {
  accountNumbers$;
  loading$ = new BehaviorSubject<boolean>(false);

  private authState: AuthResponse;

  constructor(
    private clientDetailsService: ClientDetailsService,
    private authService: AuthService,
    private modalController: ModalController,
    private bankAccountService: BankAccountService,
    private toastController: ToastController,
    private router: Router,
    private alertController: AlertController
  ) { }

  async ngOnInit() {
    this.authState = await this.authService.authState;

    this.accountNumbers$ = this.clientDetailsService
      .getClientDetails(this.authState.localId, this.authState.idToken)
      .pipe(catchError(error => {
        if (error.status === 401) {
          this.authService.logout();
          this.router.navigate([ '/login' ]);
        }
        const clientDetails: ClientDetails = {
          accounts: [],
          name: null,
          age: null,
          email: null
        };

        return of(clientDetails);
      }))
      .pipe(map(x => x.accounts));
  }

  async onDepositMoney(bankAccount: BankAccount) {
    const transactionType: TransactionType = 'deposit';
    const modal = await this.modalController.create({
      component: TransactModalComponent,
      componentProps: { bankAccount, transactionType }
    });

    await modal.present();
    const { data } = await modal.onDidDismiss();

    if (data) {
      this.loading$.next(true);

      this.bankAccountService
        .updateBankAccount(data, this.authState.idToken)
        .subscribe(async response => {
          this.loading$.next(false);

          const toast = await this.toastController.create({
            message: 'Deposit successful',
            duration: 3500,
            position: 'top'
          });

          await toast.present();
        });
    }
  }

  async onWithdrawMoney(bankAccount: BankAccount) {
    const transactionType: TransactionType = 'withdraw';
    const noFunds = (parseFloat(bankAccount.overdraft.toFixed(2)) + parseFloat(bankAccount.balance.toFixed(2))) === 0;

    if (noFunds) {
      const alert = await this.alertController.create({
        header: 'Insufficient funds',
        // tslint:disable-next-line:max-line-length
        message: 'You have insufficient funds available to carry out a withdrawal. Please deposit funds into your account in order to make withdrawals.',
        buttons: [
          {
            text: 'Dismiss',
            role: 'cancel'
          }
        ]
      });

      return await alert.present();
    }

    const modal = await this.modalController.create({
      component: TransactModalComponent,
      componentProps: { bankAccount, transactionType }
    });

    await modal.present();
    const { data } = await modal.onDidDismiss();

    if (data) {
      this.loading$.next(true);

      this.bankAccountService
        .updateBankAccount(data, this.authState.idToken)
        .subscribe(async response => {
          this.loading$.next(false);

          const toast = await this.toastController.create({
            message: 'Withdrawal successful',
            duration: 3500,
            position: 'top'
          });

          await toast.present();
        });
    }
  }

}
