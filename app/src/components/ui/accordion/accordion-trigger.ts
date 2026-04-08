import { computed, Directive, input } from '@angular/core'
import { AccordionTrigger as NgAccordionTrigger } from '@angular/aria/accordion'
import type { ClassValue } from 'clsx'
import { cn } from '../../../lib/utils'

@Directive({
  selector: '[appNgAccordionTrigger]',
  hostDirectives: [
    {
      directive: NgAccordionTrigger,
      inputs: ['panel', 'expanded', 'disabled'],
    },
  ],
  host: {
    // '[style.--tw-ring-shadow]': '"0 0 #0000"',
    '[class]': '_computedClass()',
  },
})
export class AccordionTrigger {
  public readonly _class = input<ClassValue>('', { alias: 'class' })

  protected readonly _computedClass = computed(() =>
    cn(
      'focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>[hlmAccIcon]]:rotate-180',
      this._class(),
    ),
  )
}
