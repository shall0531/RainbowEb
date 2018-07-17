import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, Form } from '@angular/forms';
import { CoreService } from '../../services/core.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  hide = true;
  form: FormGroup;

  constructor(private fb: FormBuilder,
    private coreService: CoreService) {
    this.form = this.fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
    
  }

  run() {
    this.coreService.sdk._onReady.subscribe(value=>{
      this.coreService.sdk.onReady(this.form.value['login'],this.form.value['password']);
    });
  }
  ngOnInit() {

  }

}
