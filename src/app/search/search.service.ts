import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

import { environment } from "../../environments/environment";

const BACKEND_link = environment.imageurl;

const BACKEND_URL = environment.apiUrl + "/elastic/";

@Injectable({ providedIn: "root" })
export class searchService {
  private books = [];
  private booksUpdated = new Subject();
  private booksSearched = new Subject();

  constructor(private http: HttpClient, private router: Router) { }





  getbookUpdateListener() {
    return this.booksUpdated.asObservable();
  }

  searchbookUpdateListener() {
    return this.booksSearched.asObservable();
  }


  searchBooks(query: String) {
    console.log(query)
    this.http.get<{ message: string; searchedBooks: any }>(BACKEND_URL + query)
      .pipe(map(bookData => {
        return {
          books: bookData.searchedBooks.map(book => {
            console.log(book)
            return {
              id: book._id,
              type: book._source.type,
              title: book._source.title,
              author: book._source.author,
              reviewer: book._source.reviewer,
              publishers: book._source.publishers,
              publicationDate: book._source.publicationDate,
              publicationCountry: book._source.publicationCountry,
              publicationCity: book._source.publicationCity,
              edition:book._source.edition,
              parts: book._source.parts,
              papers: book._source.papers,
              file:book._source.file,
              category: book._source.category,
              subCategory: book._source.subCategory,
              subject: book._source.subject,
              comments: book._source.comments,
              coverImage: book._source.coverImage,
              sound: book._source.sound,
            };
          }),
        };
      })
      )
      .subscribe(transformedbookData => {
        this.books = transformedbookData.books;
        this.booksUpdated.next({
          books: [...this.books]
        });
      });
  }


  sameBooksforBook(category,type) {
    console.log("category", category);
    console.log("type", type);
    this.http.get<{ message: string; searchedBooks: any }>(BACKEND_URL + `same/${category}*${type}`)
      .pipe(map(bookData => {
        return {
          books: bookData.searchedBooks.map(book => {
            console.log(book)
            return {
              id: book._id,
              type: book._source.type,
              title: book._source.title,
              author: book._source.author,
              reviewer: book._source.reviewer,
              publishers: book._source.publishers,
              publicationDate: book._source.publicationDate,
              publicationCountry: book._source.publicationCountry,
              publicationCity: book._source.publicationCity,
              edition:book._source.edition,
              parts: book._source.parts,
              papers: book._source.papers,
              file:book._source.file,
              category: book._source.category,
              subCategory: book._source.subCategory,
              subject: book._source.subject,
              comments: book._source.comments,
              coverImage: book._source.coverImage,
              sound: book._source.sound,
            };
          }),
        };
      })
      )
      .subscribe(transformedbookData => {
        this.books = transformedbookData.books;
        this.booksUpdated.next({
          books: [...this.books]
        });
      });
  }

  SameManuscript(category,type){
    console.log("category", category);
    console.log("type", type);
    this.http.get<{ message: string; searchedBooks: any }>(BACKEND_URL + `manuscript/${category}*${type}`)
      .pipe(map(bookData => {
        return {
          books: bookData.searchedBooks.map(book => {
            console.log(book)
            return {
              id: book._id,
              type: book._source.type,
              title: book._source.title,
              author: book._source.author,
              reviewer: book._source.reviewer,
              publishers: book._source.publishers,
              publicationDate: book._source.publicationDate,
              publicationCountry: book._source.publicationCountry,
              publicationCity: book._source.publicationCity,
              edition:book._source.edition,
              parts: book._source.parts,
              papers: book._source.papers,
              file:book._source.file,
              category: book._source.category,
              subCategory: book._source.subCategory,
              subject: book._source.subject,
              comments: book._source.comments,
              coverImage: book._source.coverImage,
              sound: book._source.sound,
            };
          }),
        };
      })
      )
      .subscribe(transformedbookData => {
        this.books = transformedbookData.books;
        this.booksSearched.next({
          books: [...this.books]
        });
      });
  }


  relatedBook(value) {
    console.log("value", value);
    this.http.get<{ message: string; searchedBooks: any }>(BACKEND_URL + `search/${value}`)
      .pipe(map(bookData => {
        console.log(bookData)
        return {
          books: bookData.searchedBooks.map(book => {
            console.log(book)
            return {
              id: book._id,
              type: book._source.type,
              title: book._source.title,
              author: book._source.author,
              reviewer: book._source.reviewer,
              publishers: book._source.publishers,
              publicationDate: book._source.publicationDate,
              publicationCountry: book._source.publicationCountry,
              publicationCity: book._source.publicationCity,
              edition:book._source.edition,
              parts: book._source.parts,
              papers: book._source.papers,
              file:book._source.file,
              category: book._source.category,
              subCategory: book._source.subCategory,
              subject: book._source.subject,
              comments: book._source.comments,
              coverImage: book._source.coverImage,
              sound: book._source.sound
            };
          }),
        };
      })
      )
      .subscribe(transformedbookData => {
        this.books = transformedbookData.books;
        this.booksSearched.next({
          books: [...this.books]
        });
      });
  }



  CategoryBook(category) {
    console.log("category", category);
    this.http.get<{ message: string; searchedBooks: any }>(BACKEND_URL + `category/${category}`)
      .pipe(map(bookData => {
        console.log(bookData)
        return {
          books: bookData.searchedBooks.map(book => {
            console.log(book)
            return {
              id: book._id,
              type: book._source.type,
              title: book._source.title,
              author: book._source.author,
              reviewer: book._source.reviewer,
              publishers: book._source.publishers,
              publicationDate: book._source.publicationDate,
              publicationCountry: book._source.publicationCountry,
              publicationCity: book._source.publicationCity,
              edition:book._source.edition,
              parts: book._source.parts,
              papers: book._source.papers,
              file:book._source.file,
              category: book._source.category,
              subCategory: book._source.subCategory,
              subject: book._source.subject,
              comments: book._source.comments,
              coverImage: book._source.coverImage,
              sound: book._source.sound
            };
          }),
        };
      })
      )
      .subscribe(transformedbookData => {
        console.log(transformedbookData)
        this.books = transformedbookData.books;
        this.booksSearched.next({
          books: [...this.books]
        });
      });
  }


}
