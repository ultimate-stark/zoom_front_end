import { Injectable } from '@angular/core';
import { Theme, blue, dark, green, purple } from '../theme';
@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private active: Theme = dark;
  private availableThemes: Theme[] = [blue, dark, green, purple];



  getAvailableThemes(): Theme[] {
    return this.availableThemes;
  }

  getActiveTheme(): Theme {
    return this.active;
  }

  setBlueTheme(): void {
    this.setActiveTheme(blue);
  }
  setDarkTheme(): void {
    this.setActiveTheme(dark);
  }
  setGreenTheme(): void {
    this.setActiveTheme(green);
  }

  setPurpleTheme(): void {
    this.setActiveTheme(purple);
  }

  setActiveTheme(theme: Theme): void {
    this.active = theme;
    Object.keys(this.active.properties).forEach(property => {
      document.documentElement.style.setProperty(
        property,
        this.active.properties[property]
      )
    })
  }
}
