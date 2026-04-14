import { Component } from '@angular/core'
import { AccordionGroup, AccordionTrigger } from '../../components/ui/accordion'
import { AccordionPanel } from '../../components/ui/accordion/accordion-panel'
import { AccordionContent } from '../../components/ui/accordion/accordion-content'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { lucideChevronDown, lucideChevronUp } from '@ng-icons/lucide'
import { AccordionIcon } from '../../components/ui/accordion/accordion-icon'

@Component({
  selector: 'app-accordion-1',
  providers: [provideIcons({ lucideChevronDown, lucideChevronUp })],
  imports: [
    AccordionGroup,
    AccordionTrigger,
    AccordionPanel,
    AccordionContent,
    NgIcon,
    AccordionIcon,
  ],
  host: {
    class: 'flex w-full',
  },
  template: ` <div appNgAccordionGroup>
    <div>
      <button
        appNgAccordionTrigger
        [panel]="panel1"
        #trigger1="ngAccordionTrigger"
      >
        What is Angular?
        <ng-icon appNgAccordionIcon name="lucideChevronDown" />
        <!--      <lucide-icon-->
        <!--        data-slot="accordion-trigger-icon"-->
        <!--        [name]="chevronDown"-->
        <!--        class="cn-accordion-trigger-icon pointer-events-none shrink-0 group-aria-expanded/accordion-trigger:hidden"-->
        <!--      />-->
        <!--      <lucide-icon-->
        <!--        data-slot="accordion-trigger-icon"-->
        <!--        [name]="chevronUp"-->
        <!--        class="cn-accordion-trigger-icon pointer-events-none hidden shrink-0 group-aria-expanded/accordion-trigger:inline"-->
        <!--      />-->
      </button>
      <div
        appNgAccordionPanel
        #panel1="ngAccordionPanel"
        class="overflow-hidden text-gray-500"
      >
        <ng-template appNgAccordionContent>
          Angular is a platform and framework for building single-page client
          applications using HTML and TypeScript. It is developed and maintained
          by Google.
        </ng-template>
      </div>
    </div>
    <div>
      <button
        appNgAccordionTrigger
        [panel]="panel2"
        #trigger2="ngAccordionTrigger"
      >
        What is React?
        <ng-icon appNgAccordionIcon name="lucideChevronDown" />
        <!--      <lucide-icon-->
        <!--        data-slot="accordion-trigger-icon"-->
        <!--        [name]="chevronDown"-->
        <!--        class="cn-accordion-trigger-icon pointer-events-none shrink-0 group-aria-expanded/accordion-trigger:hidden"-->
        <!--      />-->
        <!--      <lucide-icon-->
        <!--        data-slot="accordion-trigger-icon"-->
        <!--        [name]="chevronUp"-->
        <!--        class="cn-accordion-trigger-icon pointer-events-none hidden shrink-0 group-aria-expanded/accordion-trigger:inline"-->
        <!--      />-->
      </button>
      <div
        appNgAccordionPanel
        #panel2="ngAccordionPanel"
        class="overflow-hidden text-gray-500"
      >
        <ng-template appNgAccordionContent>
          React is a platform and framework for building single-page client
          applications using HTML and TypeScript. It is developed and maintained
          by Google.
        </ng-template>
      </div>
    </div>
  </div>`,
})
export class Accordion1 {}
