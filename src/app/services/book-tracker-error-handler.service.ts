import {ErrorHandler, Injectable} from '@angular/core';
import {BookTrackerErrors} from '../models/bookTrackerErrors';

@Injectable()
export class BookTrackerErrorHandlerService implements ErrorHandler {

  constructor() { }

  handleError(error: any): void {
    const customError: BookTrackerErrors = new BookTrackerErrors();
    customError.errorNumber = 200;
    customError.message = (<Error>error).message;
    customError.friendlyMessage = 'An error occurred, please try again.';

    console.log(customError);
  }
}
