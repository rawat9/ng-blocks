import { Component, computed, input } from '@angular/core'
import { cn } from '#lib/utils'

@Component({
  selector: 'app-section',
  host: {
    class: 'block'
  },
  template: `
    <div id="{{ sectionId() }}" [attr.data-section-title]="title()">
      <div class="mb-6 flex items-center gap-4">
        @if (step()) {
          <ng-container>
            <div
              class="bg-foreground text-background flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold"
            >
              {{ step() }}
            </div>
          </ng-container>
        }
        <h2
          class="bg-linear-to-br from-zinc-900 via-zinc-500 to-zinc-900 bg-clip-text pb-1 text-2xl font-semibold tracking-tight text-transparent dark:from-white dark:via-zinc-400 dark:to-white"
        >
          {{ title() }}
        </h2>
      </div>

      <div [class]="cn('space-y-6', step() !== undefined && 'pl-12')">
        <ng-content></ng-content>
      </div>
    </div>
  `
})
export class Section {
  readonly userClass = input<string>('', { alias: 'class' })

  readonly id = input<string>()

  readonly sectionId = computed(
    () => this.id() || this.title().toLowerCase().replace(/\s+/g, '-')
  )

  readonly step = input<number>()

  readonly cn = cn

  readonly title = input.required<string>()
}
