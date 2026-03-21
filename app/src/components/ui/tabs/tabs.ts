import { computed, Directive, input } from '@angular/core'
import { Tabs as NgTabs } from '@angular/aria/tabs'
import type { ClassValue } from 'clsx'
import { cn } from '../../../lib/utils'

@Directive({
  selector: '[appNgTabs]',
  hostDirectives: [NgTabs],
  host: {
    'data-slot': 'tabs',
    '[class]': '_computedClass()',
  },
})
export class Tabs {
  public readonly _class = input<ClassValue>('', { alias: 'class' })

  protected readonly _computedClass = computed(() =>
    cn(
      'cn-tabs group/tabs flex has-[[aria-orientation=horizontal]]:flex-col',
      this._class(),
    ),
  )
}
