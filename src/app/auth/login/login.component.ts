import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";

import { NgwWowService } from 'ngx-wow';
import { AuthService } from "../auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  isUser: boolean = true;
  isLoading = false;
  recaptcha = [];
  private authStatusSub: Subscription;

  constructor(public authService: AuthService, private wowService: NgwWowService) { }

  ngOnInit() {



    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
        this.isLoading = false;
        this.isUser = false;
        if (this.isUser == false) {
          this.recaptcha = [];
          console.log(this.recaptcha)
        }
      }
    );
    this.wowService.init();
    window.scrollTo({
      top: 0,
      behavior: 'auto'
    })

  }

  resolved(captchaResponse: string) {
    this.recaptcha.push(captchaResponse);
    console.log(this.recaptcha)
  }

  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.login(form.value.name, form.value.email, form.value.password);
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
