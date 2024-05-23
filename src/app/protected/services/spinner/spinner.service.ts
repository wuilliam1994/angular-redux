import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  isLoading$ = new Subject<boolean>();
  constructor() { }

  hideSpinner():void {
    this.isLoading$.next(true);
  }

  showSpinner():void {
    this.isLoading$.next(false);
  }
}
