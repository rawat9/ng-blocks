import {
  afterNextRender,
  Component,
  computed,
  inject,
  input,
  signal,
} from '@angular/core'
import { RouteMeta } from '@analogjs/router'
import { blocks } from '../../../blocks/registry'
import { Router } from '@angular/router'
import { BlockViewer } from '../../../components/block-viewer/block-viewer'
import { LowerCasePipe } from '@angular/common'
import { AnimateOnScrollDirective } from '../../../directives'

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
  imports: [BlockViewer, LowerCasePipe, AnimateOnScrollDirective],
  template: `
    <div
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
    </div>

    <div
      class="mb-8 h-px bg-neutral-200 dark:bg-neutral-800 opacity-0"
      [class.animate-fade-in-up]="isLoaded()"
      [style.--animation-delay]="'100ms'"
    ></div>

    <!-- Components -->
    <div appAnimateOnScroll class="opacity-0 translate-y-8 transition-all duration-700 ease-out [&.animate-visible]:opacity-100 [&.animate-visible]:translate-y-0">
      @for (c of getBlockInfo().components; track c.title) {
        <app-block-viewer [block]="block()" [title]="c.title" [component]="c.component" [path]="c.path"></app-block-viewer>
      }
    </div>
  `,
})
export default class BlockPage {
  block = input.required<string>()

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
