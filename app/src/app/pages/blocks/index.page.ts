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
    <div class="grid sm:grid-cols-2 xl:grid-cols-3 gap-8 p-16">
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
