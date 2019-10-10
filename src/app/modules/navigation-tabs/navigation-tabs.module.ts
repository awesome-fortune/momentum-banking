import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NavigationTabsPage } from './navigation-tabs.page';
import { NavigationTabsRoutingModule } from './navigation-tabs-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NavigationTabsRoutingModule
  ],
  declarations: [ NavigationTabsPage ]
})
export class NavigationTabsPageModule {
}
