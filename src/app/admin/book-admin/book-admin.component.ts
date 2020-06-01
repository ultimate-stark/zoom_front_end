import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageEvent } from "@angular/material";
import { Subscription } from "rxjs";
import { FormGroup, NgModel } from "@angular/forms";
import { Book } from "../../Book/book.model";
import { booksService } from "../../Book/books.service";
import { AuthService } from "../../auth/auth.service";
import { Router } from "@angular/router";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-book-admin',
  templateUrl: './book-admin.component.html',
  styleUrls: ['./book-admin.component.scss']
})

export class BookAdminComponent implements OnInit, OnDestroy {
  booksLength: number;
  books: Book[] = [];
  filteredBooks: Book[] = [];
  searchKey: string;
  pageActual: number = 1;
  totalBooks = 0;
  booksPerPage = 3;
  pageSizeOptions = [1, 2, 5, 10];
  userIsAuthenticated = false;
  userId: string;
  private booksSub: Subscription;
  private authStatusSub: Subscription;
  form: FormGroup;
  currentPage: any;
  constructor(
    public booksService: booksService,
    private authService: AuthService,
    private router: Router,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) { }


  ngOnInit(): void {
    this.booksService.isLoading = true;
    this.booksService.getBooks(this.booksPerPage, this.currentPage);
    this.userId = this.authService.getUserId();
    this.booksSub = this.booksService.getbookUpdateListener()
      .subscribe((bookData: { books: Book[]; bookCount: number }) => {
        this.totalBooks = bookData.bookCount;
        this.books = bookData.books;
        this.booksLength = this.books.length;
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




    // // Fire Wow animation Service
    // this.wowService.init();
  }

  onChangedPage(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex + 1;
    this.booksPerPage = pageData.pageSize;
    this.booksService.getBooks(this.booksPerPage, this.currentPage);
  }

  onDelete(modal: NgModel, bookId: string, title: string) {
    this.modalService.open(modal).result.then(
      (result) => {
        this.booksService.deleteBook(bookId).subscribe(
          () => {
            this.toastr.error('تم مسحه', title)
            this.booksService.getBooks(this.booksPerPage, this.currentPage);
          },
          (err) => {
          }
        )
      },
      (reason) => {
        return null
      }
    );
  }



  ngOnDestroy() {
    this.booksSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }

}
