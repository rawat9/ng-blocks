import { AccordionGroup as NgAccordionGroup } from '@angular/aria/accordion'
import { computed, Directive, input } from '@angular/core'
import { cn, type ClassValue } from 'cnfast'

@Directive({
  selector: 'app-accordion-group,[appNgAccordionGroup]',
  hostDirectives: [
    {
      directive: NgAccordionGroup,
      inputs: ['multiExpandable', 'disabled']
    }
  ],
  host: {
    'data-slot': 'accordion-group',
    '[class]': '_computedClass()'
  }
})
export class AccordionGroup {
  public readonly _class = input<ClassValue>('', { alias: 'class' })

  protected readonly _computedClass = computed(() => cn('', this._class()))
}
