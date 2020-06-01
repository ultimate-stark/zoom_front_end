import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgwWowModule } from 'ngx-wow';
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { AuthInterceptor } from "./auth/auth-interceptor";
import { ErrorInterceptor } from "./error-interceptor";
import { ErrorComponent } from "./error/error.component";
import { AngularMaterialModule } from "./angular-material.module";
import { booksModule } from "./Book/books.module";
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { ChangeThemesComponent } from './change-themes/change-themes.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { NotFoundComponent } from './not-found/not-found.component';

// NGX Toastr
import { ToastrModule } from 'ngx-toastr';

// Shimming Loading
import { NgxShimmerLoadingModule } from 'ngx-shimmer-loading';





// NG Bootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BookAdminComponent } from './admin/book-admin/book-admin.component';
import { UsersComponent } from './admin/users/users.component';
import { AdminLayoutComponent } from './admin/admin-layout/admin-layout.component';
import { addAndEditBook } from "./admin/book-info/book-info.component";
import { AddFilesComponent } from './admin/add-files/add-files.component';
import { SearchComponent } from './search/search.component';
import { UserInfoComponent } from './admin/user-info/user-info.component';
import { CategoryBoxComponent } from './category-box/category-box.component';
import { CategoryComponent } from './category/category.component';
import { HomeComponent } from './home/home.component';
import { ChangeLogoComponent } from './admin/change-logo/change-logo.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ErrorComponent,
    FooterComponent,
    ChangeThemesComponent,
    NotFoundComponent,
    DashboardComponent,
    BookAdminComponent,
    UsersComponent,
    AdminLayoutComponent,
    addAndEditBook,
    AddFilesComponent,
    SearchComponent,
    UserInfoComponent,
    CategoryBoxComponent,
    CategoryComponent,
    HomeComponent,
    ChangeLogoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularMaterialModule,
    booksModule,
    FormsModule,
    ReactiveFormsModule,
    NgwWowModule,
    NgbModule,
    ToastrModule.forRoot(),
    NgxShimmerLoadingModule
  ],
  exports: [AdminLayoutComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent]
})
export class AppModule { }
