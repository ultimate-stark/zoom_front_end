import { Injectable } from '@angular/core';
import { Book } from '../../interfaces/book';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor() { }

  books: Book[] = [
    {
      img: "../../assets/imgs/1.jpg",
      name: "اسم الكتاب",
      auther: "المؤلف",
      bookDetails: "اشتهر شهرة واسعة في النطاق العربي حيث غير كل المفاهيم عن الكتب العامة في ذلك الحين"
    },
    {
      img: "../../assets/imgs/2.jpg",
      name: "اسم الكتاب",
      auther: "المؤلف",
      bookDetails: "اشتهر شهرة واسعة في النطاق العربي حيث غير كل المفاهيم عن الكتب العامة في ذلك الحين"
    },
    {
      img: "../../assets/imgs/3.jpg",
      name: "اسم الكتاب",
      auther: "المؤلف",
      bookDetails: "اشتهر شهرة واسعة في النطاق العربي حيث غير كل المفاهيم عن الكتب العامة في ذلك الحين"
    },
    {
      img: "../../assets/imgs/4.jpg",
      name: "اسم الكتاب",
      auther: "المؤلف",
      bookDetails: "اشتهر شهرة واسعة في النطاق العربي حيث غير كل المفاهيم عن الكتب العامة في ذلك الحين"
    },
    {
      img: "../../assets/imgs/5.jpg",
      name: "اسم الكتاب",
      auther: "المؤلف",
      bookDetails: "اشتهر شهرة واسعة في النطاق العربي حيث غير كل المفاهيم عن الكتب العامة في ذلك الحين"
    },
    {
      img: "../../assets/imgs/6.jpg",
      name: "اسم الكتاب",
      auther: "المؤلف",
      bookDetails: "اشتهر شهرة واسعة في النطاق العربي حيث غير كل المفاهيم عن الكتب العامة في ذلك الحين"
    },
    {
      img: "../../assets/imgs/7.jpg",
      name: "اسم الكتاب",
      auther: "المؤلف",
      bookDetails: "اشتهر شهرة واسعة في النطاق العربي حيث غير كل المفاهيم عن الكتب العامة في ذلك الحين"
    },
    {
      img: "../../assets/imgs/8.jpg",
      name: "اسم الكتاب",
      auther: "المؤلف",
      bookDetails: "اشتهر شهرة واسعة في النطاق العربي حيث غير كل المفاهيم عن الكتب العامة في ذلك الحين"
    }
  ]
}
