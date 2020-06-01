import { Component, OnInit, OnDestroy } from '@angular/core';
import { booksService } from '../../Book/books.service';
import { Book } from '../../Book/book.model';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../auth/auth-data.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  booksLength: number;
  usersLength: number;
  booksSubscription: Subscription;
  usersSubscription: Subscription;
  constructor(private booksService: booksService, private authService: AuthService) { }


  ngOnInit() {
    this.getBooksLength();
    this.getUsersLength();
  }

  getBooksLength() {
    this.booksService.getBooks(null, null)
    this.booksSubscription = this.booksService.getbookUpdateListener()
      .subscribe((bookData: { books: Book[]; bookCount: number }) => {
        this.booksLength = bookData.books.length
      });
  }

  getUsersLength() {
    this.authService.getUsers(null, null);
    this.usersSubscription = this.authService.getuserUpdateListener()
      .subscribe((userData: { users: User[]; userCount: number }) => {
        this.usersLength = userData.users.length;
      });
  }

  ngOnDestroy() {
    this.booksSubscription.unsubscribe();
    this.usersSubscription.unsubscribe();
  }

}
