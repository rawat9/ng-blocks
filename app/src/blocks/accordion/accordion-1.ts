import { Component } from '@angular/core'
import {
  AccordionGroup,
  AccordionPanel,
  AccordionContent,
  AccordionTrigger,
  AccordionIcon
} from '../../components/ui/accordion'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { lucideChevronDown, lucideChevronUp } from '@ng-icons/lucide'

@Component({
  selector: 'app-accordion-1',
  providers: [provideIcons({ lucideChevronDown, lucideChevronUp })],
  imports: [
    AccordionGroup,
    AccordionTrigger,
    AccordionPanel,
    AccordionContent,
    NgIcon,
    AccordionIcon
  ],
  template: ` <div appNgAccordionGroup class="w-100 space-y-2">
    <div class="flex flex-col rounded-md border px-4">
      <button
        appNgAccordionTrigger
        [panel]="panel1"
        #trigger1="ngAccordionTrigger"
      >
        What is Angular?
        <ng-icon appNgAccordionIcon name="lucideChevronDown" />
      </button>
      <div appNgAccordionPanel #panel1="ngAccordionPanel">
        <ng-template appNgAccordionContent>
          Angular is a platform and framework for building single-page client
          applications using HTML and TypeScript. It is developed and maintained
          by Google.
        </ng-template>
      </div>
    </div>
    <div class="flex flex-col rounded-md border px-4">
      <button
        appNgAccordionTrigger
        [panel]="panel2"
        #trigger2="ngAccordionTrigger"
      >
        What is React?
        <ng-icon appNgAccordionIcon name="lucideChevronDown" />
      </button>
      <div
        appNgAccordionPanel
        #panel2="ngAccordionPanel"
        class="overflow-hidden"
      >
        <ng-template appNgAccordionContent>
          React is a platform and framework for building single-page client
          applications using HTML and TypeScript. It is developed and maintained
          by Meta (formerly Facebook).
        </ng-template>
      </div>
    </div>
  </div>`
})
export class Accordion1 {}
