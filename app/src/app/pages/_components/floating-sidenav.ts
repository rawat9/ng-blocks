import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  model,
  output
} from '@angular/core'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { lucideTerminal } from '@ng-icons/lucide'
import { NavigationEnd, Router, RouterLink } from '@angular/router'
import { toSignal } from '@angular/core/rxjs-interop'
import { filter } from 'rxjs'
import {
  lucideBot,
  lucideFormInput,
  lucideLayoutGrid,
  lucidePanelLeft,
  lucidePanelTop
} from '@ng-icons/lucide'

@Component({
  selector: 'app-floating-sidenav',
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    provideIcons({
      lucideTerminal,
      lucideBot,
      lucideFormInput,
      lucideLayoutGrid,
      lucidePanelLeft,
      lucidePanelTop
    })
  ],
  template: `
    <button
      type="button"
      aria-controls="blocks-floating-sidebar"
      [attr.aria-expanded]="open()"
      aria-label="Toggle floating sidebar with navigation"
      class="flex h-9 w-9 items-center justify-center rounded-md bg-background/60 text-muted-foreground backdrop-blur-sm transition-colors hover:bg-background/80 hover:text-foreground"
      (click)="toggleSidebar()"
    >
      <svg
        width="15"
        height="15"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="1"
          y="2"
          width="16"
          height="14"
          rx="2.5"
          stroke="currentColor"
          strokeWidth="1.4"
        />
        <rect
          x="1"
          y="2"
          width="5.5"
          height="14"
          rx="2.5"
          fill="currentColor"
        />
      </svg>
    </button>

    <aside
      id="blocks-floating-sidebar"
      aria-label="Blocks navigation"
      tabindex="0"
      class="absolute select-none top-12 left-0 z-50 w-[min(18rem,calc(100vw-2.5rem))] origin-top-left rounded-2xl border border-border p-1 bg-sidebar text-sm shadow-[0_24px_80px_-32px_rgba(0,0,0,0.45)] backdrop-blur-2xl transition-all duration-200 ease-out lg:w-72"
      [class]="sidebarPanelClass()"
      [attr.aria-hidden]="!open()"
      (mouseleave)="closeSidebar()"
      (keydown.escape)="closeSidebar()"
    >
      <div
        class="mb-2 flex items-center justify-between rounded-xl border border-zinc-200/60 bg-zinc-50/80 px-3 py-2 dark:border-zinc-800/60 dark:bg-zinc-950/40"
      >
        <div class="space-y-0.5">
          <p
            class="text-[0.68rem] font-medium uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400"
          >
            Navigation
          </p>
          <p class="text-sm font-semibold text-foreground">Blocks</p>
        </div>
        <span
          class="inline-flex min-w-8 items-center justify-center rounded-full border border-zinc-200/70 px-2 py-1 text-[0.7rem] font-medium text-zinc-500 dark:border-zinc-800/70 dark:text-zinc-400"
        >
          {{ navItems.length }}
        </span>
      </div>

      <nav class="space-y-1">
        @for (item of navItems; track item.path) {
          <a
            [routerLink]="item.path"
            class="group flex items-center gap-3 rounded-xl px-3 py-2.5 outline-none transition-all duration-200"
            [class]="navItemClass(item.path)"
            (click)="handleNavItemClick()"
          >
            <span
              class="flex size-9 items-center justify-center rounded-xl border transition-colors duration-200"
              [class]="navIconClass(item.path)"
            >
              <ng-icon [name]="item.icon" size="16" />
            </span>

            <span class="min-w-0 flex-1">
              <span class="block truncate text-[0.95rem] font-medium">
                {{ item.name }}
              </span>
            </span>
          </a>
        }
      </nav>
    </aside>
  `,
  imports: [NgIcon, RouterLink]
})
export class FloatingSidenav {
  readonly open = model(false)

  readonly navItems = [
    { name: 'AI', path: '/ai', icon: 'lucideBot' },
    { name: 'Accordion', path: '/accordion', icon: 'lucideLayoutGrid' },
    { name: 'Forms', path: '/forms', icon: 'lucideFormInput' },
    { name: 'Tabs', path: '/tabs', icon: 'lucidePanelTop' }
  ]

  readonly router = inject(Router)

  readonly sidebarClose = output()

  readonly sidebarPanelClass = computed(() =>
    this.open()
      ? 'pointer-events-auto translate-y-0 scale-100 opacity-100'
      : 'pointer-events-none -translate-y-2 scale-95 opacity-0'
  )

  private readonly navEnd = toSignal(
    this.router.events.pipe(filter((e) => e instanceof NavigationEnd)),
    { initialValue: null }
  )

  /** Reactive current URL — updates on every navigation */
  readonly currentPath = computed(() => {
    this.navEnd() // subscribe to navigation events for reactivity
    return this.router.url
  })

  isActive(path: string): boolean {
    return this.currentPath().startsWith(path)
  }

  navItemClass(path: string): string {
    return this.isActive(path) ? 'bg-muted' : 'hover:bg-muted'
  }

  navIconClass(path: string): string {
    return this.isActive(path)
      ? 'text-background bg-primary'
      : 'group-hover:border-zinc-300/80 group-hover:bg-primary group-hover:text-background'
  }

  toggleSidebar(): void {
    this.open.update((isOpen) => !isOpen)
  }

  closeSidebar(): void {
    this.open.set(false)
  }

  handleNavItemClick(): void {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      this.closeSidebar()
    }
  }
}
