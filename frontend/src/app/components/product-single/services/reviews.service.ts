import { Injectable } from '@angular/core';
import { GenericHttpService } from '../../../common/services/generic-http.service';
import { MessageResponseModel } from '../../../common/models/message.response.model';
import { ReviewsModel } from '../models/reviews.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  constructor(
    private _http: GenericHttpService
  ) { }

  
  add(model: ReviewsModel, callBack: (res: MessageResponseModel)=>void){
    this._http.post<MessageResponseModel>("reviews/add", model, res=> callBack(res));
  }
  
  getAllReviews(productId: any, callBack: (res: ReviewsModel[])=> void){
    this._http.get<ReviewsModel[]>(`reviews/getAllReviews/${productId}`, res => callBack(res));
  }
  
  
}
