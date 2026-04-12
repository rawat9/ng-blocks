import {
  afterNextRender,
  Component, computed, inject,
  input,
  linkedSignal,
  signal
} from '@angular/core'
import { RouteMeta } from '@analogjs/router'
import { blocks } from '../../../blocks/registry'
import { Router } from '@angular/router'
import { AnimateOnScrollDirective } from '../../../directives'
import { ThemeService } from '../../../services/theme.service'
import { cn } from '../../../lib/utils'
import { NgComponentOutlet } from '@angular/common'

export const routeMeta: RouteMeta = {
  title: (route) => {
    const block = route.paramMap.get('block')
    return block ? `ng-blocks / ${block}` : ''
  },
  canActivate: [
    async (route) => {
      const blockParam: string = route.params['block']
      const found = blocks.some(
        (b) => b.title.toLocaleLowerCase() === blockParam,
      )
      if (!found) {
        await inject(Router).navigate(['/not-found'])
      }
      return true
    },
  ],
}

@Component({
  selector: 'app-block-page',
  imports: [AnimateOnScrollDirective, NgComponentOutlet],
  template: `
    <!-- <div
      class="mb-8 opacity-0"
      [class.animate-fade-in-up]="isLoaded()"
      [style.--animation-delay]="'50ms'"
    >
      <p
        class="mb-1.5 text-xs font-semibold uppercase tracking-widest text-violet-500 dark:text-violet-400"
      >
        Components
      </p>

      <h1
        class="text-2xl font-semibold text-neutral-900 dark:text-neutral-50 capitalize"
      >
        {{ block() | lowercase }}
      </h1>

      <p class="mt-1.5 text-sm text-neutral-500 dark:text-neutral-400">
        {{ getBlockInfo().description }}
      </p>
    </div> -->

    <!-- <div
      class="mb-8 h-px bg-neutral-200 dark:bg-neutral-800 opacity-0"
      [class.animate-fade-in-up]="isLoaded()"
      [style.--animation-delay]="'100ms'"
    ></div> -->

    <div class="relative w-full h-full rounded-xl lg:rounded-2xl overflow-hidden bg-background flex flex-col p-4" [class.animate-fade-in-up]="isLoaded()" [style.--animation-delay]="'150ms'">
      <div class="absolute top-4 right-4 z-20">
        <div class="flex items-center gap-0.5 rounded-lg border border-border/70 bg-white/95 dark:bg-[#121212] px-1 py-1">
          <button class="inline-flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              color="currentColor"
              class="size-4"
              strokeWidth="2"
              stroke="currentColor"
            >
              <path d="M5 12L19 5" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" />
              <path d="M16 9L22 13.8528M12.4128 12.4059L19.3601 18.3634M8 15.6672L15 21.5" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </button>
          <!-- Theme toggle -->
          <div class="[&_button]:h-7 [&_button]:w-7 [&_button]:rounded-md [&_button]:border [&_button]:border-transparent [&_button]:text-foreground/60 [&_button]:transition-all [&_button]:duration-150 hover:[&_button]:border-border/70 hover:[&_button]:bg-muted/70 hover:[&_button]:text-foreground [&_button]:focus-visible:outline-none [&_button]:focus-visible:ring-2 [&_button]:focus-visible:ring-ring/40">
            <button class="inline-flex items-center justify-center" (click)="theme.toggle()">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                color="currentColor"
                class="-rotate-45 size-4"
                strokeWidth="2"
                stroke="currentColor"
              >
                <path d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="2" />
                <path d="M5 20L19 5" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" />
                <path d="M16 9L22 13.8528M12.4128 12.4059L19.3601 18.3634M8 15.6672L15 21.5" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    
      <div appAnimateOnScroll [class]="cn('w-full overflow-auto flex [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]', 'h-full')">
        <div [class]="cn('w-full', 'p-10 flex items-center justify-center')">
          @let component = getBlockInfo().components.find(c => c.title === selectedComponent());
          <div className="w-full h-full flex items-center justify-center">
            <!-- <app-block-viewer [block]="block()" [title]="selectedComponent()" [component]="component!.component" [path]="component!.path"></app-block-viewer> -->
            <!-- {resolvedActiveVariant === -1 ? children : variants[resolvedActiveVariant]?.preview} -->
             <ng-container *ngComponentOutlet="component!.component"></ng-container>
          </div>
        </div>
      </div>

      <div class="absolute bottom-0 left-0 right-0 z-10 h-14 flex items-center">
          <div class="flex items-center gap-1.5 px-3 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]" >
            @for (c of getBlockInfo().components; track c.title) {
              <button
                (click)="selectedComponent.set(c.title)"
                [class]="cn(
                  'shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border',
                  selectedComponent() === c.title
                    ? 'bg-foreground text-background border-foreground shadow-sm'
                    : 'bg-white/90 dark:bg-zinc-900/90 text-zinc-600 dark:text-zinc-400 border-zinc-200/80 dark:border-zinc-700/80 hover:text-zinc-900 dark:hover:text-zinc-100 backdrop-blur-sm shadow-sm'
                )"
              >
                <span [class]="cn('w-1.5 h-1.5 rounded-full transition-colors', 'bg-zinc-400 dark:bg-zinc-500')"></span>
                {{ c.title }}
              </button>
            }
          </div>
        </div>
  </div>
  `,
})
export default class BlockPage {
  block = input.required<string>()

  readonly theme = inject(ThemeService)

  readonly selectedComponent = linkedSignal(() => this.getBlockInfo().components[0]?.title ?? null)

  readonly cn = cn

  readonly isLoaded = signal(false)

  constructor() {
    afterNextRender(() => {
      this.isLoaded.set(true)
    })
  }

  readonly getBlockInfo = computed(() => {
    const block = blocks.find(
      (b) => b.title.toLocaleLowerCase() === this.block(),
    )

    if (!block) {
      return {
        title: 'Block Not Found',
        description: 'The requested block does not exist in the registry.',
        route: '',
        image: '',
        components: [],
      }
    }

    return block
  })
}
