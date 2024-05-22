import { Injectable } from '@angular/core';
import { GenericHttpService } from '../../../common/services/generic-http.service';
import { ContactModel } from '../models/contact.model';
import { MessageResponseModel } from '../../../common/models/message.response.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(
    private _http: GenericHttpService
  ) { }

  add(model: ContactModel, callBack: (res : MessageResponseModel) => void){
    this._http.post<MessageResponseModel>("contact/add", model, res =>{
      callBack(res);
    })
  }

  getAll(callBack: (res: ContactModel[]) => void){
    this._http.get<ContactModel[]>("contact", res => 
      callBack(res)
    )
  }
}
