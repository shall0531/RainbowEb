import { Injectable } from '@angular/core';
import { SDK } from '../../modules/sdk';
import { AccountModel } from '../models/account.model';

@Injectable({
  providedIn: 'root'
})
export class CoreService {
  sdk = new SDK();
 
  constructor() {
    this.sdk.initialize();
  }
}
