import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Category } from '../../interfaces/category.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryDataService {
  private listCategoryData: BehaviorSubject<Category[]> = new BehaviorSubject<Category[]>([]);

  get getListCategory() {
    return this.listCategoryData.asObservable();
  }

  set setListCategory(data: Category[]) {
    this.listCategoryData.next(data);
  }
}