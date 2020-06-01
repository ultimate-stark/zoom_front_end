import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ThemeService } from '../services/theme.service';
import { NgwWowService } from 'ngx-wow';
@Component({
  selector: 'app-change-themes',
  templateUrl: './change-themes.component.html',
  styleUrls: ['./change-themes.component.scss']
})

export class ChangeThemesComponent implements OnInit {

  isShow: boolean = false;
  @ViewChild('viewBoxs', { static: true }) viewBoxs: ElementRef

  constructor(private themeService: ThemeService) { }

  ngOnInit() {
    this.toggleClassForSpinner();
  }


  // Toggle Class For Spinner
  toggleClassForSpinner() {
    let boxs = this.viewBoxs.nativeElement.childNodes;
    boxs.forEach(box => {
      box.addEventListener('click', () => {
        for (let i = 0; i < boxs.length; i++) {
          boxs[i].classList.remove('activeBox')
        }
        box.classList.add('activeBox');
      })
    })
  }

  // Toggle Spinn
  toggleColorSpin(colorBox: HTMLElement) {
    this.isShow = !this.isShow;
    colorBox.addEventListener('click', e => {
      e.stopPropagation();
    })
    if (this.isShow == true) {
      colorBox.style.transform = 'translateX(0)';
      colorBox.style.boxShadow = '-4px 4px 8px #d7d7d7';
    } else {
      colorBox.style.transform = 'translateX(-100%)';
      colorBox.style.boxShadow = '0px 0px 0px #d7d7d7';
    }
  }

  // Set Color's
  setBlueTheme() {
    this.themeService.setBlueTheme();
  }

  setDarkTheme() {
    this.themeService.setDarkTheme();
  }

  setGreenTheme() {
    this.themeService.setGreenTheme()
  }

  setPurpleTheme() {
    this.themeService.setPurpleTheme();
  }


}
