import { Component, OnInit, Input } from '@angular/core';
import { CoreService } from '../../services/core.service';
import { ContactModel } from '../../models/contact.model';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.less']
})
export class ContactComponent implements OnInit {
  @Input('value') contact: ContactModel;
  constructor(private coreService: CoreService) { 
  }

  ngOnInit() {
  }

}
