import { Type } from '@angular/core'
import { AiShimmer, AiChat } from '#/blocks/ai'
import { Accordion1 } from '#/blocks/accordion'
import { Form1, Form2 } from '#/blocks/forms'
import { Menubar1 } from '#/blocks/menubar'
import { Tabs1 } from '#/blocks/tabs'
import { Toolbar1 } from '#/blocks/toolbar'
import { Tree1 } from '#/blocks/tree'

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
    slug: string
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
        slug: 'ai-shimmer',
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
        slug: 'ai-chat',
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
        slug: 'accordion',
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
        slug: 'tabs',
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
    title: 'Menubar',
    description:
      'Application menu bars with nested actions and keyboard navigation',
    route: '/menubar',
    image: '/thumbnails/menubar.svg',
    darkImage: '/thumbnails/menubar-dark.svg',
    components: [
      {
        title: 'Menubar',
        slug: 'menubar',
        path: 'menubar-1.ts',
        component: Menubar1,
        import: `import { Menubar1 } from 'ng-blocks/menubar/menubar-1'`,
        usage: ` <Menubar1></Menubar1> `,
        apiReference: [
          {
            name: 'values',
            type: 'V[]',
            required: false,
            default: '[]',
            description: 'Selected menu item values emitted by the menubar'
          },
          {
            name: 'wrap',
            type: 'boolean',
            required: false,
            default: 'true',
            description: 'Whether keyboard navigation wraps between menu items'
          },
          {
            name: 'disabled',
            type: 'boolean',
            required: false,
            default: 'false',
            description: 'Whether the menubar is disabled'
          }
        ]
      }
    ],
    badge: 'NEW'
  },
  {
    title: 'Toolbar',
    description:
      'Grouped controls for editor actions, formatting, and commands',
    route: '/toolbar',
    image: '/thumbnails/toolbar.svg',
    darkImage: '/thumbnails/toolbar-dark.svg',
    components: [
      {
        title: 'Toolbar',
        slug: 'toolbar',
        path: 'toolbar-1.ts',
        component: Toolbar1,
        import: `import { Toolbar1 } from 'ng-blocks/toolbar/toolbar-1'`,
        usage: ` <Toolbar1></Toolbar1> `,
        apiReference: [
          {
            name: 'orientation',
            type: "'horizontal' | 'vertical'",
            required: false,
            default: "'horizontal'",
            description:
              'Whether toolbar keyboard navigation is horizontal or vertical'
          },
          {
            name: 'values',
            type: 'V[]',
            required: false,
            default: '[]',
            description: 'Selected toolbar widget values'
          },
          {
            name: 'disabled',
            type: 'boolean',
            required: false,
            default: 'false',
            description: 'Whether the toolbar is disabled'
          }
        ]
      }
    ],
    badge: 'NEW'
  },
  {
    title: 'Tree',
    description:
      'Hierarchical navigation with selection, expansion, and typeahead',
    route: '/tree',
    image: '/thumbnails/tree.svg',
    darkImage: '/thumbnails/tree-dark.svg',
    components: [
      {
        title: 'Tree',
        slug: 'tree',
        path: 'tree-1.ts',
        component: Tree1,
        import: `import { Tree1 } from 'ng-blocks/tree/tree-1'`,
        usage: ` <Tree1></Tree1> `,
        apiReference: [
          {
            name: 'values',
            type: 'V[]',
            required: false,
            default: '[]',
            description: 'Selected tree item values'
          },
          {
            name: 'multi',
            type: 'boolean',
            required: false,
            default: 'false',
            description: 'Whether multiple tree items can be selected'
          },
          {
            name: 'selectionMode',
            type: "'explicit' | 'follow'",
            required: false,
            default: "'explicit'",
            description:
              'Whether selection follows focus or is explicitly chosen'
          },
          {
            name: 'nav',
            type: 'boolean',
            required: false,
            default: 'false',
            description:
              'Whether the tree represents navigation instead of selection'
          }
        ]
      }
    ],
    badge: 'NEW'
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
        slug: 'login-form',
        component: Form1,
        import: `import { Form1 } from 'ng-blocks/forms/form-1'`,
        usage: `
      <Form1></Form1>
    `
      },
      {
        title: 'Signup Form',
        path: 'form-2.ts',
        slug: 'signup-form',
        component: Form2,
        import: `import { Form2 } from 'ng-blocks/forms/form-2'`,
        usage: `
      <Form2></Form2>
    `
      }
    ]
  }
]
