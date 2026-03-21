import { AccordionGroup as NgAccordionGroup } from '@angular/aria/accordion'
import { computed, Directive, input } from '@angular/core'
import { ClassValue } from 'clsx'
import { cn } from '../../../lib/utils'

@Directive({
  selector: 'app-accordion-group,[appNgAccordionGroup]',
  hostDirectives: [
    {
      directive: NgAccordionGroup,
      inputs: ['multiExpandable', 'disabled'],
    },
  ],
  host: {
    'data-slot': 'accordion-group',
    '[class]': '_computedClass()',
  },
})
export class AccordionGroup {
  public readonly _class = input<ClassValue>('', { alias: 'class' })

  protected readonly _computedClass = computed(() =>
    cn('cn-accordion flex w-full flex-col', this._class()),
  )
}
