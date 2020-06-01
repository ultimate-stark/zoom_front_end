import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { } from 'wowjs';
import { NgwWowService } from 'ngx-wow';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  adminPosition: boolean = false;
  homePosition: boolean = false;
  constructor(private location: Location, private router: Router, private wowService: NgwWowService) { }

  ngOnInit() {
    this.wowService.init();
    this.location.onUrlChange(() => {
      if (this.location.path()) {
        this.homePosition = false;
      } else {
        this.homePosition = true;
      }
      if (this.location.path().startsWith('/admin')) {
        this.adminPosition = true;
      } else {
        this.adminPosition = false;
      }
    })
  }

}
