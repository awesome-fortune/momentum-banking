import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClientDetails } from '../../../shared/models/client-details';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientDetailsService {

  constructor(private httpClient: HttpClient) {
  }

  getClientDetails(localId: string, idToken: string): Observable<ClientDetails> {
    return this.httpClient.get<ClientDetails>(`${environment.api.clientsBaseUri}/${localId}.json?auth=${idToken}`);
  }

  updateAccountList(accountNumbers: number[], localId: string, idToken) {
    return this.httpClient
      .put(
        `${environment.api.clientsBaseUri}/${localId}/accounts.json?auth=${idToken}`,
        accountNumbers
      );
  }
}
