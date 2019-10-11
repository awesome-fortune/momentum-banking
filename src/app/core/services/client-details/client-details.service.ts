import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClientDetails } from '../../../shared/models/client-details';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientDetailsService {

  constructor(private httpClient: HttpClient) {
  }

  getClientDetails(localId: string, idToken: string) {
    return this.httpClient.get<ClientDetails>(`${environment.api.clientsBaseUri}/${localId}.json?auth=${idToken}`);
  }
}
