import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  signal
} from '@angular/core'
import { RouterLink } from '@angular/router'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucideArrowRight,
  lucideBox,
  lucideComponent,
  lucideGithub,
  lucideLayers,
  lucideSparkles,
  lucideZap
} from '@ng-icons/lucide'
import { blocks } from '../../../blocks/registry'
import { cn } from '#lib/utils'
import { BlocksLayout } from '../_components'

@Component({
  selector: 'app-blocks-root',
  imports: [RouterLink, NgIcon, BlocksLayout],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    provideIcons({
      lucideArrowRight,
      lucideBox,
      lucideComponent,
      lucideGithub,
      lucideLayers,
      lucideSparkles,
      lucideZap
    })
  ],
  template: `
    <app-blocks-layout
      [description]="'A collection of beautifully designed, accessible, and copy-paste ready components. Built on Angular Aria with Tailwind CSS.'"
    >
      <!-- Left column: Stats + Quick Links -->
      <div left-column class="space-y-12">
        <!-- Feature pills -->
        <div
          class="flex flex-wrap gap-2"
          [class.animate-fade-in-up]="isLoaded()"
          [style.--animation-delay]="'350ms'"
        >
          <span
            class="border-border/60 bg-background/70 text-muted-foreground hover:text-foreground hover:border-border inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium backdrop-blur-sm transition-colors"
          >
            <ng-icon name="lucideZap" size="12" class="text-amber-500" />
            Zoneless
          </span>
          <span
            class="border-border/60 bg-background/70 text-muted-foreground hover:text-foreground hover:border-border inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium backdrop-blur-sm transition-colors"
          >
            <ng-icon name="lucideSparkles" size="12" class="text-violet-500" />
            Copy & Paste
          </span>
          <span
            class="border-border/60 bg-background/70 text-muted-foreground hover:text-foreground hover:border-border inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium backdrop-blur-sm transition-colors"
          >
            <ng-icon
              name="lucideComponent"
              size="12"
              class="text-emerald-500"
            />
            Accessible
          </span>
        </div>

        <!-- CTA -->
        <div
          class="flex items-center gap-3"
          [class.animate-fade-in-up]="isLoaded()"
          [style.--animation-delay]="'500ms'"
        >
          <a
            [routerLink]="blocks[0].title.toLowerCase()"
            class="bg-foreground text-background inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
          >
            Browse Components
            <ng-icon name="lucideArrowRight" size="14" />
          </a>
          <a
            href="https://github.com/rawat9/ng-blocks"
            target="_blank"
            rel="noopener noreferrer"
            class="border-border bg-background text-foreground hover:bg-muted inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-all duration-200 active:scale-[0.98]"
          >
            <ng-icon name="lucideGithub" size="14" />
            GitHub
          </a>
        </div>
      </div>

      <div
        right-column
        class="group/cards grid gap-5 p-16 px-6 pb-10 sm:grid-cols-2 sm:px-10 xl:grid-cols-3"
      >
        @for (block of blocks; track block.route; let i = $index) {
          <a
            [routerLink]="block.title.toLowerCase()"
            class="group bg-muted/50 hover:border-border relative flex flex-col overflow-hidden rounded-2xl border shadow-xs/5 transition-all duration-500 not-dark:bg-clip-padding group-has-[a:hover]/cards:opacity-50 group-has-[a:hover]/cards:blur-xs before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-2xl)-1px)] before:shadow-[0_1px_--theme(--color-black/4%)] hover:-translate-y-1 hover:!opacity-100 hover:shadow-lg hover:!blur-none dark:before:shadow-[0_-1px_--theme(--color-white/6%)] dark:hover:shadow-black/20"
            [class.animate-fade-in-up]="isLoaded()"
            [style.--animation-delay]="100 + i * 120 + 'ms'"
            [style.view-transition-name]="'card-' + block.title.toLowerCase()"
          >
            <!-- Thumbnail -->
            <div class="relative aspect-16/10 overflow-hidden rounded-2xl p-1">
              <img
                [src]="block.image"
                [alt]="block.title"
                width="600"
                height="375"
                class="h-full w-full rounded-2xl object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] dark:hidden"
              />
              <img
                [src]="block.darkImage"
                [alt]="block.title"
                width="600"
                height="375"
                class="hidden h-full w-full rounded-2xl object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] dark:block"
              />
              <!-- Gradient overlay on hover -->
              <div
                class="absolute inset-0 bg-linear-to-t from-white/90 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 dark:from-black/40"
              ></div>

              <!-- Badge -->
              @if (block.badge) {
                <span
                  class="bg-foreground text-background absolute top-3 right-3 rounded-full px-2.5 py-0.5 text-[10px] font-semibold tracking-wider uppercase shadow-sm"
                >
                  {{ block.badge }}
                </span>
              }

              <!-- Floating arrow (appears on hover) -->
              <div
                class="text-foreground absolute right-3 bottom-3 flex size-8 translate-y-2 items-center justify-center rounded-full bg-white/90 opacity-0 shadow-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 dark:bg-zinc-900/90"
              >
                <ng-icon name="lucideArrowRight" size="14" />
              </div>
            </div>

            <!-- Content -->
            <div class="flex flex-col gap-1.5 p-4">
              <div class="flex items-center justify-between">
                <h3 class="text-foreground text-sm font-medium tracking-tight">
                  {{ block.title }}
                </h3>
                <span
                  class="text-muted-foreground inline-flex items-center gap-1 text-[11px] font-medium tabular-nums"
                >
                  <ng-icon name="lucideBox" size="12" />
                  {{ block.components.length }}
                </span>
              </div>
              <p
                class="text-muted-foreground/80 line-clamp-2 text-xs leading-relaxed"
              >
                {{ block.description }}
              </p>
            </div>
          </a>
        }
      </div>
    </app-blocks-layout>
  `
})
export default class Blocks {
  readonly blocks = blocks
  readonly isLoaded = signal(false)
  readonly cn = cn

  constructor() {
    afterNextRender(() => {
      this.isLoaded.set(true)
    })
  }
}
