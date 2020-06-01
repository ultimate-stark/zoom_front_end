import { Injectable} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";
import { environment } from "../../../environments/environment";
const BACKEND_URL = environment.apiUrl + "/logo/";

@Injectable({
  providedIn: 'root'
})
export class ChangeLogoService {
  private LogoUpdated = new Subject();
  private images:any = [];

  constructor(private http: HttpClient, private router: Router) { }




  // postLogo( image: File) {
  //   console.log(image.name)
  //   var title = image.name.split('.')[0]
  //   console.log(title)
  //   const imageData = new FormData();
  //   imageData.append("image", image,title);
  //   this.http.post(BACKEND_URL,imageData)
  //     .subscribe(responseData => {
  //       this.router.navigate(["/"]);
  //     });
  // }


  // getimageUpdateListener() {
  //   return this.LogoUpdated.asObservable();
  // }


  // getLogo() {

  //   this.http.get<{ message: string , image:string}>(BACKEND_URL)
  //       .subscribe(transformedPostData => {
  //         console.log(transformedPostData)
  //         this.images = transformedPostData
  //       console.log(this.images)
  //       this.LogoUpdated.next({
  //         images:this.images
  //       });
  //     });
  // }

}
