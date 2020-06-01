import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { NgwWowService } from 'ngx-wow';
import { Subscription } from "rxjs";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Book } from "../book.model";
import { booksService } from "../books.service";
import { environment } from "../../../environments/environment";
import { saveAs } from 'file-saver';
import { searchService } from "./../../search/search.service";



const BACKEND_link = environment.imageurl;


@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {
  BookId;
  bookSoundLength: number;
  bookDetails: Book;
  public result: any;
  private searchedBooksSub: Subscription;

  // كتب ذات اضافات
  booksWithAdditions = []
  // كتب ذات مخطوطات
  booksWithPlan = []

  isMute: boolean = false;

  @ViewChild('viewAudios', { static: true }) viewAudios: ElementRef;

  book: Book;
  private ReviewSub: Subscription;
  private bookId: string;
  form: FormGroup;
  imgWidth: number;
  currentIndexImg: number = 0;
  margin: number = 20;
  size: number = this.imgWidth + this.margin;
  innerChildNodesLength: number;
  @ViewChild('innerCarousel', { static: true }) innerCarousel: ElementRef;
  @ViewChild('chevLeft', { static: true }) chevLeft: ElementRef;
  @ViewChild('chevRight', { static: true }) chevRight: ElementRef;


  constructor(private wowService: NgwWowService, public booksService: booksService, public route: ActivatedRoute, private router: Router, public searchService: searchService) { }

  ngOnInit(): void {
    window.scrollTo({
      top: 0,
      behavior: "auto"
    })
    this.booksService.isLoading = true;
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("bookId")) {
        this.bookId = paramMap.get("bookId");
        // setTimeout(() => {
          this.booksService.getBook(this.bookId).subscribe(bookData => {
            this.book = {
              id: bookData._id,
              type: bookData.type,
              title: bookData.title,
              author: bookData.author,
              reviewer: bookData.reviewer,
              publishers: bookData.publishers,
              publicationDate: bookData.publicationDate,
              publicationCountry: bookData.publicationCountry,
              publicationCity: bookData.publicationCity,
              edition: bookData.edition,
              parts: bookData.parts,
              papers: bookData.papers,
              file: bookData.file,
              category: bookData.category,
              subCategory: bookData.subCategory,
              subject: bookData.subject,
              comments: bookData.comments,
              coverImage:bookData.coverImage,
              sound:bookData.sound
            }
            console.log(this.book)
            console.log(this.book.coverImage)
            console.log(this.book)
            this.bookSoundLength = this.book.sound.length;
            this.booksService.isLoading = false;
            // this.elasticFNSameBooks(this.book.category ,this.book.type)
            // this.elasticFNSameManuscript(this.book.category ,this.book.type)

          });
        // }, 3000)
      }
    });
    this.wowService.init();
    window.scrollTo({
      top: 0,
      behavior: 'auto'
    })
  }



  download(id) {
    console.log(id);
    this.booksService.downloadBook(id).subscribe((result: any) => {
      console.log(result)
      saveAs.saveAs(result.data, result.data.slice(-25));


    }, err => {
      console.log(err)
    })
  }

  // elasticFNSameBooks(category,type) {
  //   console.log(category)
  //   console.log(type)
  //   if (category == category) {
  //     console.log(category)
  //     console.log('do Elastic')
  //     this.searchService.sameBooksforBook(category,type);
  //     this.searchedBooksSub = this.searchService.getbookUpdateListener().subscribe((bookData: { books }) => {
  //       this.booksWithAdditions = bookData.books;
  //       console.log(this.booksWithAdditions, "aaaaaaaaaaa")
  //     });
  //   } else {
  //     return null
  //   }
  // }
  // elasticFNSameManuscript(category,type) {
  //   console.log(category)
  //   console.log(type)
  //   if (category == category) {
  //     console.log(category)
  //     console.log('do Elastic')
  //     this.searchService.SameManuscript(category,type);
  //     this.searchedBooksSub = this.searchService.searchbookUpdateListener().subscribe((bookData: { books }) => {
  //       this.booksWithPlan = bookData.books;
  //       console.log(this.booksWithPlan, "aaaaaaaaaaa")
  //     });
  //   } else {
  //     return null
  //   }
  // }

  ngOnDestroy() {
    // this.searchedBooksSub.unsubscribe();

  }


}
