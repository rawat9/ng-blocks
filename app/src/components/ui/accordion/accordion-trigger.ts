import { computed, Directive, input } from '@angular/core'
import { AccordionTrigger as NgAccordionTrigger } from '@angular/aria/accordion'
import type { ClassValue } from 'clsx'
import { cn } from '../../../lib/utils'

@Directive({
  selector: '[appNgAccordionTrigger]',
  hostDirectives: [
    {
      directive: NgAccordionTrigger,
      inputs: ['panel', 'expanded', 'disabled']
    }
  ],
  host: {
    '[class]': '_computedClass()'
  }
})
export class AccordionTrigger {
  public readonly _class = input<ClassValue>('', { alias: 'class' })

  protected readonly _computedClass = computed(() =>
    cn(
      'peer flex flex-1 cursor-pointer items-start justify-between gap-4 rounded-md py-4 text-left font-medium text-sm outline-none transition-all focus-visible:ring-[3px] focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-64 aria-expanded:*:data-[slot=accordion-icon]:rotate-180',
      this._class()
    )
  )
}
