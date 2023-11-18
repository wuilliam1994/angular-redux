import { Injectable } from '@angular/core';
import { House } from '../../interfaces/house.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HouseDataService {

  private listHouseData: BehaviorSubject<House[]> = new BehaviorSubject<House[]>([]);
 

  get getListHouse() {
    
    return this.listHouseData.asObservable();
  }

  set setListHouse(data: House[]) {
    this.listHouseData.next(data);
  }

}
