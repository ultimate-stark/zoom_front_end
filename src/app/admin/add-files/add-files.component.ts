import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FilesService } from "./add-files.service";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-files',
  templateUrl: './add-files.component.html',
  styleUrls: ['./add-files.component.scss']
})
export class AddFilesComponent implements OnInit {

  @ViewChild('file', { static: true }) file: ElementRef;
  @ViewChild('textFile', { static: true }) textFile: ElementRef;
  @ViewChild('icon', { static: true }) icon: ElementRef;
  @ViewChild('result', { static: true }) result: ElementRef;
  @ViewChild('error', { static: true }) error: ElementRef;

  isUploading: boolean = false;
  err: boolean = true;
  constructor(private FilesService: FilesService, private toastr: ToastrService, private router: Router) { }

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

    if (!name.endsWith('.xlsx')) {
      this.err = true;
      fileHtml.classList.add('animate-book');
      icon.classList.replace('fa-book', 'fa-exclamation-triangle');
      error.removeAttribute('hidden');
      result.innerHTML = ``;
    } else if (name.endsWith('.xlsx')) {
      this.err = false;
      fileHtml.classList.add('animate-book');
      icon.classList.replace('fa-exclamation-triangle', 'fa-book');
      error.setAttribute('hidden', null);
      result.innerHTML = `${name}`;
      this.addFileFN(excelFile);
    }
  }

  addFileByChoose(file: HTMLInputElement, icon: HTMLElement, dragg: HTMLElement, result: HTMLElement, error: HTMLElement) {
    if (this.err == true || this.err == false) {
      let inputFile: File = file.files[0],
        fileName = file.files[0].name;
      this.err = false;
      dragg.classList.add('animate-book');
      icon.classList.replace('fa-exclamation-triangle', 'fa-book');
      error.setAttribute('hidden', null);
      result.innerHTML = `${fileName}`;
      this.addFileFN(inputFile);
    }
  }


  addFileFN(file: File) {
    this.FilesService.addFile(file).subscribe(response => {
      if (response.type == 0) {
        this.isUploading = true;
      } else if (response.type == 4) {
        this.isUploading = false;
        let res: any = response;
        this.toastr.success(`${res.body.message}`)
        this.router.navigate(['/admin/books'])
      }
    })
  }
}
