
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BookListComponent } from './Book/book-list/book-list.component';
import { BookDetailsComponent } from './Book/book-details/book-details.component';
import { AuthGuard } from "./auth/auth.guard";
import { NotFoundComponent } from './not-found/not-found.component';
import { DashboardComponent } from "./admin/dashboard/dashboard.component";
import { BookAdminComponent } from "./admin/book-admin/book-admin.component";
import { UsersComponent } from "./admin/users/users.component";
import { addAndEditBook } from "./admin/book-info/book-info.component";
import { AddFilesComponent } from "./admin/add-files/add-files.component";
import { SearchComponent } from "./search/search.component";
import { UserInfoComponent } from "./admin/user-info/user-info.component";
import { CategoryComponent } from "./category/category.component";
import { HomeComponent } from "./home/home.component";
import { NotUserGuard } from "./auth/guards/not-user/not-user.service";
import { ChangeLogoComponent } from "./admin/change-logo/change-logo.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "books-list", component: BookListComponent },
  { path: "bookDetails/:bookId", component: BookDetailsComponent },
  { path: "auth", loadChildren: "./auth/auth.module#AuthModule" },
  { path: "search", component: SearchComponent },
  { path: "category", component: CategoryComponent },
  // Admin
  { path: "admin", component: DashboardComponent, canActivate: [NotUserGuard] },
  { path: "admin/create", component: addAndEditBook, canActivate: [NotUserGuard] },
  { path: "admin/create-books", component: AddFilesComponent, canActivate: [NotUserGuard] },
  { path: "admin/books", component: BookAdminComponent, canActivate: [NotUserGuard] },
  { path: "admin/books/edit/:bookId", component: addAndEditBook, canActivate: [NotUserGuard] },
  { path: "admin/users", component: UsersComponent, canActivate: [NotUserGuard] },
  { path: "admin/add-user", component: UserInfoComponent, canActivate: [NotUserGuard] },
  { path: "admin/edit-user/:userId", component: UserInfoComponent, canActivate: [NotUserGuard] },
  { path: "admin/change-logo", component: ChangeLogoComponent, canActivate: [NotUserGuard] },
  // Not Found
  { path: "**", component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})

export class AppRoutingModule { }

