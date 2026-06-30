import { computed, Directive, input } from '@angular/core'
import { cn, type ClassValue } from 'cnfast'
import { MenuContent as NgMenuContent } from '@angular/aria/menu'

@Directive({
  selector: 'div[appMenuContent]',
  hostDirectives: [NgMenuContent],
  host: {
    'data-slot': 'menu-content',
    '[class]': 'menuContentClass()'
  }
})
export class MenuContent {
  public readonly _class = input<ClassValue>('', { alias: 'class' })

  protected readonly menuContentClass = computed(() =>
    cn(this._class(), 'w-full overflow-y-auto p-1')
  )
}
