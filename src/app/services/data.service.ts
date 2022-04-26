import { Injectable } from '@angular/core';
import {LoggerService} from './logger.service';
import {Reader} from '../models/reader';
import {allBooks, allReaders} from '../data';
import {Book} from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  mostPopularBook: Book = allBooks[0];
  constructor(private loggerService: LoggerService) { }

  setMostPopularBook(popularBook: Book): void {
    this.mostPopularBook = popularBook;
  }
  getAllReaders(): Reader[] {
    return allReaders;
  }

  getReaderById(id: number): Reader {
    return allReaders.find(reader => reader.readerID === id);
  }

  getAllBooks(): Book[] {
    return allBooks;
  }

  getBookById(id: number): Book {
    return allBooks.find(book => book.bookID === id);
  }
}

