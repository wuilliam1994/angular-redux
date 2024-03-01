import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestDataService {
    private listImageData: BehaviorSubject<any> = new BehaviorSubject<any>([]);

    get getListTable() {
      return this.listImageData.asObservable();
    }
  
    set setListTable(data: any) {
      this.listImageData.next(data);
    }
}