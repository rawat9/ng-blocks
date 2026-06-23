import { Type } from '@angular/core'
import { AiShimmer } from './ai/ai-shimmer'
import { AiChat } from './ai/ai-chat'
import { Accordion1 } from './accordion/accordion-1'
import { Form1 } from './forms/form-1'
import { Form2 } from './forms/form-2'
import { Tabs1 } from './tabs/tabs-1'
import { BasicDataTable } from './data-table/basic'

export interface ApiReference {
  name: string
  type: string
  required: boolean
  default?: string
  description: string
}

export interface Block {
  title: string
  description: string
  route: string
  image: string
  darkImage: string
  components: {
    title: string
    path: string
    import: string
    usage: string
    component: Type<unknown>
    apiReference?: ApiReference[]
  }[]
  badge?: string
}

export const blocks: Block[] = [
  {
    title: 'AI',
    description: 'Chat interfaces, prompts, and AI-powered components',
    route: '/ai',
    image: '/thumbnails/ai.svg',
    darkImage: '/thumbnails/ai-dark.svg',
    components: [
      {
        title: 'AI Shimmer',
        path: 'ai-shimmer.ts',
        component: AiShimmer,
        import: `import { AiShimmer } from 'ng-blocks/ai/ai-shimmer'`,
        usage: `
      <AiShimmer text="Loading..." duration="5"></AiShimmer>
    `,
        apiReference: [
          {
            name: 'text',
            type: 'string',
            required: false,
            default: "'Thinking'",
            description: 'Text to display with the shimmer effect'
          },
          {
            name: 'duration',
            type: 'number',
            required: false,
            default: '4',
            description: 'Duration of the shimmer animation in seconds'
          }
        ]
      },
      {
        title: 'AI Chat',
        path: 'ai-chat.ts',
        component: AiChat,
        import: `import { AiChat } from 'ng-blocks/ai/ai-chat'`,
        usage: `
      <AiChat text="Hello! How can I assist you today?"></AiChat>
    `,
        apiReference: []
      }
    ],
    badge: 'NEW'
  },
  {
    title: 'Accordion',
    description: 'Expandable content sections with smooth animations',
    route: '/accordion',
    image: '/thumbnails/accordion.svg',
    darkImage: '/thumbnails/accordion-dark.svg',
    components: [
      {
        title: 'Accordion',
        path: 'accordion-1.ts',
        import: `import { Accordion1 } from 'ng-blocks/accordion/accordion-1'`,
        usage: `
      <Accordion1></Accordion1>
    `,
        component: Accordion1,
        apiReference: [
          {
            name: 'multiExpandable',
            type: 'boolean',
            required: false,
            default: 'false',
            description:
              'Whether multiple panels can be expanded simultaneously'
          },
          {
            name: 'disabled',
            type: 'boolean',
            required: false,
            default: 'false',
            description: 'Whether the accordion group is disabled'
          },
          {
            name: 'panel',
            type: 'AccordionPanel',
            required: true,
            description:
              'Reference to the accordion panel this trigger controls'
          },
          {
            name: 'expanded',
            type: 'boolean',
            required: false,
            default: 'false',
            description: 'Whether the associated panel is expanded'
          }
        ]
      }
    ]
  },
  {
    title: 'Tabs',
    description: 'Organize content into switchable panels',
    route: '/tabs',
    image: '/thumbnails/tabs.svg',
    darkImage: '/thumbnails/tabs-dark.svg',
    components: [
      {
        title: 'Tabs',
        path: 'tabs-1.ts',
        component: Tabs1,
        import: `import { Tabs1 } from 'ng-blocks/tabs/tabs-1'`,
        usage: ` <Tabs1></Tabs1> `,
        apiReference: [
          {
            name: 'id',
            type: 'string',
            required: false,
            description: 'Unique identifier for the tab'
          },
          {
            name: 'value',
            type: 'string',
            required: false,
            description: 'Value associated with the tab for selection tracking'
          },
          {
            name: 'disabled',
            type: 'boolean',
            required: false,
            default: 'false',
            description: 'Whether the tab is disabled'
          }
        ]
      }
    ]
  },
  {
    title: 'Forms',
    description: 'Input fields, validation, and form layouts',
    route: '/forms',
    image: '/thumbnails/forms.svg',
    darkImage: '/thumbnails/forms-dark.svg',
    components: [
      {
        title: 'Login Form',
        path: 'form-1.ts',
        component: Form1,
        import: `import { Form1 } from 'ng-blocks/forms/form-1'`,
        usage: `
      <Form1></Form1>
    `
      },
      {
        title: 'Signup Form',
        path: 'form-2.ts',
        component: Form2,
        import: `import { Form2 } from 'ng-blocks/forms/form-2'`,
        usage: `
      <Form2></Form2>
    `
      }
    ]
  },
  {
    title: 'Data Table',
    description: 'Display tabular data with sorting, filtering, and pagination',
    route: '/data-table',
    image: '/thumbnails/data-table.svg',
    darkImage: '/thumbnails/data-table-dark.svg',
    components: [
      {
        title: 'Basic Data Table',
        path: 'basic.ts',
        component: BasicDataTable,
        import: `import { BasicDataTable } from 'ng-blocks/data-table/basic'`,
        usage: `
      <BasicDataTable></BasicDataTable>
    `
      }
    ]
  }
]
