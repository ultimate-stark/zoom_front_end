import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { environment } from "../../environments/environment";
import { map } from "rxjs/operators";
import { User } from "./auth-data.model";
import { ToastrService } from "ngx-toastr";
const BACKEND_URL = environment.apiUrl + "/user/";

@Injectable({ providedIn: "root" })
export class AuthService {
  usersLength: number;
  private isAuthenticated = false;
  private token: string;
  private tokenTimer: any;
  private userId: string;
  authStatusListener = new Subject<boolean>();
  private users: User[] = [];
  private usersUpdated = new Subject<{ users: User[]; userCount: number }>();

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) { }


  getUsers(usersPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${usersPerPage}&page=${currentPage}`;
    this.http.get<{ message: string; users: any; maxUsers: number }>(BACKEND_URL + queryParams)
      .pipe(map(userData => {
        return {
          users: userData.users.map(user => {
            return {
              id: user._id,
              name: user.name,
              email: user.email,
              password: user.password
            };
          }),
          maxUsers: userData.maxUsers
        };
      })
      )
      .subscribe(transformeduserData => {
        this.users = transformeduserData.users;
        this.usersLength = this.users.length;
        this.usersUpdated.next({
          users: [...this.users],
          userCount: transformeduserData.maxUsers
        });
      });
  }


  getUser(id: string) {
    console.log(id)
    return this.http.get<{
      _id: string;
      name: string;
      email: string;
      password:string;
    }>(BACKEND_URL + id);
  }

  updateUser(id: string,name: string,email: string,password:string) {
       var userData = {
        id: id,
        name: name,
        email: email,
        password:password
      }
      this.http.put(BACKEND_URL + id, userData)
        .subscribe(response => {
          this.router.navigate(["/"]);
        });

  }

  deleteUser(userId: string) {
    console.log(userId)
    return this.http.delete(BACKEND_URL + userId);
  }


  getuserUpdateListener() {
    return this.usersUpdated.asObservable();
  }


  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }



  getUserId() {
    return this.userId;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }


  createUser(name: string, email: string, password: string) {
    // const authData: User = { name: name, email: email, password: password };
    const authData = { name: name, email: email, password: password };
    return this.http.post(BACKEND_URL + "/signup", authData, {
      observe: 'events'
    })
  }


  login(name: string, email: string, password: string) {
    // const authData: User = { name: name, email: email, password: password };
    const authData = { name: name, email: email, password: password };
    this.http
      .post<{ token: string; expiresIn: number; userId: string }>(
        BACKEND_URL + "/login",
        authData
      )
      .subscribe(
        response => {
          const token = response.token;
          this.token = token;
          if (token) {
            const expiresInDuration = response.expiresIn;
            this.setAuthTimer(expiresInDuration);
            this.isAuthenticated = true;
            this.userId = response.userId;
            this.authStatusListener.next(true);
            const now = new Date();
            const expirationDate = new Date(
              now.getTime() + expiresInDuration * 1000
            );
            console.log(expirationDate);

            this.saveAuthData(token, expirationDate, this.userId);

            this.router.navigate(["/"]);
          }
        },
        error => {
          this.authStatusListener.next(false);
        }
      );
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userId = authInformation.userId;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.userId = null;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(["/"]);
  }

  private setAuthTimer(duration: number) {
    console.log("Setting timer: " + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }


  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
    localStorage.setItem("userId", userId);
  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("userId");
  }

  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    const userId = localStorage.getItem("userId");
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId
    };
  }
}
