import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpClient, HttpEventType } from "@angular/common/http";
import { environment } from "../../../environments/environment";


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class Settings implements OnInit {

  @ViewChild('file', { static: true }) file: ElementRef;
  @ViewChild('textFile', { static: true }) textFile: ElementRef;
  @ViewChild('icon', { static: true }) icon: ElementRef;
  @ViewChild('result', { static: true }) result: ElementRef;
  @ViewChild('error', { static: true }) error: ElementRef;

  isUploading: boolean = false;
  percentage: number = 0;
  err: boolean = true;
  constructor(private http: HttpClient , private toastr: ToastrService, private router: Router) { }

  ngOnInit() {
    let file = (this.file.nativeElement as HTMLElement);
    let icon = (this.icon.nativeElement as HTMLElement);
    let textFile = (this.textFile.nativeElement as HTMLElement);
    file.addEventListener('drop', event => {
      event.preventDefault();
      event.stopPropagation();
      this.loadText(event.dataTransfer.files)
    }, false)

    // On Dragg Enter Set Styles
    file.addEventListener('dragover', () => {
      icon.style.transform = 'translateY(0px)';
      icon.style.display = 'block';

      textFile.style.transform = 'translateY(-80px)';
      textFile.style.display = 'none';
    })
    // On Dragg Leave Set Styles
    file.addEventListener('dragleave', () => {
      icon.style.transform = 'translateY(80px)';
      icon.style.display = 'none';

      textFile.style.transform = 'translateY(0px)';
      textFile.style.display = 'block';
    })



    // Set Window Default Events
    window.addEventListener('dragenter', e => {
      e.preventDefault();
    });
    window.addEventListener('dragover', e => {
      e.preventDefault();
    });
    window.addEventListener('drop', e => {
      e.preventDefault();
    })
  }

  loadText(file) {
    let excelFile: File = file[0],
      name: string = file[0].name,
      fileHtml = (this.file.nativeElement as HTMLElement),
      icon = (this.icon.nativeElement as HTMLElement),
      error = (this.error.nativeElement as HTMLElement),
      result = (this.result.nativeElement as HTMLElement);
    let extensions = ['jpg' , 'svg' , 'png' , 'jpeg']
    let extension = name.split('.')[name.split('.').length - 1]
    console.log(extension)
    if (! extensions.includes(extension) ) {
      this.err = true;
      fileHtml.classList.add('animate-book');
      icon.classList.replace('fa-book', 'fa-exclamation-triangle');
      error.removeAttribute('hidden');
      result.innerHTML = ``;
    } else if (extensions.includes(extension)) {
      this.err = false;
      fileHtml.classList.add('animate-book');
      icon.classList.replace('fa-exclamation-triangle', 'fa-book');
      error.setAttribute('hidden', null);
      result.innerHTML = `${name}`;
      this.addFileFN(excelFile);
    }
  }

  addFileByChoose(file: HTMLInputElement, icon: HTMLElement, dragg: HTMLElement, result: HTMLElement, error: HTMLElement) {

  }


  addFileFN(file: File) {
    const BACKEND_URL = environment.apiUrl + "/logo/upload-logo";
    const logo = new FormData();
    logo.append("logo", file, file.name);
    this.http.post(BACKEND_URL, logo, {
      observe: 'events'
    }).subscribe(response => {
      if (response.type == 0) {
        this.isUploading = true;
      } else if (response.type == 4) {
        this.isUploading = false;
        let res: any = response;
        this.toastr.success(`${res.body.message}`)
        window.location.href = '/admin/settings'
      }
    })
  }
}
