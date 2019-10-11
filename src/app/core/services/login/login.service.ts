import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserCredentials } from '../../../shared/models/user-credentials';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthResponse } from '../../../shared/models/auth-response';
import { environment } from '../../../../environments/environment';
import { tap } from 'rxjs/operators';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public auth$ = new BehaviorSubject(false);

  constructor(
    private storage: Storage,
    private httpClient: HttpClient
  ) {
  }

  login(userCredentials: UserCredentials): Observable<AuthResponse> {
    return this.httpClient.post(environment.api.loginUri, userCredentials)
      .pipe(
        tap(async (response: AuthResponse) => {
          if (response) {
            await this.storage.set('ID_TOKEN', response.idToken);
            await this.storage.set('LOCAL_ID', response.localId);
            this.auth$.next(false);
          }
        })
      );
  }

  async logout() {
    await this.storage.remove('ID_TOKEN');
    await this.storage.remove('EXPIRES_IN');
    this.auth$.next(false);
  }

}
