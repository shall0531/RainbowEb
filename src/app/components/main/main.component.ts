import { Component, OnInit } from '@angular/core';
import { CoreService } from '../../services/core.service';
import { ContactModel } from '../../models/contact.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less']
})
export class MainComponent implements OnInit {
  contacts = new Array<ContactModel>();
  constructor(private coreService: CoreService) {
  }

  ngOnInit() {
    setTimeout(() => {
      console.log(this.coreService.sdk.contacts);
      //this.getContacts();
    }, 2000);
  }
  getContacts() {
    this.coreService.sdk.contacts.map(p => {
      this.contacts.push(new ContactModel(p.jid, p.lastname,
        p.avatar, p.name.value, p.imStatus,
        p.conversation, p.color, p._lastActivityMessage, p._displayName)
      )
    });
    console.log(this.contacts);
  }

}
