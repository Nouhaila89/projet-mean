import { Component, OnInit } from '@angular/core';
import { CategoryModel } from './models/category.model';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from './services/category.service';
import { SharedModule } from '../../common/shared/shared.module';
import { NgForm } from '@angular/forms';
import { SwalService } from '../../common/services/swal.service';
import { CategoryPipe } from './pipe/category.pipe';

@Component({
  selector: 'app-admin-category',
  standalone: true,
  imports: [SharedModule,CategoryPipe],
  templateUrl: './admin-category.component.html',
  styleUrl: './admin-category.component.css'
})
export class AdminCategoryComponent implements OnInit{
  categories: CategoryModel[] = [];
  updateCategory: CategoryModel = new CategoryModel();
  search: string = "";

  constructor(
    private _toastr: ToastrService,
    private _category: CategoryService,
    private _swal: SwalService
  ){}

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this._category.getAll(res=> this.categories = res);
  }

  add(form:NgForm){
    if (form.valid) {
      this._category.add(form.controls["name"].value,res=>{
        this._toastr.success(res.message);
        let element = document.getElementById("addModelCloseBtn");
        element?.click();
        form.reset();
        this.getAll();
      });
    }
  }

  get(model: CategoryModel){
    this.updateCategory = {...model};
  }
  
  update(form:NgForm){
    if (form.valid) {
      this._category.update(this.updateCategory, res=>{
        this._toastr.warning(res.message);
        this.getAll();
        let element = document.getElementById("updateModalCloseBtn");
        element?.click();
      })
    }
  }

  removeById(model: CategoryModel){
    this._swal.callSwal(`${model.name} kategorisini silmek istiyormusunuz`, "" ,"Sil",()=>{
      this._category.removeById(model._id,res=>{
        this._toastr.info(res.message);
        this.getAll();
      })
    });
  }
}
