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
  lucideLayers,
  lucideZap
} from '@ng-icons/lucide'
import { simpleGithub } from '@ng-icons/simple-icons'
import { blocks } from '#lib/registry'
import { BlocksLayout } from '../_components'
import { Button } from '#/ui/button'

@Component({
  selector: 'app-blocks-root',
  imports: [RouterLink, NgIcon, BlocksLayout, Button],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    provideIcons({
      lucideArrowRight,
      lucideBox,
      lucideComponent,
      lucideLayers,
      lucideZap,
      simpleGithub
    })
  ],
  template: `
    <app-blocks-layout
      [description]="'Accessible Angular building blocks, ready to copy into real products. Built with Angular Aria and Tailwind CSS.'"
    >
      <div left-column class="space-y-10">
        <div
          class="border-border bg-border grid max-w-lg grid-cols-3 gap-px overflow-hidden rounded-lg border"
          [class.animate-blur-in-up]="isLoaded()"
          [style.--animation-delay]="'350ms'"
        >
          <div class="bg-background flex min-w-0 flex-col gap-2 p-3.5">
            <ng-icon
              name="lucideLayers"
              size="15"
              class="text-cyan-600 dark:text-cyan-400"
            />
            <span class="text-foreground text-sm font-semibold tabular-nums">
              {{ blocks.length }}
            </span>
            <span class="text-muted-foreground text-xs leading-tight"
              >Collections</span
            >
          </div>
          <div class="bg-background flex min-w-0 flex-col gap-2 p-3.5">
            <ng-icon
              name="lucideComponent"
              size="15"
              class="text-cyan-600 dark:text-cyan-400"
            />
            <span class="text-foreground text-sm font-semibold tabular-nums"
              >Copy</span
            >
            <span class="text-muted-foreground text-xs leading-tight"
              >Ready source</span
            >
          </div>
          <div class="bg-background flex min-w-0 flex-col gap-2 p-3.5">
            <ng-icon
              name="lucideZap"
              size="15"
              class="text-cyan-600 dark:text-cyan-400"
            />
            <span class="text-foreground text-sm font-semibold">Modern</span>
            <span class="text-muted-foreground text-xs leading-tight"
              >Angular APIs</span
            >
          </div>
        </div>

        <div
          class="border-border max-w-lg border-l pl-4"
          [class.animate-blur-in-up]="isLoaded()"
          [style.--animation-delay]="'430ms'"
        >
          <p class="text-muted-foreground text-sm leading-relaxed">
            Browse a collection, inspect its API, then bring only the code your
            application needs.
          </p>
        </div>

        <div
          class="flex flex-wrap items-center gap-3"
          [class.animate-blur-in-up]="isLoaded()"
          [style.--animation-delay]="'510ms'"
        >
          <a
            appButton
            [size]="'lg'"
            [routerLink]="blocks[0].title.toLowerCase()"
          >
            Explore the library
            <ng-icon name="lucideArrowRight" size="14" />
          </a>
          <a
            appButton
            [size]="'lg'"
            [variant]="'outline'"
            href="https://github.com/rawat9/ng-blocks"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ng-icon name="simpleGithub" size="14" />
            View source
          </a>
        </div>
      </div>

      <div
        right-column
        class="group/cards mx-auto grid max-w-5xl grid-cols-1 gap-4 p-6 sm:grid-cols-2 sm:p-10 lg:content-center lg:p-12"
      >
        @for (block of blocks; track block.route; let i = $index) {
          <a
            [routerLink]="block.title.toLowerCase()"
            class="group bg-background hover:border-foreground/10 border-border/80 relative flex flex-col overflow-hidden rounded-lg border shadow-sm transition-all duration-300 group-has-[a:hover]/cards:opacity-50 group-has-[a:hover]/cards:blur-[1px] hover:-translate-y-1 hover:!opacity-100 hover:shadow-lg hover:!blur-none dark:hover:shadow-black/20"
            [class.animate-blur-in-up]="isLoaded()"
            [style.--animation-delay]="120 + i * 100 + 'ms'"
          >
            <div
              class="border-border/70 relative aspect-16/10 overflow-hidden border-b p-1"
            >
              <img
                [src]="block.image"
                [alt]="block.title"
                width="600"
                height="375"
                class="h-full w-full rounded-md object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] dark:hidden"
              />
              <img
                [src]="block.darkImage"
                [alt]="block.title"
                width="600"
                height="375"
                class="hidden h-full w-full rounded-md object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] dark:block"
              />
            </div>

            <div class="flex flex-1 flex-col gap-2 p-4">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <h3
                    class="text-foreground text-sm font-semibold tracking-tight"
                  >
                    {{ block.title }}
                  </h3>
                  @if (block.badge) {
                    <span
                      class="rounded bg-cyan-600/10 px-1.5 py-0.5 text-[10px] font-semibold text-cyan-700 dark:text-cyan-300"
                    >
                      {{ block.badge }}
                    </span>
                  }
                </div>
                <span
                  class="text-muted-foreground inline-flex items-center gap-1 text-[11px] font-medium tabular-nums"
                >
                  <ng-icon name="lucideBox" size="12" />
                  {{ block.components.length }}
                </span>
              </div>
              <p
                class="text-muted-foreground line-clamp-2 text-xs leading-relaxed"
              >
                {{ block.description }}
              </p>
              <span
                class="text-foreground mt-auto inline-flex items-center gap-1.5 pt-1 text-xs font-medium"
              >
                View collection
                <ng-icon
                  name="lucideArrowRight"
                  size="13"
                  class="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </span>
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

  constructor() {
    afterNextRender(() => {
      this.isLoaded.set(true)
    })
  }
}
