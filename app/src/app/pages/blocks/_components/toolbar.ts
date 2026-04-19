import { Component, inject, model, output, signal } from '@angular/core'
import { ToolbarService } from '../../../../services/toolbar.service'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucideCheck,
  lucideCode,
  lucideCopy,
  lucideEye,
  lucideMaximize,
  lucideMinimize
} from '@ng-icons/lucide'

@Component({
  selector: 'app-toolbar',
  imports: [NgIcon],
  providers: [
    provideIcons({
      lucideCopy,
      lucideCode,
      lucideEye,
      lucideCheck,
      lucideMaximize,
      lucideMinimize
    })
  ],
  template: `
    <div class="absolute top-4 right-4 z-20">
      <div
        class="flex items-center gap-0.5 rounded-lg border border-border/70 bg-sidebar px-1 py-1"
      >
        <!-- Copy -->
        @if (tab() === 'code') {
          <button
            class="h-7 w-7 border flex justify-center items-center rounded-md border-transparent transition-all duration-150 hover:border-border/70 hover:bg-muted/70"
            (click)="onCopyCode()"
          >
            @if (copied()) {
              <ng-icon name="lucideCheck" size="14"></ng-icon>
            } @else {
              <ng-icon name="lucideCopy" size="14"></ng-icon>
            }
          </button>
        }

        <!-- Preview / code -->
        <button
          class="h-7 w-7 border flex justify-center items-center rounded-md border-transparent transition-all duration-150 hover:border-border/70 hover:bg-muted/70"
          (click)="toggle()"
        >
          @if (tab() === 'preview') {
            <ng-icon name="lucideCode" size="14"></ng-icon>
          } @else {
            <ng-icon name="lucideEye" size="14"></ng-icon>
          }
        </button>

        <button
          class="h-7 w-7 border flex justify-center items-center rounded-md border-transparent transition-all duration-150 hover:border-border/70 hover:bg-muted/70"
          (click)="toolbarService.toggleFullscreen()"
        >
          @if (toolbarService.fullscreen()) {
            <ng-icon name="lucideMinimize" size="14"></ng-icon>
          } @else {
            <ng-icon name="lucideMaximize" size="14"></ng-icon>
          }
        </button>

        <!-- Theme toggle -->
        <button
          class="h-7 w-7 border flex justify-center items-center rounded-md border-transparent transition-all duration-150 hover:border-border/70 hover:bg-muted/70"
          (click)="toolbarService.toggleTheme()"
        >
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
            <path
              d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M5 20L19 5"
              stroke="currentColor"
              strokeLinejoin="round"
              strokeWidth="2"
            />
            <path
              d="M16 9L22 13.8528M12.4128 12.4059L19.3601 18.3634M8 15.6672L15 21.5"
              stroke="currentColor"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
        </button>
      </div>
    </div>
  `
})
export class Toolbar {
  protected readonly toolbarService = inject(ToolbarService)

  readonly tab = model<'preview' | 'code'>('preview')

  readonly copyCode = output()

  toggle() {
    this.tab.update((t) => (t === 'preview' ? 'code' : 'preview'))
  }

  readonly copied = signal(false)

  onCopyCode() {
    this.copyCode.emit()
    this.copied.set(true)
    setTimeout(() => this.copied.set(false), 2000)
  }
}
