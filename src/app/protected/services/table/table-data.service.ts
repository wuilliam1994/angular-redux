import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Table } from '../../interfaces/table.interface';

@Injectable({
  providedIn: 'root'
})
export class TableDataService {
  private listTableData: BehaviorSubject<Table[]> = new BehaviorSubject<Table[]>([]);

  get getListTable() {
    return this.listTableData.asObservable();
  }

  set setListTable(data: Table[]) {
    this.listTableData.next(data);
  }
}
