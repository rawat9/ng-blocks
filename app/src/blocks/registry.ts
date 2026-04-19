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
    image: 'https://blocks.so/thumbnails/ai.svg',
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
    image: 'https://blocks.so/thumbnails/ai.svg',
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
    image: 'https://blocks.so/thumbnails/dialogs.svg',
    components: []
  },
  {
    title: 'Forms',
    description: 'Input fields, validation, and form layouts',
    route: '/forms',
    image: 'https://blocks.so/thumbnails/dialogs.svg',
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
