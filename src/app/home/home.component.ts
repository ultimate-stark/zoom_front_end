import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { NgwWowService } from 'ngx-wow';
import { booksService } from '../Book/books.service';
import { Book } from '../Book/book.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  books: Book[]
  booksLength: number;
  booksSubscription: Subscription;
  currentIndexImg: number = 0;
  carouslLength;
  carouselImgs;
  @ViewChild('homeCarousel', { static: true }) homeCarousel: ElementRef;

  constructor(private wowService: NgwWowService, private booksService: booksService) {
  }

  ngOnInit() {
    // set Variables
    this.carouslLength = (this.homeCarousel.nativeElement as HTMLElement).childNodes.length;
    this.carouselImgs = (this.homeCarousel.nativeElement as HTMLElement).childNodes;
    setInterval(() => {
      this.carouselRightFn()
    }, 8000);
    // Fire Wow animation Service
    this.wowService.init();
    this.getBooksLength();
  }



  getBooksLength() {
    this.booksService.getBooks(3, null);
    this.booksSubscription = this.booksService.getbookUpdateListener()
      .subscribe((bookData: { books: Book[]; bookCount: number }) => {
        this.books = bookData.books;
        this.booksLength = this.books.length;
      });
  }

  // Do Slider Function
  doSlider() {
    this.carouselImgs.forEach(element => {
      element.classList.remove('activeHomeCarousel')
    });
    this.carouselImgs[this.currentIndexImg].classList.add('activeHomeCarousel');
  }


  // Go To Left
  carouselLeftFn() {
    this.currentIndexImg--
    if (this.currentIndexImg < 0) {
      this.currentIndexImg = this.carouslLength - 1;
    }
    this.doSlider();
  }
  // Go To Right
  carouselRightFn() {
    this.currentIndexImg++
    if (this.currentIndexImg == this.carouslLength) {
      this.currentIndexImg = 0
    }
    this.doSlider();
  }

  ngOnDestroy() {
    this.booksSubscription.unsubscribe();
  }

}
