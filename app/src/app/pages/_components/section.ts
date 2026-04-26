import { Component, computed, input } from '@angular/core'
import { cn } from '../../../lib/utils'

@Component({
  selector: 'app-section',
  host: {
    class: 'block'
  },
  template: `
    <div id="{{ sectionId() }}" [attr.data-section-title]="title()">
      <div class="flex items-center gap-4 mb-6">
        @if (step()) {
          <ng-container>
            <div
              class="flex items-center justify-center h-8 w-8 rounded-full bg-foreground text-background text-sm font-semibold shrink-0"
            >
              {{ step() }}
            </div>
          </ng-container>
        }
        <h2
          class="text-2xl font-semibold tracking-tight bg-linear-to-br from-zinc-900 via-zinc-500 to-zinc-900 dark:from-white dark:via-zinc-400 dark:to-white bg-clip-text text-transparent pb-1"
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
