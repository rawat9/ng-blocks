import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  inject,
  signal
} from '@angular/core'
import { Button } from '../../components/ui/button'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { lucideCheck, lucideChevronDown } from '@ng-icons/lucide'

interface MenuItem {
  id: string
  label: string
  shortcut: string
}

@Component({
  selector: 'app-dropdown-1',
  imports: [Button, NgIcon],
  providers: [provideIcons({ lucideChevronDown, lucideCheck })],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="w-64" data-slot="dropdown-menu">
      <div class="relative" [attr.data-open]="isOpen() ? '' : null">
        <button
          appButton
          variant="outline"
          class="cn-dropdown-menu-trigger w-full justify-between"
          [attr.aria-expanded]="isOpen()"
          aria-haspopup="menu"
          [attr.aria-controls]="contentId"
          (click)="toggle()"
        >
          {{ selectedLabel() }}
          <ng-icon
            name="lucideChevronDown"
            size="16"
            class="cn-dropdown-menu-trigger-icon"
          />
        </button>

        @if (isOpen()) {
          <div
            [id]="contentId"
            role="menu"
            tabindex="-1"
            class="cn-dropdown-menu-content"
            (keydown.escape)="close()"
          >
            <div class="cn-dropdown-menu-label">Teams</div>

            @for (item of menuItems; track item.id; let i = $index) {
              <button
                type="button"
                role="menuitemradio"
                class="cn-dropdown-menu-item"
                [attr.aria-checked]="selectedId() === item.id"
                [class.cn-dropdown-menu-item-active]="focusIndex() === i"
                (mouseenter)="focusIndex.set(i)"
                (focus)="focusIndex.set(i)"
                (click)="select(item.id)"
              >
                <span>{{ item.label }}</span>
                <span class="cn-dropdown-menu-shortcut">{{
                  item.shortcut
                }}</span>
                @if (selectedId() === item.id) {
                  <ng-icon name="lucideCheck" size="14" class="ml-auto" />
                }
              </button>
            }
          </div>
        }
      </div>
    </div>
  `
})
export class Dropdown1 {
  private readonly host = inject(ElementRef<HTMLElement>)

  readonly contentId = 'dropdown-menu-content'

  readonly menuItems: MenuItem[] = [
    { id: 'personal', label: 'Personal', shortcut: 'P' },
    { id: 'design', label: 'Design Team', shortcut: 'D' },
    { id: 'engineering', label: 'Engineering', shortcut: 'E' },
    { id: 'support', label: 'Support', shortcut: 'S' }
  ]

  readonly isOpen = signal(false)

  readonly selectedId = signal('engineering')

  readonly focusIndex = signal(0)

  readonly selectedLabel = () => {
    const active = this.menuItems.find((item) => item.id === this.selectedId())
    return active?.label ?? 'Select team'
  }

  toggle() {
    if (this.isOpen()) {
      this.close()
      return
    }

    this.isOpen.set(true)
    this.focusIndex.set(this.activeIndex())
  }

  close() {
    this.isOpen.set(false)
  }

  select(id: string) {
    this.selectedId.set(id)
    this.close()
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    if (!this.isOpen()) return

    const target = event.target as Node | null
    if (!target) return

    if (!this.host.nativeElement.contains(target)) {
      this.close()
    }
  }

  private activeIndex() {
    const index = this.menuItems.findIndex(
      (item) => item.id === this.selectedId()
    )
    return index >= 0 ? index : 0
  }
}
