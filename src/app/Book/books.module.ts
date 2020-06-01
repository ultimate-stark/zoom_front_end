import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { NgxPaginationModule } from 'ngx-pagination';
import { AngularMaterialModule } from "../angular-material.module";
import { BookListComponent } from './book-list/book-list.component';
import { BookDetailsComponent } from './book-details/book-details.component';
// Shimming Loading
import { NgxShimmerLoadingModule } from 'ngx-shimmer-loading';
@NgModule({
  declarations: [BookListComponent, BookDetailsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    NgxPaginationModule,
    AngularMaterialModule,
    NgxShimmerLoadingModule
  ]
})
export class booksModule { }
