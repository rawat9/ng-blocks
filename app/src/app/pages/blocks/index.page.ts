import { afterNextRender, Component, signal } from '@angular/core'
import { RouterLink } from '@angular/router'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucideArrowRight,
  lucideBox,
  lucideComponent,
  lucideLayers
} from '@ng-icons/lucide'
import { blocks } from '../../../blocks/registry'
import { cn } from '../../../lib/utils'

@Component({
  selector: 'app-blocks-index-page',
  imports: [RouterLink, NgIcon],
  providers: [
    provideIcons({
      lucideArrowRight,
      lucideBox,
      lucideComponent,
      lucideLayers
    })
  ],
  template: `
    <!-- Grid -->
    <div
      class="grid sm:grid-cols-2 xl:grid-cols-3 p-16 gap-5 px-6 sm:px-10 pb-10"
    >
      @for (block of blocks; track block.route; let i = $index) {
        <a
          [routerLink]="block.title.toLowerCase()"
          class="group relative flex flex-col rounded-2xl border border-border/60 bg-card overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/3 dark:hover:shadow-black/20 hover:border-border"
          [class.animate-fade-in-up]="isLoaded()"
          [style.--animation-delay]="100 + i * 120 + 'ms'"
          [style.view-transition-name]="'card-' + block.title.toLowerCase()"
        >
          <!-- Thumbnail -->
          <div class="relative aspect-16/10 overflow-hidden bg-muted/50">
            <img
              [src]="block.image"
              [alt]="block.title"
              width="600"
              height="375"
              class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] dark:hidden"
            />
            <img
              [src]="block.darkImage"
              [alt]="block.title"
              width="600"
              height="375"
              class="hidden w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] dark:block"
            />
            <!-- Gradient overlay on hover -->
            <div
              class="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            ></div>

            <!-- Badge -->
            @if (block.badge) {
              <span
                class="absolute top-3 right-3 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-full bg-foreground text-background shadow-sm"
              >
                {{ block.badge }}
              </span>
            }

            <!-- Floating arrow (appears on hover) -->
            <div
              class="absolute bottom-3 right-3 flex items-center justify-center size-8 rounded-full bg-white/90 dark:bg-zinc-900/90 text-foreground shadow-sm opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
            >
              <ng-icon name="lucideArrowRight" size="14" />
            </div>
          </div>

          <!-- Content -->
          <div class="flex flex-col gap-1.5 p-4">
            <div class="flex items-center justify-between">
              <h3 class="font-medium text-sm text-foreground tracking-tight">
                {{ block.title }}
              </h3>
              <span
                class="inline-flex items-center gap-1 text-[11px] text-muted-foreground font-medium tabular-nums"
              >
                <ng-icon name="lucideBox" size="12" />
                {{ block.components.length }}
              </span>
            </div>
            <p
              class="text-xs text-muted-foreground/80 leading-relaxed line-clamp-2"
            >
              {{ block.description }}
            </p>
          </div>
        </a>
      }
    </div>
  `
})
export default class BlocksIndexPage {
  readonly blocks = blocks
  readonly isLoaded = signal(false)
  readonly cn = cn

  constructor() {
    afterNextRender(() => {
      this.isLoaded.set(true)
    })
  }
}
