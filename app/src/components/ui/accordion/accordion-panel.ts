import { computed, Directive, input } from '@angular/core'
import { AccordionPanel as NgAccordionPanel } from '@angular/aria/accordion'
import { ClassValue } from 'clsx'
import { cn } from '../../../lib/utils'

@Directive({
  selector: 'app-accordion-panel,[appNgAccordionPanel]',
  hostDirectives: [
    {
      directive: NgAccordionPanel,
      inputs: ['id'],
    },
  ],
  host: {
    'data-slot': 'accordion-panel',
    '[class]': '_computedClass()',
  },
})
export class AccordionPanel {
  public readonly _class = input<ClassValue>('', { alias: 'class' })

  protected readonly _computedClass = computed(() =>
    cn('cn-accordion-content overflow-hidden', this._class()),
  )
}
