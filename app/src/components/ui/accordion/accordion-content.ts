import { Directive } from '@angular/core'
import { AccordionContent as NgAccordionContent } from '@angular/aria/accordion'

@Directive({
  selector: 'app-accordion-content,[appNgAccordionContent]',
  hostDirectives: [NgAccordionContent],
  host: {
    'data-slot': 'accordion-content',
    class:
      'cn-accordion-content-inner [&_a]:hover:text-foreground h-(--accordion-panel-height) data-ending-style:h-0 data-starting-style:h-0 [&_a]:underline [&_a]:underline-offset-3 [&_p:not(:last-child)]:mb-4',
  },
})
export class AccordionContent {}
