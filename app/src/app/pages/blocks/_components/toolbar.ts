import { Component, inject, model } from '@angular/core'
import { ThemeService } from '../../../../services/theme.service'

@Component({
  selector: 'app-toolbar',
  imports: [],
  template: `
    <div class="absolute top-4 right-4 z-20">
      <div class="flex items-center gap-0.5 rounded-lg border border-border/70 bg-white/95 dark:bg-[#121212] px-1 py-1">
        <!-- Code -->
        <button class="h-7 w-7 border flex justify-center items-center rounded-md border-transparent transition-all duration-150 hover:border-border/70 hover:bg-muted/70" (click)="showCode()">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
          </svg>
        </button>

        <!-- Theme toggle -->
        <button class="h-7 w-7 border flex justify-center items-center rounded-md border-transparent transition-all duration-150 hover:border-border/70 hover:bg-muted/70" (click)="theme.toggle()">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            color="currentColor"
            class="-rotate-45 size-4"
            strokeWidth="2"
            stroke="currentColor"
          >
            <path d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="2" />
            <path d="M5 20L19 5" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" />
            <path d="M16 9L22 13.8528M12.4128 12.4059L19.3601 18.3634M8 15.6672L15 21.5" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </button>
      </div>
    </div>
  `,
})
export class Toolbar {
  readonly theme = inject(ThemeService)

  readonly tab = model<'preview' | 'code'>('preview')

  showCode() {
    this.tab.update((t) => (t === 'preview' ? 'code' : 'preview'))
  }
}