import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  _signin: boolean;
  _contacts: boolean;
  constructor() { }

  get signin():boolean{
    return this._signin;
  }
  set signin(signin: boolean){
    this._signin = signin;
  }
  get contacts(){
    return this._contacts;
  }
  set contacts(contacts:any){
    this._contacts = contacts;
  }
}
