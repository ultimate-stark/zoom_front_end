import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { PageEvent } from "@angular/material";
import { Subscription } from "rxjs";
import { FormGroup, FormControl, Validators, NgModel } from "@angular/forms";
import { User } from "./../../auth/auth-data.model";
import { booksService } from "../../Book/books.service";
import { AuthService } from "../../auth/auth.service";
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {
  users: User[] = [];
  filteredUsers: User[] = [];
  searchKey: string;
  pageActual: number = 1;
  isLoading = false;
  totalUsers = 0;
  usersPerPage = 3;
  pageSizeOptions = [1, 2, 5, 10];
  userIsAuthenticated = false;
  userId: string;
  private usersSub: Subscription;
  private authStatusSub: Subscription;
  form: FormGroup;
  currentPage: any;
  booksPerPage: any;


  constructor(
    public booksService: booksService,
    private authService: AuthService,
    private router: Router,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) { }


  ngOnInit(): void {
    this.isLoading = true;
    this.authService.getUsers(this.usersPerPage, this.currentPage);
    this.userId = this.authService.getUserId();
    this.usersSub = this.authService.getuserUpdateListener()
      .subscribe((userData: { users: User[]; userCount: number }) => {
        this.isLoading = false;
        this.totalUsers = userData.userCount;
        this.users = userData.users;
        console.log(this.users)
      });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
        console.log(this.userId)
      });
    window.scrollTo({
      top: 0,
      behavior: 'auto'
    })

  }

  onDelete(modal: NgModel, userId: string, email: string) {
    this.modalService.open(modal).result.then(
      (result) => {
        this.authService.deleteUser(userId).subscribe(
          () => {
            this.toastr.error('تم مسحه',  email)
            this.authService.getUsers(this.booksPerPage, this.currentPage);
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

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.usersPerPage = pageData.pageSize;
    this.authService.getUsers(this.usersPerPage, this.currentPage);
  }


  ngOnDestroy() {
    this.authStatusSub.unsubscribe();

  }

}
