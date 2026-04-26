import {
  ChangeDetectionStrategy,
  Component,
  input,
  signal
} from '@angular/core'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { lucideCheck, lucideCopy } from '@ng-icons/lucide'
import { cn } from '../../../lib/utils'
import { Button } from '../../../components/ui/button'

@Component({
  selector: 'app-copy-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIcon, Button],
  viewProviders: [
    provideIcons({
      lucideCopy,
      lucideCheck
    })
  ],
  template: ` <button
    appButton
    variant="ghost"
    class="absolute top-3 right-3 p-2 rounded-md transition-all duration-200 z-10"
    (click)="handleCopy()"
  >
    @if (copied()) {
      <ng-icon name="lucideCheck" size="14"></ng-icon>
    } @else {
      <ng-icon name="lucideCopy" size="14"></ng-icon>
    }
  </button>`
})
export class CopyButton {
  protected readonly copied = signal(false)

  public readonly code = input.required<string>()

  readonly cn = cn

  async handleCopy() {
    await navigator.clipboard.writeText(this.code())
    this.copied.set(true)
    setTimeout(() => this.copied.set(false), 2000)
  }
}
