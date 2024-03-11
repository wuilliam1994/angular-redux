import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkerDataService {

  private listWorkerData: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
 

  get getListWorker() {
    
    return this.listWorkerData.asObservable();
  }

  set setListWorker(data: any[]) {
    this.listWorkerData.next(data);
  }

}
