import { Component, viewChild } from '@angular/core'
import { Menu, MenuContent, MenuItem } from '../ui/menu'
import { OverlayModule } from '@angular/cdk/overlay'
import { Button } from '../ui/button'
import { MenuTrigger } from '@angular/aria/menu'
import {
  Menu as NgMenu,
  MenuContent as NgMenuContent
} from '@angular/aria/menu'

@Component({
  selector: 'simple-menu',
  template: `
    <button
      ngMenuTrigger
      appButton
      variant="secondary"
      #origin
      #trigger="ngMenuTrigger"
      [menu]="formatMenu()"
    >
      Open Menu
    </button>
    <ng-template
      [cdkConnectedOverlayOpen]="trigger.expanded()"
      [cdkConnectedOverlay]="{ origin, usePopover: 'inline' }"
      [cdkConnectedOverlayPositions]="[
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top',
          offsetY: 4
        }
      ]"
      cdkAttachPopoverAsChild
    >
      <div appMenu class="flex max-h-48 flex-col" #formatMenu="ngMenu">
        <ng-template ngMenuContent>
          <div appMenuItem [value]="'Mark as read'">
            <span class="label">Mark as read</span>
          </div>

          <div appMenuItem [value]="'Snooze'">
            <span class="label">Snooze</span>
          </div>
          <div
            role="separator"
            aria-orientation="horizontal"
            class="separator"
          ></div>
          <div appMenuItem [value]="'Archive'">
            <span class="label">Archive</span>
          </div>
          <div appMenuItem [value]="'Report spam'">
            <span class="label">Report spam</span>
          </div>
          <div appMenuItem [value]="'Delete'">
            <span class="label">Delete</span>
          </div>
        </ng-template>
      </div>
    </ng-template>
  `,
  imports: [
    Menu,
    MenuContent,
    NgMenuContent,
    MenuItem,
    MenuTrigger,
    Button,
    OverlayModule
  ]
})
export class SimpleMenu {
  formatMenu = viewChild<NgMenu<string>>('formatMenu')
  categorizeMenu = viewChild<NgMenu<string>>('categorizeMenu')
}
