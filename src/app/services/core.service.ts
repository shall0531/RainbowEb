import { Injectable } from '@angular/core';
import { SDK } from '../../modules/sdk';
import { AccountModel } from '../models/account.model';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  sdk = new SDK();
  constructor() {
    const login = 'liu.xiaoyi90@gmail.com';
    const password = 'Pass_test_1234';
  }
  runRainbow(login:string, password:string){
    console.log(login + ' ' + password);
    this.sdk.initialize(login, password);
  }
  get account(): AccountModel{
    return this.sdk.account;
  }
}
