import { Component, OnInit } from '@angular/core';
import { ClientDetailsService } from '../../core/services/client-details/client-details.service';
import { AuthResponse } from '../../shared/models/auth-response';
import { AuthService } from '../../core/services/auth/auth.service';
import { map } from 'rxjs/operators';
import { BankAccount } from '../../shared/models/bank-account';
import { ModalController } from '@ionic/angular';
import { DepositModalComponent } from './deposit-modal/deposit-modal.component';
import { WithdrawalModalComponent } from './withdrawal-modal/withdrawal-modal.component';
import { BankAccountService } from '../../core/services/bank-account/bank-account.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.page.html',
  styleUrls: ['./accounts.page.scss'],
})
export class AccountsPage implements OnInit {
  accountNumbers$;
  private authState: AuthResponse;

  constructor(
    private clientDetailsService: ClientDetailsService,
    private authService: AuthService,
    private modalController: ModalController,
    private bankAccountService: BankAccountService
  ) { }

  async ngOnInit() {
    this.authState = await this.authService.authState;

    this.accountNumbers$ = this.clientDetailsService
      .getClientDetails(this.authState.localId, this.authState.idToken)
      .pipe(map(x => x.accounts ? x.accounts : x));
  }

  async onDepositMoney(bankAccount: BankAccount) {
    const modal = await this.modalController.create({
      component: DepositModalComponent,
      componentProps: { bankAccount }
    });

    await modal.present();
    const { data } = await modal.onDidDismiss();

    this.bankAccountService.updateBankAccount(data);
  }

  async onWithdrawMoney(bankAccount: BankAccount) {
    const modal = await this.modalController.create({
      component: WithdrawalModalComponent,
      componentProps: { bankAccount }
    });

    return await modal.present();
  }

}
