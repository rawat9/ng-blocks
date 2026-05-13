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
import { ToolbarService } from '#services/toolbar.service'
import { RouterLink } from '@angular/router'

@Component({
  selector: 'app-blocks-layout',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FloatingSidenav, RouterLink],
  template: `
    <div
      class="bg-muted dark:bg-background flex h-full min-h-screen w-full flex-col lg:h-screen lg:flex-row"
    >
      <div
        class="pointer-events-none fixed top-5 left-4 z-50 flex items-center gap-2.5 sm:left-6 lg:absolute lg:top-8 lg:left-16"
      >
        <div class="pointer-events-auto">
          <div class="relative">
            <app-floating-sidenav [(open)]="sidebarOpen"></app-floating-sidenav>
          </div>
        </div>
        @if (title()) {
          <div
            class="bg-background/55 text-muted-foreground pointer-events-auto inline-flex h-9 items-center gap-2 rounded-md px-3.5 text-xs backdrop-blur-sm"
          >
            <a
              routerLink="/"
              class="hover:text-foreground text-sm font-medium transition-colors"
            >
              Blocks
            </a>
            <span class="text-border">/</span>
            <span
              class="text-foreground max-w-25 truncate text-sm font-semibold sm:max-w-45"
            >
              {{ title() }}
            </span>
          </div>
        }
      </div>

      <!-- Column left -->
      <div
        #leftCol
        class="bg-muted/40 dark:bg-muted/40 relative z-10 flex h-full w-full flex-col lg:max-w-1/2 lg:basis-1/2"
      >
        <div
          class="flex-1 overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <div
            class="mx-auto max-w-3xl space-y-16 px-6 pt-12 pb-40 lg:space-y-20 lg:px-16 lg:pt-48"
          >
            <header class="space-y-10">
              <div class="space-y-6">
                <h1
                  class="mb-2 bg-linear-to-br from-zinc-900 via-zinc-500 to-zinc-900 bg-clip-text pb-2 text-4xl leading-[1.1] font-bold tracking-tighter text-transparent lg:text-6xl dark:from-white dark:via-zinc-400 dark:to-white"
                >
                  {{ title() || 'ng-blocks' }}
                </h1>
                <p
                  class="text-muted-foreground/90 max-w-2xl text-lg leading-relaxed font-normal"
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
        class="bg-muted/40 dark:bg-muted/40 z-20 order-first flex flex-1 flex-col lg:sticky lg:top-0 lg:order-last lg:h-full lg:max-w-1/2 lg:basis-1/2"
      >
        <div
          class="relative h-[55vh] w-full overflow-hidden p-4 lg:h-full lg:py-2 lg:pr-2 lg:pl-2"
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
