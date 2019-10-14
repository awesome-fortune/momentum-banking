import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe, TitleCasePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AccountsPage } from './accounts.page';
import { AccountCardComponent } from './account-card/account-card.component';
import { TransactModalComponent } from './transact-modal/transact-modal.component';
import { AccountManagementModalComponent } from './account-management-modal/account-management-modal.component';

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
  providers: [ CurrencyPipe, TitleCasePipe ],
  entryComponents: [ TransactModalComponent, AccountManagementModalComponent ],
  declarations: [ AccountsPage, AccountCardComponent, TransactModalComponent, AccountManagementModalComponent ]
})
export class AccountsPageModule {
}
