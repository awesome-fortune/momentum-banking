import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { OpenNativeSettings } from '@ionic-native/open-native-settings/ngx';

@Component({
  selector: 'app-internet-disconnected-modal',
  templateUrl: './internet-disconnected-modal.component.html',
  styleUrls: ['./internet-disconnected-modal.component.scss'],
})
export class InternetDisconnectedModalComponent implements OnInit {

  constructor(
    private openNativeSettings: OpenNativeSettings,
    private modalController: ModalController
  ) { }

  ngOnInit() {}

  async dismissModal() {
    await this.modalController.dismiss();
  }

  async openSettings() {
    await this.openNativeSettings.open('settings');
    this.dismissModal();
  }

}
