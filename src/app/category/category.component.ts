import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { searchService } from "./../search/search.service";
import { Subscription } from "rxjs";
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {


  h1: string;
  isLoading: boolean = false;
  booksLength: number;
  relatedBooks = [];
  private query: string;
  categorysearchedBooks = [];
  private searchedBooksSub: Subscription;
  constructor(
    public searchService: searchService,
    public route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      if (params.has('q')) {
        this.query = params.get('q')
        console.log(this.query)

        this.searchService.CategoryBook(this.query);
        this.searchedBooksSub = this.searchService.searchbookUpdateListener().subscribe((bookData: { books }) => {
        console.log(bookData.books)
        this.categorysearchedBooks = bookData.books;
        console.log(this.categorysearchedBooks)

       });

      }
    });
  }

}
