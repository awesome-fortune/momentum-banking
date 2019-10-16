import { Component, OnInit } from '@angular/core';
import { ClientDetailsService } from '../../core/services/client-details/client-details.service';
import { ClientDetails } from '../../shared/models/client-details';
import { AuthService } from '../../core/services/auth/auth.service';
import { AuthResponse } from '../../shared/models/auth-response';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: [ './profile.page.scss' ],
})
export class ProfilePage implements OnInit {
  clientDetails: ClientDetails;

  constructor(
    private authService: AuthService,
    private clientDetailsService: ClientDetailsService,
    private alertController: AlertController,
    private router: Router
  ) {
  }

  async ngOnInit() {
    const authState: AuthResponse = await this.authService.authState;

    this.clientDetailsService
      .getClientDetails(authState.localId, authState.idToken)
      .pipe(catchError(error => {
          if (error.status === 401) {
            this.authService.logout();
            this.router.navigate([ '/login' ]);
          }

          return EMPTY;
        }))
      .subscribe(clientDetails => {
        this.clientDetails = {
          accounts: clientDetails.accounts || null,
          age: clientDetails.age || null,
          email: authState.email || null,
          name: clientDetails.name || null
        };
      });
  }

  async logout() {
    const alert = await this.alertController.create({
      header: 'Log out',
      message: 'Would you like to exit the application?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
        },
        {
          text: 'Yes',
          cssClass: 'danger',
          handler: () => {
            this.authService.logout();
            this.router.navigate([ '/login' ]);
          }
        }
      ]
    });

    await alert.present();
  }

}
