import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SpinnerService } from './protected/services/spinner/spinner.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isLoading$ = this.spinner.isLoading$;
  constructor(private spinner: SpinnerService){
  }

}
