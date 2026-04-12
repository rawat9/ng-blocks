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
import { Toolbar } from './_components/toolbar'

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
  imports: [AnimateOnScrollDirective, NgComponentOutlet, Toolbar],
  template: `
    <div class="relative w-full h-full rounded-xl lg:rounded-2xl overflow-hidden bg-background flex flex-col" [class.animate-fade-in-up]="isLoaded()" [style.--animation-delay]="'150ms'">
      <app-toolbar [(tab)]="activeTab"></app-toolbar>
    
      <div appAnimateOnScroll [class]="cn('w-full overflow-auto flex [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]', 'h-full')">
        @if (activeTab() === 'preview') {
        <!-- preview -->
        <div [class]="cn('w-full', 'p-10 flex items-center justify-center')">
          @let component = getBlockInfo().components.find(c => c.title === selectedComponent());
          <div className="w-full h-full flex items-center justify-center">
            <!-- <app-block-viewer [block]="block()" [title]="selectedComponent()" [component]="component!.component" [path]="component!.path"></app-block-viewer> -->
            <!-- {resolvedActiveVariant === -1 ? children : variants[resolvedActiveVariant]?.preview} -->
             <ng-container *ngComponentOutlet="component!.component"></ng-container>
          </div>
        </div>
        } @else {
          <!-- code -->
          <div class="bg-code text-code-foreground flex flex-col flex-1 min-h-0">
            <figure data-rehype-pretty-code-figure=""
              class="mx-0! mt-0 flex min-w-0 flex-1 min-h-0 overflow-hidden flex-col border-none">
              <figcaption
                class="text-code-foreground [&_ng-icon]:text-code-foreground flex h-12 shrink-0 items-center gap-2 border-b border-neutral-200 dark:border-neutral-800 px-4 py-2 [&_ng-icon]:size-4 [&_ng-icon]:opacity-70"
                [attr.data-language]="'angular-ts'">
                ai-shimmer.ts
                <div class="ml-auto flex items-center gap-2">
                  <button>
                    Copy
                  </button>
                </div>
              </figcaption>
              <div class="overflow-auto scrollbar flex-1"></div>
            </figure>
          </div>
        }
      </div>

      <!-- Component pills -->
      @if (activeTab() === 'preview') {
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
      }
   </div>
  `,
})
export default class BlockPage {
  block = input.required<string>()

  readonly theme = inject(ThemeService)

  readonly selectedComponent = linkedSignal(() => this.getBlockInfo().components[0]?.title ?? null)

  readonly cn = cn

  readonly activeTab = signal<'preview' | 'code'>('preview')

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
