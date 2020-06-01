import { Injectable } from "@angular/core";
import { HttpClient, HttpEventType } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

import { environment } from "../../../environments/environment";


const BACKEND_URL = environment.apiUrl + "/files/";
const BACKEND_link = environment.imageurl;
//  apiUrl: "http://localhost:3000/api/reviews"


@Injectable({ providedIn: "root" })
export class FilesService {


  constructor(private http: HttpClient, private router: Router) { }


  // getbookUpdateListener() {
  //   return this.booksUpdated.asObservable();
  // }




  addFile(file: File) {
    const bookData = new FormData();
    // bookData.append("title", title);
    // bookData.append("content", content);
    bookData.append("excel", file, file.name);
    // bookData.append("author", author);
    // bookData.append("category", category);
    // sound.forEach(function (file) {
    //   bookData.append("sound[]", file)

    // })
    console.log(bookData);
    return this.http.post(BACKEND_URL, bookData, {
      observe: 'events'
    })
  }


  // updateBook(id: string, title: string, content: string, image: File | string, author: string, category: string, sound: string) {
  //   // let bookData: Book | FormData;
  //   if (typeof image === "object") {
  //     bookData = new FormData();
  //     bookData.append("id", id);
  //     bookData.append("title", title);
  //     bookData.append("content", content);
  //     bookData.append("image", image, title);
  //     bookData.append("author", author);
  //     bookData.append("category", category),
  //     bookData.append("sound", sound, title);
  //   } else {
  //     bookData = {
  //       id: id,
  //       title: title,
  //       content: content,
  //       image: image,
  //       author: author,
  //       category: category,
  //       sound: sound
  //     };
  //   }
  //   this.http.put(BACKEND_URL + id, bookData)
  //     .subscribe(response => {
  //       // this.router.navigate(["/"]);
  //     });
  // }

  // deleteBook(bookId: string) {
  //   return this.http.delete(BACKEND_URL + bookId);
  // }

  // downloadBook(bookId: string) {
  //   console.log(bookId)
  //   return this.http.get(BACKEND_URL + `/download/${bookId}`);
  //   // return this.http.get('http://localhost:3000/download/qqqq');
  // }



}
