import { computed, Directive, input } from '@angular/core'
import { AccordionPanel as NgAccordionPanel } from '@angular/aria/accordion'
import { ClassValue } from 'clsx'
import { cn } from '../../../lib/utils'

@Directive({
  selector: 'app-accordion-panel,[appNgAccordionPanel]',
  hostDirectives: [
    {
      directive: NgAccordionPanel,
      inputs: ['id']
    }
  ],
  host: {
    'data-slot': 'accordion-panel',
    '[class]': '_computedClass()'
  }
})
export class AccordionPanel {
  public readonly height = input('70px')

  public readonly _class = input<ClassValue>('', { alias: 'class' })

  protected readonly _computedClass = computed(() =>
    cn(
      'overflow-hidden text-muted-foreground text-sm transition-[height] duration-200 ease-in-out inert:h-0',
      `h-[${this.height()}]`,
      this._class()
    )
  )
}
