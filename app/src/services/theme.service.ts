import { Injectable } from '@angular/core'

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly storageKey = 'theme'

  toggle() {
    const html = document.documentElement
    const isDark = html.classList.toggle('dark')

    localStorage.setItem(this.storageKey, isDark ? 'dark' : 'light')
  }
}
