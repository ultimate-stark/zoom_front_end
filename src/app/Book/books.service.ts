import { Injectable } from "@angular/core";
import { HttpClient, HttpEventType } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

import { environment } from "../../environments/environment";
import { Book } from "./book.model";

const BACKEND_URL = environment.apiUrl + "/books/";
const BACKEND_link = environment.imageurl;
//  apiUrl: "http://localhost:3000/api/reviews"


@Injectable({ providedIn: "root" })
export class booksService {
  private books: Book[] = [];
  private booksUpdated = new Subject<{ books: Book[]; bookCount: number }>();
  isLoading: boolean;

  constructor(private http: HttpClient, private router: Router) { }


  getbookUpdateListener() {
    return this.booksUpdated.asObservable();
  }



  getBooks(booksPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${booksPerPage}&page=${currentPage}`;
    this.http.get<{ message: string; books: any; maxBooks: number }>(BACKEND_URL + queryParams, {
    })
      .pipe(map(bookData => {
        return {
          books: bookData.books.map(book => {
            return {
              id: book._id,
              type: book.type,
              title: book.title,
              author: book.author,
              reviewer: book.reviewer,
              publishers: book.publishers,
              publicationDate: book.publicationDate,
              publicationCountry: book.publicationCountry,
              publicationCity: book.publicationCity,
              edition: book.edition,
              parts: book.parts,
              papers: book.papers,
              file: book.file,
              category: book.category,
              subCategory: book.subCategory,
              subject: book.subject,
              comments: book.comments,
              coverImage: BACKEND_link + book.coverImage,
              sound: book.sound,

            };
          }),
          maxBooks: bookData.maxBooks
        };
      }))
      .subscribe(transformedbookData => {
        this.books = transformedbookData.books;
        this.booksUpdated.next({
          books: [...this.books],
          bookCount: transformedbookData.maxBooks
        });
      });
    this.isLoading = false;
  }



  getBook(id: string) {
    return this.http.get<{
      _id: string;
      type: string;
      title: string;
      author: string;
      reviewer: string;
      publishers: string;
      publicationDate: string;
      publicationCountry: string;
      publicationCity: string;
      edition: string;
      parts: string;
      papers: string;
      file: string;
      category: string;
      subCategory: string;
      subject: string;
      comments: string;
      coverImage: string;
      sound: string;

    }>(BACKEND_URL + id);
  }


  addBook(
    type: string,
    title: string,
    author: string,
    reviewer: string,
    publishers: string,
    publicationDate: string,
    publicationCountry: string,
    publicationCity: string,
    edition: string,
    parts: string,
    papers: string,
    file: string,
    category: string,
    subCategory: string,
    subject: string,
    comments: string,
    coverImage:File,
    sound,

  ) {
    console.log(sound)
    console.log(edition)
    console.log(parts)
    console.log(file)
    console.log(category)
    console.log(coverImage)

    const bookData = new FormData();
    bookData.append("type", type);
    bookData.append("title", title);
    bookData.append("author", author);
    bookData.append("reviewer", reviewer);
    bookData.append("publishers", publishers);
    bookData.append("publicationDate", publicationDate);
    bookData.append("publicationCountry", publicationCountry);
    bookData.append("publicationCity", publicationCity);
    bookData.append("edition", edition);
    bookData.append("parts", parts);
    bookData.append("papers", papers);
    bookData.append("file", file);
    bookData.append("category", category);
    bookData.append("subCategory", subCategory);
    bookData.append("subject", subject);
    bookData.append("comments", comments);
    bookData.append("coverImage", coverImage, title);
    sound.forEach(function (file) {
      bookData.append("sound[]", file)

    })

    console.log(bookData);
    return this.http.post<{ message: string; book: Book }>(BACKEND_URL, bookData, {
      observe: 'events'
    })
  }


  updateBook(
    id: string,
    type: string,
    title: string,
    author: string,
    reviewer: string,
    publishers: string,
    publicationDate: string,
    publicationCountry: string,
    publicationCity: string,
    edition: string,
    parts: string,
    papers: string,
    file: string,
    category: string,
    subCategory: string,
    subject: string,
    comments: string,
    coverImage: File | string,
    sound: string
    ) {

      console.log(coverImage)
      console.log(sound)

    let bookData: Book | FormData;
    if (typeof coverImage === "object") {
      bookData = new FormData();
      bookData.append("id", id);
      bookData.append("type", type);
      bookData.append("title", title);
      bookData.append("author", author);
      bookData.append("reviewer", reviewer);
      bookData.append("publishers", publishers);
      bookData.append("publicationDate", publicationDate);
      bookData.append("publicationCountry", publicationCountry);
      bookData.append("publicationCity", publicationCity);
      bookData.append("edition", edition);
      bookData.append("parts", parts);
      bookData.append("papers", papers);
      bookData.append("file", file);
      bookData.append("category", category);
      bookData.append("subCategory", subCategory);
      bookData.append("subject", subject);
      bookData.append("comments", comments);
      bookData.append("coverImage", coverImage);
      bookData.append("sound", sound);

    } else {
      bookData = {
        id: id,
        type: type,
        title: title,
        author: author,
        reviewer: reviewer,
        publishers: publishers,
        publicationDate: publicationDate,
        publicationCountry: publicationCountry,
        publicationCity: publicationCity,
        edition: edition,
        parts: parts,
        papers: papers,
        file: file,
        category: category,
        subCategory: subCategory,
        subject: subject,
        comments: comments,
        coverImage: coverImage,
        sound: sound

      }
      this.http.put(BACKEND_URL + id, bookData)
        .subscribe(response => {
          this.router.navigate(["/"]);
        });
    }
  }

  deleteBook(bookId: string) {
    return this.http.delete(BACKEND_URL + bookId);
  }

  downloadBook(bookId: string) {
    console.log(bookId)
    return this.http.get(BACKEND_URL + `/download/${bookId}`);
    // return this.http.get('http://localhost:3000/download/qqqq');
  }



}
