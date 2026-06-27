import { Directive } from '@angular/core'
import { AccordionContent as NgAccordionContent } from '@angular/aria/accordion'

@Directive({
  selector: 'app-accordion-content,[appNgAccordionContent]',
  hostDirectives: [NgAccordionContent],
  host: {
    'data-slot': 'accordion-content',
    class: 'pt-0 pb-4'
  }
})
export class AccordionContent {}
