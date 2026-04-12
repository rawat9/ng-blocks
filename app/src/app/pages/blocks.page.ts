import {
  afterNextRender,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core'
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router'
import { provideIcons } from '@ng-icons/core'
import {
  lucideBot,
  lucideFormInput,
  lucideLayoutGrid,
  lucidePanelLeft,
  lucidePanelTop,
} from '@ng-icons/lucide'
import { filter } from 'rxjs/operators'
import { toSignal } from '@angular/core/rxjs-interop'
import { ThemeService } from '../../services/theme.service'
import { Section, InstallCommand, FloatingSidenav } from './_components'

const NAV_ITEMS = [
  { name: 'AI', path: '/blocks/ai', icon: 'lucideBot' },
  { name: 'Accordion', path: '/blocks/accordion', icon: 'lucideLayoutGrid' },
  { name: 'Forms', path: '/blocks/forms', icon: 'lucideFormInput' },
  { name: 'Tabs', path: '/blocks/tabs', icon: 'lucidePanelTop' },
]

@Component({
  selector: 'app-blocks-layout',
  imports: [RouterOutlet, RouterLink, Section, InstallCommand, FloatingSidenav],
  providers: [
    provideIcons({
      lucideBot,
      lucideFormInput,
      lucideLayoutGrid,
      lucidePanelLeft,
      lucidePanelTop,
    }),
  ],
  template: `
    <div class="flex flex-col lg:flex-row w-full h-full min-h-screen lg:h-screen bg-muted dark:bg-background">
      <div
        class="fixed top-5 left-4 sm:left-6 lg:absolute lg:top-8 lg:left-16 z-50 flex items-center gap-2.5 pointer-events-none"
      >
        <div class="pointer-events-auto">
          <div class="relative">
            <app-floating-sidenav [navItems]="navItems" [(open)]="sidebarOpen"></app-floating-sidenav>
          </div>
        </div>
        <div
          class="inline-flex h-9 items-center gap-2 rounded-md bg-background/55 px-3.5 text-xs text-muted-foreground backdrop-blur-sm pointer-events-auto"
        >
          <a
            routerLink="/blocks"
            class="text-sm font-medium transition-colors hover:text-foreground"
          >
            Blocks
          </a>
          @if (activeItemName()) {
            <span class="text-border">/</span>
            <span
              class="max-w-25 sm:max-w-45 truncate text-sm font-semibold text-foreground"
            >
              {{ activeItemName() }}
            </span>
          }
        </div>
      </div>

      <!-- Column left -->
      <div
        class="w-full lg:basis-1/2 lg:max-w-1/2 h-full flex flex-col relative z-10 bg-muted/40 dark:bg-muted/40"
      >
        <div
          class="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          <div
            class="px-6 lg:px-16 pt-12 lg:pt-48 pb-40 space-y-16 lg:space-y-20 max-w-3xl mx-auto"
          >
            <header class="space-y-10">
              <div class="space-y-6">
                <h1
                  class="text-4xl lg:text-6xl font-bold tracking-tighter bg-linear-to-br from-zinc-900 via-zinc-500 to-zinc-900 dark:from-white dark:via-zinc-400 dark:to-white bg-clip-text text-transparent leading-[1.1] mb-2 pb-2"
                >
                  {{ activeItemName() || 'Blocks' }}
                </h1>

                <p
                  class="text-lg text-muted-foreground/90 leading-relaxed max-w-2xl font-normal"
                >
                  A collection of components related to collapsible content
                  sections, allowing users to expand and collapse information as
                  needed.
                </p>
              </div>
            </header>

            <app-section title="Installation" class="pt-10">
              <app-install-command />
            </app-section>
          </div>
        </div>
      </div>

      <!-- Column right -->
      <div
        class="flex-1 lg:basis-1/2 lg:max-w-1/2 lg:h-full lg:sticky lg:top-0 order-first lg:order-last flex flex-col z-20 bg-muted/40 dark:bg-muted/40"
      >
        <div class="relative w-full h-[55vh] lg:h-full p-4 lg:p-2 overflow-hidden">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  `,
})
export default class BlocksLayout {
  private readonly router = inject(Router)
  readonly theme = inject(ThemeService)

  readonly moon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4.5"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path><path d="M12 3l0 18"></path><path d="M12 9l4.65 -4.65"></path><path d="M12 14.3l7.37 -7.37"></path><path d="M12 19.6l8.85 -8.85"></path></svg>`

  readonly isLoaded = signal(false)
  readonly sidebarOpen = signal(false)
  readonly navItems = NAV_ITEMS

  private readonly navEnd = toSignal(
    this.router.events.pipe(filter((e) => e instanceof NavigationEnd)),
    { initialValue: null },
  )

  /** Reactive current URL — updates on every navigation */
  readonly currentPath = computed(() => {
    this.navEnd() // subscribe to navigation events for reactivity
    return this.router.url
  })

  readonly activeItemName = computed(() => {
    const url = this.currentPath()
    return NAV_ITEMS.find((i) => url.startsWith(i.path))?.name ?? null
  })

  constructor() {
    afterNextRender(() => {
      this.isLoaded.set(true)
    })
  }
}
