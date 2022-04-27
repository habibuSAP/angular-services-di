import { BrowserModule } from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AddBookComponent } from './add-book/add-book.component';
import { AddReaderComponent } from './add-reader/add-reader.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditBookComponent } from './edit-book/edit-book.component';
import { EditReaderComponent } from './edit-reader/edit-reader.component';
import {LoggerService} from './services/logger.service';
import {PlainLoggerService} from './services/plain-logger.service';
import {error} from 'protractor';
import {DataService} from './services/data.service';
import {dataServiceFactory} from './services/data.service.factory';
import {HttpClientModule} from '@angular/common/http';
import {BookTrackerErrorHandlerService} from './services/book-tracker-error-handler.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AddBookComponent,
    EditReaderComponent,
    EditBookComponent,
    AddReaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    // PlainLoggerService,
    // {provide: LoggerService, useExisting: PlainLoggerService},
    // {provide: LoggerService, useClass: PlainLoggerService}
    // {provide: LoggerService, useValue: {
    //   log: (message: string) => console.log(`Message: ${message}`),
    //   error: (message: string) => console.log(`Problem: ${message}`)
    //   }},
    // {provide: DataService, useFactory: dataServiceFactory, deps: [LoggerService]}
    { provide: ErrorHandler, useClass: BookTrackerErrorHandlerService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
