import { Injectable } from '@angular/core';
import {LoggerService} from './logger.service';
import {Reader} from '../models/reader';
import {allBooks, allReaders} from '../data';
import {Book} from '../models/book';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { catchError} from 'rxjs/operators';
import {BookTrackerErrors} from '../models/bookTrackerErrors';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  mostPopularBook: Book = allBooks[0];

  private static handleError(error: HttpErrorResponse): Observable<BookTrackerErrors> {
    const dataError = new BookTrackerErrors();
    dataError.errorNumber = 100;
    dataError.message = error.statusText;
    dataError.friendlyMessage = 'An error occurred retrieving data.';
    return throwError(dataError);
  }

  constructor(private loggerService: LoggerService,
              private http: HttpClient) { }

  setMostPopularBook(popularBook: Book): void {
    this.mostPopularBook = popularBook;
  }
  getAllReaders(): Observable<Reader[] | BookTrackerErrors> {
    return this.http.get<Reader[]>('/api/readers').pipe(
      catchError(DataService.handleError)
    );
  }

  getReaderById(id: number): Reader {
    return allReaders.find(reader => reader.readerID === id);
  }

  getAllBooks(): Observable<Book[] | BookTrackerErrors > {
    return this.http.get<Book[]>('/api/books').pipe(
      catchError(DataService.handleError)
    );
  }

  getBookById(id: number): Book {
    return allBooks.find(book => book.bookID === id);
  }

  getAuthorRecommendation(readerId: number): Promise<string> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (readerId <= 0) {
          reject('Invalid reader ID');
        } else {
          resolve('Dr. Seuss');
        }
      }, 2000);
    });
  }
}

