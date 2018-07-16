import { Injectable } from '@angular/core';
import { SDK } from '../../modules/sdk';
import { AccountModel } from '../models/account.model';

@Injectable({
  providedIn: 'root'
})
export class CoreService {
  sdk = new SDK();
  constructor() {
  }
  runRainbow(login:string, password:string){
    console.log(login + ' ' + password);
    this.sdk.initialize(login, password);
  }
}
