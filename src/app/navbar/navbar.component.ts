import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from "@angular/router";
import { AuthService } from "../auth/auth.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;
  adminPosition: boolean = false;
  @ViewChild('mainNavbar', { static: true }) mainNavbar: ElementRef;
  @ViewChild('navbarCollapse', { static: true }) navbarCollapse: ElementRef;
  @ViewChild('navbarNav', { static: true }) navbarNav: ElementRef;

  isShowingbuttonSearchChild: boolean = false;
  isNavShowing: boolean = false;
  isShowingBtnOver: boolean = false;
  media = window.matchMedia("(max-width: 991px)");
  minMedia = window.matchMedia("(min-width: 992px)");
  constructor(private location: Location, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
    let navbar = (this.mainNavbar.nativeElement as HTMLElement);
    let media = window.matchMedia("(max-width: 991px)");

    window.addEventListener('resize', () => {
      if (this.minMedia.matches) {
        (this.navbarCollapse.nativeElement as HTMLElement).classList.add('animation-navbar-collapse');
        (this.navbarCollapse.nativeElement as HTMLElement).style.top = '0';
      }
      else if (this.isNavShowing == true) {
        (this.navbarCollapse.nativeElement as HTMLElement).classList.add('animation-navbar-collapse');
        (this.navbarCollapse.nativeElement as HTMLElement).style.top = '0';
      }

      else {
        (this.navbarCollapse.nativeElement as HTMLElement).classList.remove('animation-navbar-collapse');
        (this.navbarCollapse.nativeElement as HTMLElement).style.top = navbar.clientHeight + 'px';
      }
    })

    // if Url Changes we 'll hide or show something by using this boolean
    this.location.onUrlChange(() => {
      if (this.location.path().startsWith('/admin')) {
        this.adminPosition = true;
      } else {
        this.adminPosition = false;
      }
      if (media.matches) {
        (this.navbarCollapse.nativeElement as HTMLElement).style.top = navbar.clientHeight + 'px';
      }
    })
    // if Media Match 991px make this FN
    if (this.media.matches) {
      (this.navbarCollapse.nativeElement as HTMLElement).style.top = navbar.clientHeight + 'px';
      (this.navbarNav.nativeElement as HTMLElement).classList.add('container');
    } else {
      (this.navbarNav.nativeElement as HTMLElement).classList.remove('container')
    }
    // Window on resize
    window.addEventListener('resize', () => {
      if (media.matches) {
        (this.navbarCollapse.nativeElement as HTMLElement).style.top = navbar.clientHeight + 'px';
        (this.navbarNav.nativeElement as HTMLElement).classList.add('container');
      } else {
        (this.navbarNav.nativeElement as HTMLElement).classList.remove('container')
      }
    })
  }

  // Toggle Navbar On Click Burger
  toggleNav(burger: HTMLElement, navbarCollapse: HTMLElement) {
    this.isNavShowing = !this.isNavShowing;
    if (this.media.matches) {
      if (this.isNavShowing == true) {
        navbarCollapse.classList.add('animation-navbar-collapse');
        burger.classList.add('animation-burger');
      } else {
        navbarCollapse.classList.remove('animation-navbar-collapse');
        burger.classList.remove('animation-burger');
      }
    }
  }


  toggleBtnOver(aboutOver: HTMLElement, buttonOver: HTMLElement) {
    this.isShowingBtnOver = !this.isShowingBtnOver;
    aboutOver.addEventListener('click', e => {
      e.stopPropagation();
    })
    if (this.isShowingBtnOver == true) {
      aboutOver.style.clipPath = 'circle(100% at 50% 50%)';
      aboutOver.style.pointerEvents = 'all';
    } else {
      aboutOver.style.clipPath = 'circle(0% at 100% 0)';
      aboutOver.style.pointerEvents = 'none';
    }
    buttonOver.addEventListener('click', e => {
      e.stopPropagation();
    })
    setTimeout(() => {
      window.addEventListener('click', () => {
        this.isShowingBtnOver = false;
        aboutOver.style.clipPath = 'circle(0% at 100% 0)';
        aboutOver.style.pointerEvents = 'none';
      })
    }, 1)
  }



  filter(type) {
    // console.log(query);
    if (type.key == "Enter") {
      let query = (type.target.value as HTMLInputElement);
      console.log(query)
      this.router.navigate(['/search'], { queryParams: { q: query } });
    } else {
      this.router.navigate(['/search'], { queryParams: { q: type } });
    }
  }

  onLogout() {
    this.authService.logout();
  }



  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }



}
