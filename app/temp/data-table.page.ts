import { afterNextRender, Component, signal } from '@angular/core'
import { RouterLink } from '@angular/router'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { lucideArrowLeft, lucideDatabase, lucideTable } from '@ng-icons/lucide'
import { AnimateOnScrollDirective } from '../src/directives'
import { BlocksNav } from '../src/components/ui/blocks-nav'

@Component({
  selector: 'app-data-table-page',
  imports: [RouterLink, NgIcon, AnimateOnScrollDirective, BlocksNav],
  providers: [
    provideIcons({
      lucideArrowLeft,
      lucideTable,
      lucideDatabase,
    }),
  ],
  template: `
    <!-- Floating background shapes -->
    <div class="pointer-events-none fixed inset-0 overflow-hidden -z-10">
      <div
        class="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-linear-to-br from-violet-500/10 to-fuchsia-500/10 blur-3xl animate-blob"
      ></div>
      <div
        class="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-linear-to-br from-cyan-500/10 to-blue-500/10 blur-3xl animate-blob animation-delay-2000"
      ></div>
    </div>

    <div class="relative py-12 md:py-16 px-4">
      <!-- Back navigation -->
      <div
        class="opacity-0"
        [class.animate-fade-in-up]="isLoaded()"
        [style.--animation-delay]="'0ms'"
      >
        <a
          routerLink="/"
          class="group inline-flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors mb-8"
        >
          <ng-icon
            name="lucideArrowLeft"
            size="16"
            class="transition-transform duration-300 group-hover:-translate-x-1"
          />
          <span>Back to home</span>
        </a>
      </div>

      <!-- Page Header -->
      <section class="text-center mx-auto max-w-3xl mb-16">
        <!-- Badge -->
        <div
          class="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/50 text-sm text-neutral-600 dark:text-neutral-400 opacity-0"
          [class.animate-fade-in-up]="isLoaded()"
          [style.--animation-delay]="'50ms'"
          style="view-transition-name: card-data-table"
        >
          <ng-icon name="lucideTable" class="text-violet-500" size="16" />
          <span>Data Table Components</span>
        </div>

        <!-- Title -->
        <h1
          class="font-bold text-3xl md:text-4xl lg:text-5xl tracking-tight text-neutral-900 dark:text-neutral-50 opacity-0"
          [class.animate-fade-in-up]="isLoaded()"
          [style.--animation-delay]="'100ms'"
        >
          <span>ng-blocks</span>
          <span class="text-neutral-400 dark:text-neutral-500"> / </span>
          <span
            class="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent"
          >
            data-table
          </span>
        </h1>

        <!-- Description -->
        <p
          class="mt-4 text-neutral-500 dark:text-neutral-400 max-w-xl mx-auto opacity-0"
          [class.animate-fade-in-up]="isLoaded()"
          [style.--animation-delay]="'150ms'"
        >
          Powerful data tables with sorting, filtering, and pagination
          capabilities.
        </p>
      </section>

      <!-- Components Grid -->
      <section class="flex flex-col gap-12 w-full">
        <!-- Component Card: Data Table (Coming Soon) -->
        <div
          appAnimateOnScroll
          class="opacity-0 translate-y-8 transition-all duration-700 ease-out [&.animate-visible]:opacity-100 [&.animate-visible]:translate-y-0"
        >
          <div class="mb-4 flex items-center justify-between">
            <div class="flex items-center gap-2">
              <div class="p-1.5 rounded-lg bg-violet-100 dark:bg-violet-900/30">
                <ng-icon
                  name="lucideDatabase"
                  class="text-violet-600 dark:text-violet-400"
                  size="16"
                />
              </div>
              <h2 class="font-semibold text-neutral-900 dark:text-neutral-100">
                Basic Data Table
              </h2>
            </div>
            <span
              class="px-2 py-0.5 text-xs font-medium rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300"
            >
              Coming Soon
            </span>
          </div>

          <div
            class="group w-full min-h-[280px] flex items-center justify-center p-8 md:p-12 rounded-2xl border border-neutral-200 dark:border-neutral-700/50 bg-neutral-50/50 dark:bg-neutral-800/30 transition-all duration-300 hover:border-neutral-300 dark:hover:border-neutral-600 hover:shadow-lg hover:shadow-neutral-900/5 dark:hover:shadow-neutral-900/30"
          >
            <div class="text-center">
              <ng-icon
                name="lucideTable"
                class="text-neutral-400 dark:text-neutral-500 mx-auto mb-3"
                size="48"
              />
              <p class="text-neutral-500 dark:text-neutral-400">
                Data table components coming soon...
              </p>
            </div>
          </div>

          <p class="mt-3 text-sm text-neutral-500 dark:text-neutral-400">
            Feature-rich data tables with sorting, filtering, pagination, and
            row selection.
          </p>
        </div>
      </section>

      <!-- Block Navigation -->
      <section
        class="mt-16 opacity-0"
        [class.animate-fade-in-up]="isLoaded()"
        [style.--animation-delay]="'300ms'"
      >
        <app-blocks-nav [currentPath]="'/data-table'" />
      </section>
    </div>
  `,
})
export default class DataTablePageComponent {
  isLoaded = signal(false)

  constructor() {
    afterNextRender(() => {
      this.isLoaded.set(true)
    })
  }
}
