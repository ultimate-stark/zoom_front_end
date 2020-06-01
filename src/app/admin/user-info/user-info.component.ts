import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { NgwWowService } from 'ngx-wow';
import { AuthService } from '../../auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { User } from "../../auth/auth-data.model";

@Component({
  selector: 'app-add-user',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  userSignedUpLoading: boolean = false;
  isUploading: boolean = false;
  isLoading = false;
  form: FormGroup;
  userId: string;
  mode = 'create';
  user: User;
  private authStatusSub: Subscription;



  constructor(
    public route: ActivatedRoute,
    private wowService: NgwWowService,
    public authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    // fire make form FN
    this.makeForm();

    // Fire Get User FN
    this.getUser();
    this.wowService.init();
    console.log(this.userSignedUpLoading)
  }


  getUser() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("userId")) {
        this.mode = "edit";
        this.userId = paramMap.get("userId");
        console.log(this.userId)
        this.isLoading = true;
        this.authService.getUser(this.userId).subscribe(userData => {
          console.log(userData)
          this.isLoading = false;
          this.user = {
            id: userData._id,
            name: userData.name,
            email: userData.email,
            password: userData.password,
          };
          this.form.setValue({
            name: this.user.name,
            email: this.user.email,
            password: this.user.password,
            confirmPassword:this.user.password
          });
          console.log(this.form.value)
        });
      } else {
        this.mode = "create";
        this.userId = null;
      }
    });
  }


  // Make Form
  makeForm() {
    if (this.mode == 'create') {
      this.form = new FormGroup({
        name: new FormControl(null, { validators: [Validators.required] }),
        email: new FormControl(null, { validators: [Validators.required, Validators.email] }),
        password: new FormControl(null, { validators: [Validators.required, Validators.minLength(6)] }),
        confirmPassword: new FormControl(null, { validators: [Validators.required] })
      });
    }
  }
  // Get All Controls By Name

  name() {
    return this.form.controls.name
  }
  email() {
    return this.form.controls.email
  }
  password() {
    return this.form.controls.password
  }
  confirmPassword() {
    return this.form.controls.confirmPassword
  }


  // OnSubmit
  // onSubmit() {
  //   if (this.mode == 'create') {
  //     this.authService.createUser(
  //       this.form.value.name,
  //       this.form.value.email,
  //       this.form.value.password)
  //       .subscribe(
  //         response => {
  //           if (response.type == 0) {
  //             this.userSignedUpLoading = true;
  //             console.log(this.userSignedUpLoading)
  //           }
  //           else if (response.type == 4) {
  //             this.userSignedUpLoading = false;
  //             this.toastr.success('has signed up', this.form.value.email);
  //             this.router.navigate(["/admin/users"]);
  //             console.log(this.userSignedUpLoading)
  //           }
  //         },
  //         error => {
  //           this.authService.authStatusListener.next(false);
  //         }
  //       );;
  //   } else {
  //     //
  //   }
  // }

  onSubmit() {
    console.log(this.form)
    if (this.form.invalid) {
      return;
    }
    // this.isLoading = true;
    if (this.mode === "create") {
      this.authService.createUser(
        this.form.value.name,
        this.form.value.email,
        this.form.value.password).subscribe(e => {
        if (e.type == 0) {
          this.isUploading = true;
        }
        if (e.type == 4) {
          this.isUploading = false;
          this.toastr.success('تم اضافة العضو')
          console.log(this.email().value)
          this.router.navigate(['admin/users'])
        }
        console.log(this.isUploading)
      })
    } else {
      this.authService.updateUser(
        this.userId,
        this.form.value.name,
        this.form.value.email,
        this.form.value.password,
      );
    }
    this.form.reset();
  }




}
