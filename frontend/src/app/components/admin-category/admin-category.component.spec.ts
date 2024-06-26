import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoryModel } from '../models/category.model';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseUrl = 'http://localhost:5000/api/categories';

  constructor(private http: HttpClient) { }

  getAll(): Observable<CategoryModel[]> {
    return this.http.get<CategoryModel[]>(this.baseUrl);
  }

  add(category: CategoryModel): Observable<any> {
    return this.http.post(`${this.baseUrl}/add`, category);
  }

  update(category: CategoryModel): Observable<any> {
    return this.http.post(`${this.baseUrl}/update`, category);
  }

  removeById(categoryId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/removeById`, { _id: categoryId });
  }
}
