import { afterNextRender, Component, signal } from '@angular/core'
import { RouterLink } from '@angular/router'
import { provideIcons } from '@ng-icons/core'
import { lucideArrowRight, lucideLayoutGrid } from '@ng-icons/lucide'
import { blocks } from '../../../blocks/registry'

@Component({
  selector: 'app-blocks-index-page',
  imports: [RouterLink],
  providers: [
    provideIcons({
      lucideArrowRight,
      lucideLayoutGrid,
    }),
  ],
  template: `
    <!-- Page header -->
    <!--    <div-->
    <!--      class="mb-8 opacity-0"-->
    <!--      [class.animate-fade-in-up]="isLoaded()"-->
    <!--      [style.&#45;&#45;animation-delay]="'0ms'"-->
    <!--    >-->
    <!--      <p class="mb-1.5 text-xs font-semibold uppercase tracking-widest text-violet-500 dark:text-violet-400">-->
    <!--        Browse-->
    <!--      </p>-->
    <!--      <h1 class="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">-->
    <!--        All Blocks-->
    <!--      </h1>-->
    <!--      <p class="mt-1.5 text-sm text-neutral-500 dark:text-neutral-400">-->
    <!--        {{ blocks.length }} categories of beautifully designed, copy-paste ready Angular components.-->
    <!--      </p>-->
    <!--    </div>-->

    <!--    <div-->
    <!--      class="h-px mb-8 bg-neutral-200 dark:bg-neutral-800 opacity-0"-->
    <!--      [class.animate-fade-in-up]="isLoaded()"-->
    <!--      [style.&#45;&#45;animation-delay]="'50ms'"-->
    <!--    ></div>-->

    <!-- Cards grid -->
    <div class="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
      @for (block of blocks; track block.route; let i = $index) {
        <a
          [routerLink]="block.title.toLowerCase()"
          class="group/thumbnail bg-muted/50 dark:bg-background border-border/60 flex flex-col rounded-xl border p-0.5 shadow-sm shadow-black/5"
        >
          <div
            class="bg-background border-border/60 relative overflow-hidden rounded-xl border"
          >
            <img
              [src]="block.image"
              width="600"
              height="400"
              class="w-full object-cover transition-all duration-300 dark:hidden"
            />
            <img
              [src]="block.image"
              width="600"
              height="400"
              class="hidden w-full object-cover transition-all duration-300 dark:block"
            />
          </div>
          <div class="flex items-center justify-between gap-px px-3 py-1.5">
            <h3 class="text-foreground text-sm font-medium tracking-tight">
              {{ block.title }}
            </h3>
            <span class="text-muted-foreground text-xs font-normal">
              {{ block.components.length }} components
            </span>
          </div>
        </a>
      }
    </div>
  `,
})
export default class BlocksIndexPage {
  readonly blocks = blocks
  readonly isLoaded = signal(false)

  constructor() {
    afterNextRender(() => {
      this.isLoaded.set(true)
    })
  }
}
