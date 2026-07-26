import { Injectable, signal } from '@angular/core'

@Injectable({ providedIn: 'root' })
export class ToolbarService {
  private readonly themeStorageKey = 'theme'

  readonly fullscreen = signal(false)

  public async toggleTheme() {
    const html = document.documentElement

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (!document.startViewTransition || prefersReducedMotion) {
      this.applyTheme(html)
      return
    }

    const transitionClass = 'vertical-wipe-transition'

    const transition = document.startViewTransition(() => {
      this.applyTheme(html)
      html.classList.add(transitionClass)
    })

    try {
      await transition.finished
    } finally {
      html.classList.remove(transitionClass)
    }
  }

  private applyTheme(html: HTMLElement) {
    const isDark = html.classList.toggle('dark')
    localStorage.setItem(this.themeStorageKey, isDark ? 'dark' : 'light')
  }

  toggleFullscreen() {
    this.fullscreen.update((v) => !v)
  }
}
