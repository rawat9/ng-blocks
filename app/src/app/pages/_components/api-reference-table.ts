import { Component, input } from '@angular/core'
import { ApiReference } from '../../../blocks/registry'

@Component({
  selector: 'app-api-reference-table',
  template: `
    <div class="border-border/40 relative overflow-hidden rounded-lg border">
      <div class="w-full overflow-x-auto">
        <table class="w-full border-collapse text-left text-sm">
          <thead class="bg-muted/20">
            <tr class="border-border/40 divide-border/40 divide-x border-b">
              <th
                class="text-muted-foreground h-9 w-1/3 px-4 text-xs font-semibold tracking-wider uppercase"
              >
                Prop
              </th>
              <th
                class="text-muted-foreground h-9 w-1/3 px-4 text-xs font-semibold tracking-wider uppercase"
              >
                Type
              </th>
              <th
                class="text-muted-foreground h-9 w-1/3 px-4 text-xs font-semibold tracking-wider uppercase"
              >
                Default
              </th>
            </tr>
          </thead>
          <tbody class="divide-border/40 divide-y bg-white dark:bg-transparent">
            @for (entry of entries(); track $index) {
              <tr
                class="group divide-border/40 hover:bg-background/50 dark:hover:bg-background/20 divide-x transition-colors"
              >
                <td class="px-4 py-3 align-top">
                  <div class="flex flex-col gap-1">
                    <span
                      class="font-mono text-xs font-bold text-zinc-950 dark:text-zinc-100"
                    >
                      {{ entry.name }}
                    </span>
                    @if (entry.description) {
                      <span class="text-muted-foreground text-xs leading-5">
                        {{ entry.description }}
                      </span>
                    }
                  </div>
                </td>
                <td class="px-4 py-3 align-top">
                  <code
                    class="inline-flex items-center rounded-md border border-zinc-200 bg-zinc-100 px-2 py-0.5 font-mono text-[11px] font-medium text-zinc-700 dark:border-zinc-700/50 dark:bg-zinc-800/80 dark:text-zinc-300"
                  >
                    {{ entry.type }}
                  </code>
                </td>
                <td class="px-4 py-3 align-top">
                  @if (entry.default) {
                    <code
                      class="text-muted-foreground rounded border border-zinc-100 bg-zinc-50 px-1.5 py-0.5 font-mono text-[11px] dark:border-zinc-800 dark:bg-zinc-900"
                    >
                      {{ entry.default }}
                    </code>
                  } @else {
                    <span class="text-muted-foreground/40 text-xs">—</span>
                  }
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class ApiReferenceTable {
  readonly entries = input.required<ApiReference[]>()
}
