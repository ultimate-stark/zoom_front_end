import { ChangeLogoService } from './change-logo.service';
import { Component, OnInit, ElementRef, ViewChild, AfterViewInit,OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { Subscription } from "rxjs";
@Component({
  selector: 'app-change-logo',
  templateUrl: './change-logo.component.html',
  styleUrls: ['./change-logo.component.scss']
})
export class ChangeLogoComponent {
  images:any = [];
  img: string = '';
  mainFile;
  new_Files = [];
  isLoading = false;
  isUploading: boolean = false;
  form: FormGroup;
  imagePreview: string;
  mode = "create";
  private bookId: string;
  private imagesSub: Subscription;


  logoIsUploaded: boolean = false;
  constructor(private changeLogoService: ChangeLogoService) { }

  ngOnInit() {
    // this.changeLogoService.getLogo();

    // this.imagesSub = this.changeLogoService
    //   .getimageUpdateListener()
    //   .subscribe(imageData => {
    //     console.log(imageData.images)
    //     // this.images = imageData.images;
    //   });

    this.form = new FormGroup({
      image: new FormControl(null, {
        validators: [Validators.required]
      })
    });
  }

  // addFileByChoose(file: HTMLInputElement, result: HTMLElement) {
  //   let inputFile: File = file.files[0],
  //     fileName = file.files[0].name;
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     this.img = reader.result as string;
  //     console.log(this.img)
  //   };
  //   reader.readAsDataURL(inputFile);
  // }


  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get("image").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }







}

