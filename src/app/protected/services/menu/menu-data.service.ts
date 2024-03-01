import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Menu } from '../../interfaces/menu.interface';

@Injectable({
  providedIn: 'root'
})
export class MenuDataService {
  private listMenuData: BehaviorSubject<Menu[]> = new BehaviorSubject<Menu[]>([]);

  get getListMenu() {
    return this.listMenuData.asObservable();
  }

  set setListMenu(data: Menu[]) {
    this.listMenuData.next(data);
  }
}