import { Component, OnInit } from '@angular/core';
import {sdk} from '../modules/sdk';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  version = sdk.version();
}
