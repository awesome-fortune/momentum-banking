import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AccountsPage } from './accounts.page';
import { AccountCardComponent } from './account-card/account-card.component';
import { WithdrawalModalComponent } from './withdrawal-modal/withdrawal-modal.component';
import { DepositModalComponent } from './deposit-modal/deposit-modal.component';

const routes: Routes = [
  {
    path: '',
    component: AccountsPage
  }
];

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  entryComponents: [WithdrawalModalComponent, DepositModalComponent],
  declarations: [AccountsPage, AccountCardComponent, WithdrawalModalComponent, DepositModalComponent]
})
export class AccountsPageModule {}
