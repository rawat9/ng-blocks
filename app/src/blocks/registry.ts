import { Type } from '@angular/core'
import { AiShimmer } from './ai/ai-shimmer'
import { AiChat } from './ai/ai-chat'
import { Accordion1 } from './accordion/accordion-1'
import { Form1 } from './forms/form-1'
import { Form2 } from './forms/form-2'

export interface Block {
  title: string
  description: string
  route: string
  image: string
  darkImage: string
  import: string
  usage: string
  components: {
    title: string
    path: string
    component: Type<unknown>
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
    import: `import { AiShimmer } from 'ng-blocks/ai/ai-shimmer'`,
    usage: `
      <AiShimmer text="Loading..." duration="5"></AiShimmer>
    `,
    components: [
      {
        title: 'AI Shimmer',
        path: 'ai-shimmer.ts',
        component: AiShimmer
      },
      {
        title: 'AI Chat',
        path: 'ai-chat.ts',
        component: AiChat
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
    import: `import { Accordion1 } from 'ng-blocks/accordion/accordion-1'`,
    usage: `
      <Accordion1></Accordion1>
    `,
    components: [
      {
        title: 'Accordion',
        path: 'accordion-1.ts',
        component: Accordion1
      }
    ]
  },
  {
    title: 'Tabs',
    description: 'Organize content into switchable panels',
    route: '/tabs',
    image: '/thumbnails/tabs.svg',
    import: `import { Tabs } from 'ng-blocks/tabs/tabs'`,
    usage: `
      <Tabs>
        <Tab title="Tab 1">Content for Tab 1</Tab>
        <Tab title="Tab 2">Content for Tab 2</Tab>
        <Tab title="Tab 3">Content for Tab 3</Tab>
      </Tabs>
    `,
    darkImage: '/thumbnails/tabs-dark.svg',
    components: []
  },
  {
    title: 'Forms',
    description: 'Input fields, validation, and form layouts',
    route: '/forms',
    image: '/thumbnails/forms.svg',
    darkImage: '/thumbnails/forms-dark.svg',
    import: `import { Form1 } from 'ng-blocks/forms/form-1'`,
    usage: `
      <Form1></Form1>
    `,
    components: [
      {
        title: 'Login Form',
        path: 'form-1.ts',
        component: Form1
      },
      {
        title: 'Signup Form',
        path: 'form-2.ts',
        component: Form2
      }
    ]
  }
]
