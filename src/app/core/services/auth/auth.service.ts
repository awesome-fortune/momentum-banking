import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { UserCredentials } from '../../../shared/models/user-credentials';
import { Observable } from 'rxjs';
import { AuthResponse } from '../../../shared/models/auth-response';
import { environment } from '../../../../environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient: HttpClient,
    private storage: Storage
  ) { }

  get authState(): Promise<AuthResponse> {
    return this.storage.get('AUTH_STATE');
  }

  login(userCredentials: UserCredentials): Observable<AuthResponse> {
    return this.httpClient.post(environment.api.loginUri, userCredentials)
      .pipe(
        tap(async (response: AuthResponse) => {
          if (response) {
            await this.storage.set('AUTH_STATE', response);
          }
        })
      );
  }

  async logout() {
    await this.storage.remove('AUTH_STATE');
  }
}
