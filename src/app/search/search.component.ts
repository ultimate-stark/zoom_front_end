import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { searchService } from "./search.service";
import { Subscription } from "rxjs";
import { Book } from '../Book/book.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  relatedBooks = [];
  private query: string;
  searchedBooks = [];
  private searchedBooksSub: Subscription;
  constructor(
    public searchService: searchService,
    public route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      if (params.has('q')) {
        this.query = params.get('q')
        if (this.query.length > 2) {
          this.searchService.searchBooks(this.query);
          this.searchedBooksSub = this.searchService.getbookUpdateListener().subscribe((bookData: { books }) => {
          console.log(bookData.books)
            this.searchedBooks = bookData.books;
            console.log(this.searchedBooks)
            if (bookData.books.length > 0) {
              console.log(bookData.books[0].category)
              this.elasticFN(bookData.books[0].category)
            } else {
              return null
            }

          });
        }

      }
    });
  }

  elasticFN(category) {
    if (category == category) {
      console.log(category)
      console.log('do Elastic')
      this.searchService.relatedBook(category);
      this.searchedBooksSub = this.searchService.searchbookUpdateListener().subscribe((bookData: { books }) => {
        console.log(bookData)
        this.relatedBooks = bookData.books;
        console.log(this.relatedBooks, "aaaaaaaaaaa")
      });
    } else {
      return null
    }
  }

  ngOnDestroy() {
    this.searchedBooksSub.unsubscribe();

  }


}
