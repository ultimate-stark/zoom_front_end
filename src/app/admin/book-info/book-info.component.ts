import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { booksService } from "../../Book/books.service";
import { Book } from "../../Book/book.model";

import { NgwWowService } from 'ngx-wow';
import { HttpEventType } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

import * as $ from 'jquery';

@Component({
  selector: 'app-add-book',
  templateUrl: './book-info.component.html',
  styleUrls: ['./book-info.component.scss']
})
export class addAndEditBook implements OnInit {
  mainFile;
  new_Files = [];
  @ViewChild('viewMainFile', { static: false }) viewMainFile: ElementRef;
  enteredTitle = "";
  enteredContent = "";
  book: Book;
  isLoading = false;
  isUploading: boolean = false;
  form: FormGroup;
  imagePreview: string;
  mode = "create";
  authors: any;
  reviewers: any;
  publisher: any;
  private bookId: string;

  constructor(
    public booksService: booksService,
    public route: ActivatedRoute,
    private wowService: NgwWowService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.makeCreateForm();
    this.getBook();
    this.booksService.getAuthors().subscribe((data: any) => {
      this.authors = data.authors
    })
    this.booksService.getReviewers().subscribe((data: any) => {
      this.reviewers = data.reviewers
    })
    this.booksService.getPublishers().subscribe((data: any) => {
      this.publisher = data.publishers
    })
    this.wowService.init();
  }

  getBook() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("bookId")) {
        this.mode = "edit";
        this.bookId = paramMap.get("bookId");
        this.isLoading = true;
        this.booksService.getBook(this.bookId).subscribe(bookData => {
          console.log(bookData)
          this.isLoading = false;
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
            coverImage: bookData.coverImage,
            sound: bookData.sound

          };
          this.form.setValue({
            type: this.book.type,
            title: this.book.title,
            author: this.book.author,
            reviewer: this.book.reviewer,
            publishers: this.book.publishers,
            publicationDate: this.book.publicationDate,
            publicationCountry: this.book.publicationCountry,
            publicationCity: this.book.publicationCity,
            edition: this.book.edition,
            parts: this.book.parts,
            papers: this.book.papers,
            file: this.book.file,
            category: this.book.category,
            subCategory: this.book.subCategory,
            subject: this.book.subject,
            comments: this.book.comments,
            coverImage: this.book.coverImage,
            sound: this.book.sound
          });
          console.log(this.form.value)
        });
      } else {
        this.mode = "create";
        this.bookId = null;
      }
    });
  }

  makeCreateForm() {
    if (this.mode == 'create') {
      this.form = new FormGroup({
        type: new FormControl(null),
        title: new FormControl(null),
        author: new FormControl(null),
        reviewer: new FormControl(null),
        publishers: new FormControl(null),
        publicationDate: new FormControl(null),
        publicationCountry: new FormControl(null),
        publicationCity: new FormControl(null),
        edition: new FormControl(null),
        parts: new FormControl(null),
        papers: new FormControl(null),
        file: new FormControl(null),
        category: new FormControl(null),
        subCategory: new FormControl(null),
        subject: new FormControl(null),
        comments: new FormControl(null),
        coverImage: new FormControl(null),
        sound: new FormControl(null)
      });
    }
  }

  // Start Get All Controls By Name
  type() {
    return this.form.controls.type
  }
  title() {
    return this.form.controls.title
  }
  author() {
    return this.form.controls.author
  }
  reviewer() {
    return this.form.controls.reviewer
  }
  publishers() {
    return this.form.controls.publishers
  }
  publicationDate() {
    return this.form.controls.publicationDate
  }
  publicationCountry() {
    return this.form.controls.publicationCountry
  }
  publicationCity() {
    return this.form.controls.publicationCity
  }
  edition() {
    return this.form.controls.edition
  }
  parts() {
    return this.form.controls.parts
  }
  papers() {
    return this.form.controls.papers
  }
  file() {
    return this.form.controls.file
  }
  category() {
    return this.form.controls.category
  }
  subCategory() {
    return this.form.controls.subCategory
  }
  subject() {
    return this.form.controls.subject
  }
  comments() {
    return this.form.controls.comments
  }
  coverImage() {
    return this.form.controls.coverImage
  }
  sound() {
    return this.form.controls.sound
  }


  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    console.log(event);
    console.log(file)
    this.form.patchValue({ coverImage: file });
    this.form.get("coverImage").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }


  onSoundPicked(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    console.log(files)
    for (let index in files) {
      var file = files[index]
      if (file instanceof File) {
        this.new_Files.push(file)
      }
    }
    this.form.patchValue({ sound: this.new_Files });
  }

  onSavebook() {
    console.log()
    if (this.form.invalid) {
      return;
    }
    if (this.mode === "create") {
      let authors = $('.selectpicker.authors-list').val().map(name => ({name}))
      let reviewers = $('.selectpicker.reviewers-list').val().map(name => ({name}))
      let publishers = $('.selectpicker.publishers-list').val().map(name => ({name}))

      this.booksService.addBook(
        this.form.value.type,
        this.form.value.title,
        authors,
        reviewers,
        publishers,
        this.form.value.publicationDate,
        this.form.value.publicationCountry,
        this.form.value.publicationCity,
        this.form.value.edition,
        this.form.value.parts,
        this.form.value.papers,
        this.form.value.file,
        this.form.value.category,
        this.form.value.subCategory,
        this.form.value.subject,
        this.form.value.comments,
        this.form.value.coverImage,
        this.form.value.sound

      ).subscribe(e => {
        if (e.type == 0) {
          this.isUploading = true;
        }
        if (e.type == 4) {
          this.isUploading = false;
          this.toastr.success('تم اضافة الكتاب')
          console.log(this.title().value)
          this.router.navigate(['admin/books'])
        }
        console.log(this.isUploading)
      })
    } 
    else {
      this.booksService.updateBook(
        this.bookId,
        this.form.value.type,
        this.form.value.title,
        this.form.value.author,
        this.form.value.reviewer,
        this.form.value.publishers,
        this.form.value.publicationDate,
        this.form.value.publicationCountry,
        this.form.value.publicationCity,
        this.form.value.edition,
        this.form.value.parts,
        this.form.value.papers,
        this.form.value.file,
        this.form.value.category,
        this.form.value.subCategory,
        this.form.value.subject,
        this.form.value.comments,
        this.form.value.coverImage,
        this.form.value.sound
      );
    }
    // this.form.reset();
  }


}
