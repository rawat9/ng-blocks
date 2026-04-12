import { Component, model } from '@angular/core'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { lucideTerminal } from '@ng-icons/lucide'
import { cn } from '../../../lib/utils'

@Component({
  selector: 'app-install-command',
  viewProviders: [
    provideIcons({
      lucideTerminal,
    }),
  ],
  template: `
    <div class="w-full max-w-full">
      <div class="relative rounded-xl border border-border overflow-hidden bg-zinc-100 dark:bg-zinc-900/50 font-mono text-sm leading-relaxed text-foreground">
        <div class="flex items-center border-b border-border/40 bg-neutral-50/50 dark:bg-zinc-900/20 overflow-x-auto no-scrollbar">
          @for (packageManager of packageManagers; track packageManager) {
            <button (click)="selected.set(packageManager)" 
            [class]="cn(
              'flex items-center gap-2 border-r border-border/40 px-4 py-2.5 text-xs font-medium transition-all min-w-fit outline-none hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50',
                selected() === packageManager ? 
                  'bg-transparent text-zinc-950 dark:text-zinc-50 font-semibold' : 'bg-zinc-100/30 dark:bg-zinc-800/10 text-muted-foreground/80 hover:text-foreground'
              )">
              <ng-icon [name]="'lucideTerminal'" [class]="cn('h-3.5 w-3.5', selected() === packageManager ? 'text-zinc-950 dark:text-zinc-50' : 'text-muted-foreground/70')"></ng-icon>
              <span>{{ packageManager }}</span>
            </button>
          }
          <div class="flex-1"></div>
        </div>

        <div class="relative flex items-center p-4">
          <div class="flex-1 overflow-x-auto whitespace-nowrap no-scrollbar pr-12">
            <span class="mr-2 text-muted-foreground/40 select-none">$</span>
            <span class="text-zinc-950 dark:text-zinc-100">{{ commands[selected()] }}</span>
            <span class="text-muted-foreground"> accordion</span>
          </div>

          <div class="absolute right-0 top-0 bottom-0 pl-16 pr-4 flex items-center bg-linear-to-l from-zinc-100 via-zinc-100/90 to-transparent dark:from-zinc-900 dark:via-zinc-900/90 dark:to-transparent">
          </div>
        </div>
      </div>
    </div>`,
  imports: [NgIcon],
})
export class InstallCommand {
  readonly commands: Record<(typeof this.packageManagers)[number], string> = {
    pnpm: 'pnpm dlx shadcn@latest add',
    npm: 'npx shadcn@latest add',
    yarn: 'yarn dlx shadcn@latest add',
    bun: 'bunx --bun shadcn@latest add',
  }

  readonly selected = model<(typeof this.packageManagers)[number]>('pnpm')

  protected readonly packageManagers = ['npm', 'pnpm', 'bun', 'yarn'] as const

  protected readonly cn = cn
}
