import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-category-box',
  templateUrl: './category-box.component.html',
  styleUrls: ['./category-box.component.scss']
})
export class CategoryBoxComponent implements OnInit, OnDestroy {

  isShow: boolean = false;
  @ViewChild('box', { static: true }) box: ElementRef
  @ViewChild('icon', { static: true }) icon: ElementRef
  @ViewChild('radio', { static: true }) radio: ElementRef


  categorys = [
    {
      category: "ديني"
    },
    {
      category: "افغاني"
    },
    {
      category: "هندوسي"
    },
    {
      category: "تاريخي"
    },
    {
      category: "اسطوري"
    }
  ]

  constructor(private location: Location) { }

  ngOnInit() {
    // Remove Some Styles on link Change
    this.location.onUrlChange(() => {
      if (this.location.path().startsWith('/admin')) {
        (this.box.nativeElement as HTMLElement).style.display = 'none';
      } else {
        (this.box.nativeElement as HTMLElement).style.display = 'block';
      }

      if (this.location.path()) {
        console.log('yes')
      } else {
        let radio = (this.radio);
        console.log(radio)

        console.log('no')
        // console.log(radio.addEventListener('reset', () => {
        //   console.log("done")
        // }))
      }
    })
  }


  // Toggle Box FN
  toggleBox() {
    this.isShow = !this.isShow;
    let box = (this.box.nativeElement as HTMLElement),
      icon = (this.icon.nativeElement as HTMLElement);
    if (this.isShow == true) {
      box.style.transform = 'translateX(101%)';
      icon.classList.replace('fa-angle-double-right', 'fa-angle-double-left');
    } else {
      box.style.transform = 'translateX(0)';
      icon.classList.replace('fa-angle-double-left', 'fa-angle-double-right');

    }
  }

  ngOnDestroy() {
    console.log('yes')
  }
}
