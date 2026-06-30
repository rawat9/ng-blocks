import { Component, signal } from '@angular/core'
import {
  Toolbar,
  ToolbarWidget,
  ToolbarWidgetGroup
} from '@angular/aria/toolbar'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucideAlignCenter,
  lucideAlignLeft,
  lucideAlignRight,
  lucideBold,
  lucideImage,
  lucideItalic,
  lucideLink,
  lucideList,
  lucideSave,
  lucideUnderline
} from '@ng-icons/lucide'

@Component({
  selector: 'app-toolbar-1',
  standalone: true,
  imports: [Toolbar, ToolbarWidget, ToolbarWidgetGroup, NgIcon],
  providers: [
    provideIcons({
      lucideAlignCenter,
      lucideAlignLeft,
      lucideAlignRight,
      lucideBold,
      lucideImage,
      lucideItalic,
      lucideLink,
      lucideList,
      lucideSave,
      lucideUnderline
    })
  ],
  template: `
    <div class="bg-background w-116 rounded-xl border shadow-sm">
      <div class="border-b px-3 py-2">
        <div
          ngToolbar
          [(values)]="selectedTools"
          aria-label="Editor formatting"
          class="flex items-center gap-1"
        >
          <div ngToolbarWidgetGroup multi class="toolbar-group">
            <button
              ngToolbarWidget
              value="bold"
              #bold="ngToolbarWidget"
              [class.is-selected]="bold.selected()"
              class="toolbar-button"
              aria-label="Bold"
            >
              <ng-icon name="lucideBold" size="15" />
            </button>
            <button
              ngToolbarWidget
              value="italic"
              #italic="ngToolbarWidget"
              [class.is-selected]="italic.selected()"
              class="toolbar-button"
              aria-label="Italic"
            >
              <ng-icon name="lucideItalic" size="15" />
            </button>
            <button
              ngToolbarWidget
              value="underline"
              #underline="ngToolbarWidget"
              [class.is-selected]="underline.selected()"
              class="toolbar-button"
              aria-label="Underline"
            >
              <ng-icon name="lucideUnderline" size="15" />
            </button>
          </div>

          <div class="bg-border mx-1 h-6 w-px"></div>

          <div ngToolbarWidgetGroup class="toolbar-group">
            <button
              ngToolbarWidget
              value="align-left"
              #alignLeft="ngToolbarWidget"
              [class.is-selected]="alignLeft.selected()"
              class="toolbar-button"
              aria-label="Align left"
            >
              <ng-icon name="lucideAlignLeft" size="15" />
            </button>
            <button
              ngToolbarWidget
              value="align-center"
              #alignCenter="ngToolbarWidget"
              [class.is-selected]="alignCenter.selected()"
              class="toolbar-button"
              aria-label="Align center"
            >
              <ng-icon name="lucideAlignCenter" size="15" />
            </button>
            <button
              ngToolbarWidget
              value="align-right"
              #alignRight="ngToolbarWidget"
              [class.is-selected]="alignRight.selected()"
              class="toolbar-button"
              aria-label="Align right"
            >
              <ng-icon name="lucideAlignRight" size="15" />
            </button>
          </div>

          <div class="bg-border mx-1 h-6 w-px"></div>

          <button
            ngToolbarWidget
            value="list"
            #list="ngToolbarWidget"
            [class.is-selected]="list.selected()"
            class="toolbar-button"
            aria-label="Bulleted list"
          >
            <ng-icon name="lucideList" size="15" />
          </button>
          <button
            ngToolbarWidget
            value="link"
            #link="ngToolbarWidget"
            [class.is-selected]="link.selected()"
            class="toolbar-button"
            aria-label="Insert link"
          >
            <ng-icon name="lucideLink" size="15" />
          </button>
          <button
            ngToolbarWidget
            value="image"
            #image="ngToolbarWidget"
            [class.is-selected]="image.selected()"
            class="toolbar-button"
            aria-label="Insert image"
          >
            <ng-icon name="lucideImage" size="15" />
          </button>

          <button
            ngToolbarWidget
            value="save"
            class="toolbar-button ml-auto"
            aria-label="Save"
          >
            <ng-icon name="lucideSave" size="15" />
          </button>
        </div>
      </div>

      <div class="p-4">
        <div
          class="bg-muted/40 min-h-32 rounded-lg border p-4 text-sm leading-6"
        >
          <p class="font-medium">Accessible primitives for Angular</p>
          <p class="text-muted-foreground mt-1">
            Compose focused controls with keyboard navigation handled by Angular
            Aria.
          </p>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .toolbar-group {
        display: inline-flex;
        align-items: center;
        gap: 0.125rem;
      }

      .toolbar-button {
        display: inline-flex;
        height: 2rem;
        width: 2rem;
        align-items: center;
        justify-content: center;
        border-radius: 0.375rem;
        color: var(--muted-foreground);
        outline: none;
        transition:
          background-color 150ms ease,
          color 150ms ease;
      }

      .toolbar-button:hover,
      .toolbar-button[data-active='true'] {
        background: var(--muted);
        color: var(--foreground);
      }

      .toolbar-button.is-selected {
        background: var(--foreground);
        color: var(--background);
      }
    `
  ]
})
export class Toolbar1 {
  protected readonly selectedTools = signal<string[]>(['bold', 'align-left'])
}
