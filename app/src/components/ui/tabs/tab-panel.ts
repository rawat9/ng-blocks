import { computed, Directive, input } from '@angular/core'
import { TabPanel as NgTabPanel } from '@angular/aria/tabs'
import type { ClassValue } from 'clsx'
import { cn } from '../../../lib/utils'

@Directive({
  selector: '[appNgTabPanel]',
  hostDirectives: [
    {
      directive: NgTabPanel,
      inputs: ['id', 'value'],
    },
  ],
  host: {
    'data-slot': 'tab-panel',
    '[class]': '_computedClass()',
  },
})
export class TabPanel {
  public readonly _class = input<ClassValue>('', { alias: 'class' })

  protected readonly _computedClass = computed(() =>
    cn('cn-tabs-content flex-1 outline-none', this._class()),
  )
}
