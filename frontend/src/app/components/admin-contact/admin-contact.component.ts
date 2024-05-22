import { Component, OnInit } from '@angular/core';
import { ContactModel } from '../contact/models/contact.model';
import { ContactService } from '../contact/services/contact.service';
import { SharedModule } from '../../common/shared/shared.module';

@Component({
  selector: 'app-admin-contact',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './admin-contact.component.html',
  styleUrl: './admin-contact.component.css'
})
export class AdminContactComponent implements OnInit{
contacts: ContactModel[] = [];

constructor(
  private _contact: ContactService,
){}
  ngOnInit(): void {
    this.getAll();
  }

getAll(){
  this._contact.getAll(res => this.contacts = res);
}
}
