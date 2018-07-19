import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.less']
})
export class MessageComponent implements OnInit {
  @Input('value') value: {
    text:string;
    from:string;
    type:string;
  }
  type:string
  constructor() { }

  ngOnInit() {
    this.type = this.value.type;
  }

}
