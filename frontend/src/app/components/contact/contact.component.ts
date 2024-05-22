import { Component } from '@angular/core';
import { SharedModule } from '../../common/shared/shared.module';
import { MessageResponseModel } from '../../common/models/message.response.model';
import { ContactModel } from './models/contact.model';
import { GenericHttpService } from '../../common/services/generic-http.service';
import { ContactService } from './services/contact.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [SharedModule,],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

  constructor(
    private _contactService: ContactService,
    private _toastr: ToastrService,
  ){

  }


  add(form: NgForm){
    if(form.valid){
      let contact = new ContactModel
      contact.name = form.value["name"];
      contact.email = form.value["email"];
      contact.message = form.value["message"];

      this._contactService.add(contact, res=>{
        this._toastr.success(res.message);
        form.reset();
      })
    }
  }

}
