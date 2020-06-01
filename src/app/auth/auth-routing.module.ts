import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { LoginComponent } from "./login/login.component";
import { UserGuardService } from "./guards/user-guard/user-guard.service";



const routes: Routes = [
  { path: "login", component: LoginComponent, canActivate: [UserGuardService] }

]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
