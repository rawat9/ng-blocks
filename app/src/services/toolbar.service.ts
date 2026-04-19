import { Injectable, signal } from '@angular/core'

@Injectable({ providedIn: 'root' })
export class ToolbarService {
  private readonly themeStorageKey = 'theme'

  readonly fullscreen = signal(false)

  toggleTheme() {
    const html = document.documentElement
    const isDark = html.classList.toggle('dark')

    localStorage.setItem(this.themeStorageKey, isDark ? 'dark' : 'light')
  }

  toggleFullscreen() {
    this.fullscreen.update((v) => !v)
  }
}
