import { Directive } from '@angular/core'

@Directive({
  selector: '[appNgAccordionIcon]',
  host: {
    'data-slot': 'accordion-icon',
    class:
      'text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200 group-data-[state=open]:rotate-180',
  },
})
export class AccordionIcon {}
