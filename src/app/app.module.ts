import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { EffectsModule } from '@ngrx/effects';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
// import { environment } from 'src/environments/environment';
import { environment } from 'src/environments/environment.prod';
import { SpinnerInterceptor } from "./protected/shared/interceptor/spinner-interceptor";
// const config: SocketIoConfig = { url: environment.baseDirectorySocket, options: {} };
const config: SocketIoConfig = { url: environment.baseDirectorySocket, options: {} };
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    // EffectsModule.forRoot([])
    SocketIoModule.forRoot(config)
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
