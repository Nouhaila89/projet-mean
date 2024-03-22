import { Injectable } from '@angular/core';
import { GenericHttpService } from '../../../common/services/generic-http.service';
import { MessageResponseModel } from '../../../common/models/message.response.model';
import { RequestModel } from '../../../common/models/request.model';
import { PaginationResultModel } from '../../../common/models/pagination.result.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private _http: GenericHttpService
  ) { }

  add(model: FormData, callBack: (res: MessageResponseModel)=>void){
    this._http.post<MessageResponseModel>("products/add", model, res=> callBack(res));
  }

  update(model: FormData, callBack: (res: MessageResponseModel)=>void){
    this._http.post<MessageResponseModel>("products/update", model, res=> callBack(res));
  }
  
  getAll(model: RequestModel, callBack: (res: MessageResponseModel)=>void){
    this._http.post<MessageResponseModel>("products/update", model, res=> callBack(res));
  }
}
