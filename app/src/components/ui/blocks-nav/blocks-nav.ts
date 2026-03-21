import {
  Component,
  computed,
  ElementRef,
  HostListener,
  inject,
  input,
  PLATFORM_ID,
  signal,
} from '@angular/core'
import { isPlatformBrowser } from '@angular/common'
import { Router, RouterLink } from '@angular/router'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucideChevronLeft,
  lucideChevronRight,
  lucideCircle,
} from '@ng-icons/lucide'

export interface BlockRoute {
  name: string
  path: string
  icon: string
}

export const BLOCK_ROUTES: BlockRoute[] = [
  { name: 'AI', path: '/ai', icon: 'lucideMessageSquare' },
  { name: 'Accordion', path: '/accordion', icon: 'lucideLayoutGrid' },
  { name: 'Forms', path: '/forms', icon: 'lucideFormInput' },
  { name: 'Tabs', path: '/tabs', icon: 'lucidePanelTop' },
  { name: 'Data Table', path: '/data-table', icon: 'lucideTable' },
]

@Component({
  selector: 'app-blocks-nav',
  imports: [RouterLink, NgIcon],
  providers: [
    provideIcons({
      lucideChevronLeft,
      lucideChevronRight,
      lucideCircle,
    }),
  ],
  host: {
    class: 'block',
  },
  template: `
    <!-- Navigation bar -->
    <nav
      class="flex items-center justify-between gap-4 py-4 px-2 rounded-2xl bg-neutral-100/50 dark:bg-neutral-800/30 border border-neutral-200/50 dark:border-neutral-700/50"
    >
      <!-- Previous button -->
      <button
        (click)="navigatePrev()"
        [disabled]="!hasPrev()"
        class="group flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed enabled:hover:bg-neutral-200/70 dark:enabled:hover:bg-neutral-700/50"
      >
        <ng-icon
          name="lucideChevronLeft"
          size="18"
          class="transition-transform duration-300 group-enabled:group-hover:-translate-x-1"
        />
        <span class="hidden sm:inline">{{
          prevBlock()?.name || 'Previous'
        }}</span>
      </button>

      <!-- Page indicators -->
      <div class="flex items-center gap-2">
        @for (block of blocks; track block.path; let i = $index) {
          <a
            [routerLink]="block.path"
            [title]="block.name"
            class="group relative p-1 transition-all duration-300"
          >
            <span
              class="block size-2 rounded-full transition-all duration-300"
              [class]="
                currentIndex() === i
                  ? 'bg-violet-500 scale-125'
                  : 'bg-neutral-300 dark:bg-neutral-600 group-hover:bg-violet-400 group-hover:scale-110'
              "
            ></span>

            <!-- Tooltip -->
            <span
              class="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs font-medium rounded-md bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none"
            >
              {{ block.name }}
            </span>
          </a>
        }
      </div>

      <!-- Next button -->
      <button
        (click)="navigateNext()"
        [disabled]="!hasNext()"
        class="group flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed enabled:hover:bg-neutral-200/70 dark:enabled:hover:bg-neutral-700/50"
      >
        <span class="hidden sm:inline">{{ nextBlock()?.name || 'Next' }}</span>
        <ng-icon
          name="lucideChevronRight"
          size="18"
          class="transition-transform duration-300 group-enabled:group-hover:translate-x-1"
        />
      </button>
    </nav>

    <!-- Swipe hint (shown on touch devices) -->
    @if (showSwipeHint()) {
      <div
        class="mt-3 text-center text-xs text-neutral-400 dark:text-neutral-500 animate-fade-in-up"
        [style.--animation-delay]="'0ms'"
      >
        <span class="inline-flex items-center gap-1">
          <span>← Swipe to navigate →</span>
        </span>
      </div>
    }
  `,
})
export class BlocksNav {
  private readonly router = inject(Router)
  private readonly el = inject(ElementRef)
  private readonly platformId = inject(PLATFORM_ID)

  /** Current route path */
  currentPath = input.required<string>()

  readonly blocks = BLOCK_ROUTES

  // Swipe detection
  private touchStartX = 0
  private touchEndX = 0
  private readonly swipeThreshold = 50

  showSwipeHint = signal(false)

  currentIndex = computed(() => {
    const path = this.currentPath()
    return this.blocks.findIndex((b) => b.path === path)
  })

  hasPrev = computed(() => this.currentIndex() > 0)
  hasNext = computed(() => this.currentIndex() < this.blocks.length - 1)

  prevBlock = computed(() => {
    const idx = this.currentIndex()
    return idx > 0 ? this.blocks[idx - 1] : null
  })

  nextBlock = computed(() => {
    const idx = this.currentIndex()
    return idx < this.blocks.length - 1 ? this.blocks[idx + 1] : null
  })

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      // Show swipe hint on touch devices
      if ('ontouchstart' in window) {
        this.showSwipeHint.set(true)
        // Hide after 3 seconds
        setTimeout(() => this.showSwipeHint.set(false), 3000)
      }
    }
  }

  @HostListener('window:touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.changedTouches[0].screenX
  }

  @HostListener('window:touchend', ['$event'])
  onTouchEnd(event: TouchEvent) {
    this.touchEndX = event.changedTouches[0].screenX
    this.handleSwipe()
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft' && this.hasPrev()) {
      event.preventDefault()
      this.navigatePrev()
    } else if (event.key === 'ArrowRight' && this.hasNext()) {
      event.preventDefault()
      this.navigateNext()
    }
  }

  private handleSwipe() {
    const diff = this.touchStartX - this.touchEndX

    if (Math.abs(diff) > this.swipeThreshold) {
      if (diff > 0 && this.hasNext()) {
        // Swiped left - go to next
        this.navigateNext()
      } else if (diff < 0 && this.hasPrev()) {
        // Swiped right - go to previous
        this.navigatePrev()
      }
    }
  }

  navigatePrev() {
    const prev = this.prevBlock()
    if (prev) {
      this.router.navigate([prev.path])
    }
  }

  navigateNext() {
    const next = this.nextBlock()
    if (next) {
      this.router.navigate([next.path])
    }
  }
}
