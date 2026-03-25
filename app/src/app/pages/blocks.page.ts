import { afterNextRender, Component, computed, inject, signal } from '@angular/core'
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucideArrowLeft,
  lucideBot,
  lucideChevronRight,
  lucideFormInput,
  lucideGithub,
  lucideLayoutGrid,
  lucideMenu,
  lucidePanelTop,
  lucideSearch,
  lucideTable,
  lucideX
} from '@ng-icons/lucide'
import { filter } from 'rxjs/operators'
import { toSignal } from '@angular/core/rxjs-interop'
import { InputGroup } from '../../components/ui/input-group/input-group'
import { InputGroupTextarea } from '../../components/ui/input-group/input-group-input'
import { InputGroupAddon } from '../../components/ui/input-group/input-group-addon'
import { ThemeService } from '../../services/theme.service'
import { Button } from '../../components/ui/button'

const NAV_ITEMS = [
  { name: 'AI', path: '/blocks/ai' },
  { name: 'Accordion', path: '/blocks/accordion' },
  { name: 'Forms', path: '/blocks/forms' },
  { name: 'Tabs', path: '/blocks/tabs' },
]

@Component({
  selector: 'app-blocks-page',
  imports: [
    RouterLink,
    NgIcon,
    RouterOutlet,
    InputGroup,
    InputGroupTextarea,
    InputGroupAddon,
    Button,
  ],
  providers: [
    provideIcons({
      lucideArrowLeft,
      lucideLayoutGrid,
      lucidePanelTop,
      lucideTable,
      lucideFormInput,
      lucideChevronRight,
      lucideMenu,
      lucideX,
      lucideBot,
      lucideSearch,
      lucideGithub,
    }),
  ],
  template: `
    <div class="relative flex min-h-[calc(100vh-64px)]">
      <!-- Mobile overlay -->
      @if (sidebarOpen()) {
        <button
          type="button"
          aria-label="Close sidebar"
          class="fixed inset-0 z-20 w-full cursor-default bg-black/30 backdrop-blur-sm md:hidden"
          (click)="sidebarOpen.set(false)"
        ></button>
      }

      <!-- Sidebar -->
      <aside
        class="fixed md:sticky top-0 z-60 h-full md:z-auto bg-background md:h-screen w-64 shrink-0 flex-col border-neutral-200 dark:border-neutral-800 transition-transform duration-300 ease-in-out md:flex md:translate-x-0"
        [class.-translate-x-full]="!sidebarOpen()"
        [class.translate-x-0]="sidebarOpen()"
      >
        <!-- Sidebar header -->
        <div class="flex h-16 shrink-0 items-center px-4">
          <a routerLink="/" class="flex items-center text-xl font-semibold">
            <span>ng-blocks</span>
          </a>
        </div>

        <!-- Nav sections -->
        <div class="flex-1 overflow-y-auto py-4 px-3">
          <div class="mb-2">
            <div appInputGroup class="max-w-xs">
              <input appInputGroupInput placeholder="Search..." />
              <div appInputGroupAddon>
                <ng-icon name="lucideSearch" size="13" />
              </div>
            </div>
          </div>

          <nav class="flex flex-col gap-0.5">
            @for (item of navItems; track item.path) {
              <a
                [routerLink]="item.path"
                (click)="sidebarOpen.set(false)"
                class="group flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium transition-all duration-150"
                [class]="
                  isActive(item.path)
                    ? 'bg-violet-50 dark:bg-violet-500/10 text-violet-700 dark:text-violet-400'
                    : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100'
                "
              >
                <span>{{ item.name }}</span>
              </a>
            }
          </nav>
        </div>

        <!-- Sidebar footer -->
        <div class="flex h-14 shrink-0 items-center justify-between px-3">
          <a
            appButton
            [variant]="'ghost'"
            [size]="'icon'"
            href="https://github.com/rawat9/ng-blocks"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub repository"
          >
            <ng-icon name="lucideGithub" size="18" />
          </a>
          <button
            appButton
            [variant]="'ghost'"
            [size]="'icon'"
            (click)="theme.toggle()"
            aria-label="Toggle dark mode"
          >
            <ng-icon [svg]="moon" />
          </button>
        </div>
      </aside>

      <!-- Main content -->
      <div
        class="flex flex-1 flex-col border mr-2 my-2 rounded-xl no-scrollbar dark:bg-black/40 overflow-y-auto h-[calc(100vh-16px)]"
      >
        <!-- Mobile top bar -->
        <div
          class="sticky top-0 z-10 flex h-12 items-center gap-3 border-b border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-sm px-4 md:hidden"
        >
          <button
            class="flex items-center justify-center size-8 rounded-lg text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            (click)="sidebarOpen.set(true)"
          >
            <ng-icon name="lucideMenu" size="18" />
          </button>
          <div
            class="flex items-center gap-1.5 text-sm text-neutral-500 dark:text-neutral-400"
          >
            <span>Blocks</span>
            @if (activeItemName()) {
              <ng-icon name="lucideChevronRight" size="13" />
              <span
                class="font-medium text-neutral-900 dark:text-neutral-100"
                >{{ activeItemName() }}</span
              >
            } @else {
              <ng-icon name="lucideChevronRight" size="13" />
              <span class="font-medium text-neutral-900 dark:text-neutral-100"
                >Overview</span
              >
            }
          </div>
        </div>

        <!-- Page content -->
        <div class="container px-6 mx-auto py-8 md:px-16 md:py-10 max-w-4xl">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  `,
})
export default class blocksPage {
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

  isActive(path: string): boolean {
    return this.currentPath().startsWith(path)
  }

  constructor() {
    afterNextRender(() => {
      this.isLoaded.set(true)
    })
  }
}
