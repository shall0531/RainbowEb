import { Injectable } from '@angular/core';
import { SDK } from '../../modules/sdk';
import { AccountModel } from '../models/account.model';
import { StateService } from './state.service';

@Injectable({
  providedIn: 'root'
})
export class CoreService {
  sdk = new SDK(this.stateService);

  constructor(private stateService: StateService) {
    this.sdk.initialize();
  }
}
