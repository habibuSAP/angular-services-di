import {Component, OnInit, VERSION} from '@angular/core';

import { Book } from 'app/models/book';
import { Reader } from 'app/models/reader';
import {LoggerService} from '../services/logger.service';
import {DataService} from '../services/data.service';
import {BookTrackerErrors} from '../models/bookTrackerErrors';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  allBooks: Book[] ;
  allReaders: Reader[] ;
  mostPopularBook: Book;

  constructor(private loggerService: LoggerService,
              private dataService: DataService,
              private title: Title) {
    this.loggerService.log('Creating the dashboard');
  }

  ngOnInit() {
    this.allBooks = this.dataService.getAllBooks();
    // this.allReaders = this.dataService.getAllReaders();
    this.dataService.getAllReaders()
      .subscribe(
        (data: Reader[] | BookTrackerErrors) => this.allReaders = <Reader[]>data,
        err => console.log(err),
        () => console.log('All done getting readers!')
      );
    this.mostPopularBook = this.dataService.mostPopularBook;

    // this.dataService.getAuthorRecommendation(-1).then(
    //   (author: string) => this.loggerService.log(author),
    //   (error: string) => this.loggerService.error(`The promise was rejected: ${error}`)
    // ).catch((error: Error) => this.loggerService.error(error.message));
    this.getAuthorRecommendationAsync(1);
    this.title.setTitle(`Book tracker ${VERSION.full}`)
    this.loggerService.log('Done with dashboard initialization');
    throw new Error('Ugly technical error!');
  }

  deleteBook(bookID: number): void {
    console.warn(`Delete book not yet implemented (bookID: ${bookID}).`);
  }

  deleteReader(readerID: number): void {
    console.warn(`Delete reader not yet implemented (readerID: ${readerID}).`);
  }

  private async getAuthorRecommendationAsync(readerID: number): Promise<void> {
    try {
      const author: string = await this.dataService.getAuthorRecommendation(readerID);
      this.loggerService.log(author);
    } catch (error) {
      this.loggerService.error(error);
    }
  }
}
