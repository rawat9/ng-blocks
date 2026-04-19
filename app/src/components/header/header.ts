import { Component, inject } from '@angular/core'
import { RouterLink } from '@angular/router'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { lucideGithub, lucideTwitter } from '@ng-icons/lucide'
import { ToolbarService } from '../../services/toolbar.service'
import { Button } from '../ui/button'

const moonSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4.5"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path><path d="M12 3l0 18"></path><path d="M12 9l4.65 -4.65"></path><path d="M12 14.3l7.37 -7.37"></path><path d="M12 19.6l8.85 -8.85"></path></svg>`

@Component({
  selector: 'app-header',
  imports: [RouterLink, NgIcon, Button],
  providers: [
    provideIcons({
      lucideGithub,
      lucideTwitter
    })
  ],
  host: {
    class:
      'backdrop-blur-lg sticky top-0 z-50 w-full border-b border-neutral-200/60 dark:border-neutral-800/60'
  },
  template: `
    <header class="flex h-16 items-center justify-between px-4">
      <a routerLink="/" class="flex items-center text-xl font-semibold">
        <span>ng-blocks</span>
      </a>
      <nav class="flex gap-1 items-center justify-center">
        <a
          appButton
          [variant]="'ghost'"
          [size]="'icon'"
          href="https://github.com/rawat9/ng-blocks"
        >
          <ng-icon name="lucideGithub" />
          <span class="sr-only">GitHub</span>
        </a>
        <button
          appButton
          [variant]="'ghost'"
          [size]="'icon'"
          (click)="toolbar.toggleTheme()"
        >
          <ng-icon [svg]="moon" />
          <span class="sr-only">GitHub</span>
        </button>
      </nav>
    </header>
  `
})
export class Header {
  readonly toolbar = inject(ToolbarService)

  readonly moon = moonSvg
}
