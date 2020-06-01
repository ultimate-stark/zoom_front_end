import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { NgwWowService } from 'ngx-wow';
import { PageEvent } from "@angular/material";
import { Subscription } from "rxjs";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Book } from "../book.model";
import { booksService } from "../books.service";
import { AuthService } from "../../auth/auth.service";
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit, OnDestroy {

  books: Book[] = [];
  filteredBooks: Book[] = [];
  searchKey: string;
  pageActual: number = 1;
  isLoading: boolean = false;
  totalBooks = 0;
  booksPerPage = 3;
  pageSizeOptions = [1, 2, 5, 10];
  userIsAuthenticated = false;
  userId: string;
  private booksSub: Subscription;
  private authStatusSub: Subscription;
  form: FormGroup;
  currentPage: any;
  currentIndexImg: number = 0;
  carouslLength;
  carouselImgs;
  @ViewChild('homeCarousel', { static: true }) homeCarousel: ElementRef;

  constructor(
    private wowService: NgwWowService,
    public booksService: booksService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.booksService.isLoading = true;
    console.log(this.booksService.isLoading)
    this.booksService.getBooks(this.booksPerPage, this.currentPage);
    this.userId = this.authService.getUserId();
    this.booksSub = this.booksService.getbookUpdateListener()
      .subscribe((bookData: { books: Book[]; bookCount: number }) => {
        this.totalBooks = bookData.bookCount;
        this.books = bookData.books;
        console.log(this.books)
      });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
      });
    window.scrollTo({
      top: 0,
      behavior: 'auto'
    })

    // Fire Wow animation Service
    this.wowService.init();
  }

  onChangedPage(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex + 1;
    this.booksPerPage = pageData.pageSize;
    this.booksService.getBooks(this.booksPerPage, this.currentPage);
  }
  onDelete(bookId: string) {
    this.booksService.deleteBook(bookId).subscribe(() => {
      this.booksService.getBooks(this.booksPerPage, this.currentPage);
    }, () => {
    });
  }
  // onPageChange(page: number) {
  //   console.log(page);
  //   this.currentPage = 3;
  // }

  ngOnDestroy() {
    this.booksSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }

}
