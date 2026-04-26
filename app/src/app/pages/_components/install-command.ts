import { Component, input, model } from '@angular/core'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { cn } from '../../../lib/utils'
import { simplePnpm, simpleNpm, simpleBun } from '@ng-icons/simple-icons'

interface PackageManager {
  name: string
  icon: string
}

@Component({
  selector: 'app-install-command',
  viewProviders: [
    provideIcons({
      simpleNpm,
      simplePnpm,
      simpleBun
    })
  ],
  template: ` <div class="w-full max-w-full">
    <div
      class="relative rounded-xl border border-border overflow-hidden font-mono text-sm leading-relaxed text-foreground"
    >
      <div
        class="flex items-center border-b border-border/40 overflow-x-auto no-scrollbar"
      >
        @for (packageManager of packageManagers; track packageManager.name) {
          <button
            (click)="selected.set(packageManager.name)"
            [class]="
              cn(
                'flex items-center gap-2 border-r border-border/40 px-4 py-2.5 text-xs font-medium transition-all min-w-fit outline-none',
                selected() === packageManager.name
                  ? 'font-semibold bg-background'
                  : 'text-muted-foreground/70'
              )
            "
          >
            <ng-icon
              [name]="packageManager.icon"
              [size]="'16'"
              [class]="
                cn(
                  selected() === packageManager.name
                    ? 'text-zinc-950 dark:text-zinc-50'
                    : 'text-muted-foreground/70'
                )
              "
            ></ng-icon>
            <span>{{ packageManager.name }}</span>
          </button>
        }
        <div class="flex-1"></div>
      </div>

      <div class="relative flex items-center p-4 bg-background">
        <div
          class="flex-1 overflow-x-auto whitespace-nowrap no-scrollbar pr-12"
        >
          <span class="mr-2 text-muted-foreground/40 select-none">$</span>
          <span>{{ commands[selected()] }}</span>
          <span class="text-muted-foreground"> {{ block() }}</span>
        </div>
      </div>
    </div>
  </div>`,
  imports: [NgIcon]
})
export class InstallCommand {
  readonly block = input.required<string>()

  readonly commands: Record<PackageManager['name'], string> = {
    pnpm: 'pnpm dlx shadcn@latest add',
    npm: 'npx shadcn@latest add',
    bun: 'bunx --bun shadcn@latest add'
  }

  readonly selected = model<PackageManager['name']>('npm')

  protected readonly packageManagers = [
    { name: 'npm', icon: 'simpleNpm' },
    { name: 'pnpm', icon: 'simplePnpm' },
    { name: 'bun', icon: 'simpleBun' }
  ]

  protected readonly cn = cn
}
