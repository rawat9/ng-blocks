import {
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  inject,
  input,
  signal,
  viewChild
} from '@angular/core'
import { FloatingSidenav } from './floating-sidenav'
import { ToolbarService } from '../../../services/toolbar.service'
import { RouterLink } from '@angular/router'

@Component({
  selector: 'app-blocks-layout',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FloatingSidenav, RouterLink],
  template: `
    <div
      class="flex flex-col lg:flex-row w-full h-full min-h-screen lg:h-screen bg-muted dark:bg-background"
    >
      <div
        class="fixed top-5 left-4 sm:left-6 lg:absolute lg:top-8 lg:left-16 z-50 flex items-center gap-2.5 pointer-events-none"
      >
        <div class="pointer-events-auto">
          <div class="relative">
            <app-floating-sidenav [(open)]="sidebarOpen"></app-floating-sidenav>
          </div>
        </div>
        @if (title()) {
          <div
            class="inline-flex h-9 items-center gap-2 rounded-md bg-background/55 px-3.5 text-xs text-muted-foreground backdrop-blur-sm pointer-events-auto"
          >
            <a
              routerLink="/"
              class="text-sm font-medium transition-colors hover:text-foreground"
            >
              Blocks
            </a>
            <span class="text-border">/</span>
            <span
              class="max-w-25 sm:max-w-45 truncate text-sm font-semibold text-foreground"
            >
              {{ title() }}
            </span>
          </div>
        }
      </div>

      <!-- Column left -->
      <div
        #leftCol
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
                  {{ title() || 'ng-blocks' }}
                </h1>
                <p
                  class="text-lg text-muted-foreground/90 leading-relaxed max-w-2xl font-normal"
                >
                  {{ description() }}
                </p>
              </div>
            </header>

            <ng-content select="[left-column]"></ng-content>
          </div>
        </div>
      </div>

      <!-- Column right -->
      <div
        #rightCol
        class="flex-1 lg:basis-1/2 lg:max-w-1/2 lg:h-full lg:sticky lg:top-0 order-first lg:order-last flex flex-col z-20 bg-muted/40 dark:bg-muted/40"
      >
        <div
          class="relative w-full h-[55vh] lg:h-full p-4 lg:pr-2 lg:pl-2 lg:py-2 overflow-hidden"
        >
          <ng-content select="[right-column]"></ng-content>
        </div>
      </div>
    </div>
  `
})
export class BlocksLayout {
  protected readonly sidebarOpen = signal(false)

  public readonly title = input<string>()

  public readonly description = input.required<string>()

  private readonly toolbar = inject(ToolbarService)

  private readonly leftCol = viewChild<ElementRef<HTMLElement>>('leftCol')

  private readonly rightCol = viewChild<ElementRef<HTMLElement>>('rightCol')

  constructor() {
    effect(() => {
      const left = this.leftCol()?.nativeElement
      const right = this.rightCol()?.nativeElement
      if (!left || !right) return

      const fs = this.toolbar.fullscreen()

      const easing = 'cubic-bezier(0.22, 1, 0.36, 1)'
      left.style.transition = `flex-basis 500ms ${easing}, max-width 500ms ${easing}, opacity 280ms ease, border-color 220ms ease`
      right.style.transition = `flex-basis 500ms ${easing}, max-width 500ms ${easing}`

      if (fs) {
        left.style.flexBasis = '0%'
        left.style.maxWidth = '0%'
        left.style.opacity = '0'
        left.style.overflow = 'hidden'
        right.style.flexBasis = '100%'
        right.style.maxWidth = '100%'
      } else {
        left.style.flexBasis = ''
        left.style.maxWidth = ''
        left.style.opacity = ''
        left.style.overflow = ''
        right.style.flexBasis = ''
        right.style.maxWidth = ''
      }
    })
  }
}
