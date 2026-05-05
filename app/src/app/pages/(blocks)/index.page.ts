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
            class="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-background/70 backdrop-blur-sm px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground hover:border-border"
          >
            <ng-icon name="lucideZap" size="12" class="text-amber-500" />
            Zoneless
          </span>
          <span
            class="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-background/70 backdrop-blur-sm px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground hover:border-border"
          >
            <ng-icon name="lucideSparkles" size="12" class="text-violet-500" />
            Copy & Paste
          </span>
          <span
            class="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-background/70 backdrop-blur-sm px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground hover:border-border"
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
            class="inline-flex items-center gap-2 rounded-lg bg-foreground text-background px-4 py-2.5 text-sm font-medium transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
          >
            Browse Components
            <ng-icon name="lucideArrowRight" size="14" />
          </a>
          <a
            href="https://github.com/rawat9/ng-blocks"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-all duration-200 hover:bg-muted active:scale-[0.98]"
          >
            <ng-icon name="lucideGithub" size="14" />
            GitHub
          </a>
        </div>
      </div>

      <div
        right-column
        class="group/cards grid sm:grid-cols-2 xl:grid-cols-3 p-16 gap-5 px-6 sm:px-10 pb-10"
      >
        @for (block of blocks; track block.route; let i = $index) {
          <a
            [routerLink]="block.title.toLowerCase()"
            class="group relative flex flex-col rounded-2xl border bg-muted/50 not-dark:bg-clip-padding shadow-xs/5 before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-2xl)-1px)] before:shadow-[0_1px_--theme(--color-black/4%)] dark:before:shadow-[0_-1px_--theme(--color-white/6%)] overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-lg dark:hover:shadow-black/20 hover:border-border group-has-[a:hover]/cards:opacity-50 group-has-[a:hover]/cards:blur-xs hover:!opacity-100 hover:!blur-none"
            [class.animate-fade-in-up]="isLoaded()"
            [style.--animation-delay]="100 + i * 120 + 'ms'"
            [style.view-transition-name]="'card-' + block.title.toLowerCase()"
          >
            <!-- Thumbnail -->
            <div class="relative aspect-16/10 overflow-hidden p-1 rounded-2xl">
              <img
                [src]="block.image"
                [alt]="block.title"
                width="600"
                height="375"
                class="w-full h-full rounded-2xl object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] dark:hidden"
              />
              <img
                [src]="block.darkImage"
                [alt]="block.title"
                width="600"
                height="375"
                class="hidden w-full h-full rounded-2xl object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] dark:block"
              />
              <!-- Gradient overlay on hover -->
              <div
                class="absolute inset-0 bg-linear-to-t dark:from-black/40 from-white/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
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
