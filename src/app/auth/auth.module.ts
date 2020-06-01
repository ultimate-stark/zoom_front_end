import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { LoginComponent } from "./login/login.component";
import { AngularMaterialModule } from "../angular-material.module";
import { AuthRoutingModule } from "./auth-routing.module";


import { RecaptchaModule, RECAPTCHA_LANGUAGE } from 'ng-recaptcha';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule, AngularMaterialModule, FormsModule, AuthRoutingModule, RecaptchaModule],
  providers: [
    {
      provide: RECAPTCHA_LANGUAGE,
      useValue: 'ar',
    }
  ]
})
export class AuthModule {
}
