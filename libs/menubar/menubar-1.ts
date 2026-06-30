import { Component, signal } from '@angular/core'
import { Menu, MenuBar, MenuItem } from '@angular/aria/menu'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucideChevronRight,
  lucideDownload,
  lucideFilePlus,
  lucidePanelLeft,
  lucideSearch,
  lucideShare2,
  lucideSparkles,
  lucideUndo2
} from '@ng-icons/lucide'

@Component({
  selector: 'app-menubar-1',
  standalone: true,
  imports: [Menu, MenuBar, MenuItem, NgIcon],
  providers: [
    provideIcons({
      lucideChevronRight,
      lucideDownload,
      lucideFilePlus,
      lucidePanelLeft,
      lucideSearch,
      lucideShare2,
      lucideSparkles,
      lucideUndo2
    })
  ],
  template: `
    <div
      class="bg-background text-foreground w-116 rounded-xl border shadow-sm"
    >
      <div
        ngMenuBar
        [(values)]="selectedItems"
        class="flex items-center gap-1 border-b px-2 py-1.5"
      >
        <button
          ngMenuItem
          value="file"
          [submenu]="fileMenu"
          class="data-active:bg-muted aria-expanded:bg-muted inline-flex h-8 items-center rounded-md px-3 text-sm font-medium transition-colors outline-none"
        >
          File
        </button>
        <button
          ngMenuItem
          value="edit"
          [submenu]="editMenu"
          class="data-active:bg-muted aria-expanded:bg-muted inline-flex h-8 items-center rounded-md px-3 text-sm font-medium transition-colors outline-none"
        >
          Edit
        </button>
        <button
          ngMenuItem
          value="view"
          [submenu]="viewMenu"
          class="data-active:bg-muted aria-expanded:bg-muted inline-flex h-8 items-center rounded-md px-3 text-sm font-medium transition-colors outline-none"
        >
          View
        </button>
        <button
          ngMenuItem
          value="command"
          class="text-muted-foreground data-active:bg-muted ml-auto inline-flex h-8 items-center gap-2 rounded-md px-3 text-sm font-medium transition-colors outline-none"
        >
          <ng-icon name="lucideSearch" size="14" />
          Command
        </button>
      </div>

      <div class="grid gap-1 p-4 text-sm">
        <div class="flex items-center gap-3 rounded-lg border p-3">
          <span
            class="bg-muted flex size-9 items-center justify-center rounded-md"
          >
            <ng-icon name="lucideSparkles" size="16" />
          </span>
          <div>
            <p class="font-medium">Design document</p>
            <p class="text-muted-foreground text-xs">Updated 4 minutes ago</p>
          </div>
        </div>
      </div>

      <div
        ngMenu
        #fileMenu="ngMenu"
        class="bg-popover text-popover-foreground absolute z-50 mt-1 min-w-48 rounded-lg border p-1 shadow-md outline-none data-[visible=false]:hidden"
      >
        <button ngMenuItem value="new" class="menu-item">
          <ng-icon name="lucideFilePlus" size="14" />
          New file
          <span class="text-muted-foreground ml-auto text-xs">N</span>
        </button>
        <button ngMenuItem value="export" class="menu-item">
          <ng-icon name="lucideDownload" size="14" />
          Export
        </button>
        <button ngMenuItem value="share" class="menu-item">
          <ng-icon name="lucideShare2" size="14" />
          Share
        </button>
      </div>

      <div
        ngMenu
        #editMenu="ngMenu"
        class="bg-popover text-popover-foreground absolute z-50 mt-1 min-w-48 rounded-lg border p-1 shadow-md outline-none data-[visible=false]:hidden"
      >
        <button ngMenuItem value="undo" class="menu-item">
          <ng-icon name="lucideUndo2" size="14" />
          Undo
          <span class="text-muted-foreground ml-auto text-xs">⌘Z</span>
        </button>
        <button ngMenuItem value="palette" class="menu-item">
          <ng-icon name="lucideSparkles" size="14" />
          Improve selection
        </button>
      </div>

      <div
        ngMenu
        #viewMenu="ngMenu"
        class="bg-popover text-popover-foreground absolute z-50 mt-1 min-w-52 rounded-lg border p-1 shadow-md outline-none data-[visible=false]:hidden"
      >
        <button ngMenuItem value="sidebar" class="menu-item">
          <ng-icon name="lucidePanelLeft" size="14" />
          Toggle sidebar
        </button>
        <button
          ngMenuItem
          value="density"
          [submenu]="densityMenu"
          class="menu-item"
        >
          Density
          <ng-icon name="lucideChevronRight" size="14" class="ml-auto" />
        </button>
      </div>

      <div
        ngMenu
        #densityMenu="ngMenu"
        class="bg-popover text-popover-foreground absolute z-50 ml-52 min-w-36 rounded-lg border p-1 shadow-md outline-none data-[visible=false]:hidden"
      >
        <button ngMenuItem value="compact" class="menu-item">Compact</button>
        <button ngMenuItem value="comfortable" class="menu-item">
          Comfortable
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      .menu-item {
        display: flex;
        min-height: 2rem;
        width: 100%;
        align-items: center;
        gap: 0.5rem;
        border-radius: 0.375rem;
        padding: 0.375rem 0.5rem;
        font-size: 0.875rem;
        outline: none;
        transition:
          background-color 150ms ease,
          color 150ms ease;
      }

      .menu-item[data-active='true'] {
        background: var(--muted);
      }

      .menu-item[aria-disabled='true'] {
        pointer-events: none;
        opacity: 0.5;
      }
    `
  ]
})
export class Menubar1 {
  protected readonly selectedItems = signal<string[]>([])
}
