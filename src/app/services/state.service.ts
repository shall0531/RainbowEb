import { Injectable } from '@angular/core';
import { AccountModel } from '../models/account.model';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  _signin: boolean;
  _account: AccountModel;
  constructor() { }

  get signin():boolean{
    return this._signin;
  }
  set signin(signin: boolean){
    this._signin = signin;
  }
  get account(){
    return this._account;
  }
  set account(account:any){
    this._account = account;
  }
}
