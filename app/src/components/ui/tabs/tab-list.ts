import { computed, Directive, input } from '@angular/core'
import { TabList as NgTabList } from '@angular/aria/tabs'
import type { ClassValue } from 'clsx'
import { cn } from '../../../lib/utils'
import { cva, VariantProps } from 'class-variance-authority'

const tabsListVariants = cva(
  'cn-tabs-list group/tabs-list text-muted-foreground inline-flex w-fit items-center justify-center aria-[orientation=vertical]:h-fit aria-[orientation=vertical]:flex-col',
  {
    variants: {
      variant: {
        default: 'cn-tabs-list-variant-default bg-muted',
        line: 'cn-tabs-list-variant-line gap-1 bg-transparent',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export type TabListVariants = VariantProps<typeof tabsListVariants>

@Directive({
  selector: '[appNgTabList]',
  hostDirectives: [
    {
      directive: NgTabList,
      inputs: ['orientation', 'selectedTab', 'selectionMode', 'disabled'],
      outputs: ['selectedTabChange'],
    },
  ],
  host: {
    '[attr.data-variant]': 'variant()',
    'data-slot': 'tabs-list',
    '[class]': '_computedClass()',
  },
})
export class TabList {
  public readonly _class = input<ClassValue>('', { alias: 'class' })

  public readonly variant = input<TabListVariants['variant']>('default')

  protected readonly _computedClass = computed(() =>
    cn(
      tabsListVariants({
        variant: this.variant(),
      }),
      this._class(),
    ),
  )
}
