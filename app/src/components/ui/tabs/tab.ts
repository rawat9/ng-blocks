import { computed, Directive, input } from '@angular/core'
import { Tab as NgTab } from '@angular/aria/tabs'
import type { ClassValue } from 'clsx'
import { cn } from '../../../lib/utils'

@Directive({
  selector: '[appNgTab]',
  hostDirectives: [
    {
      directive: NgTab,
      inputs: ['id', 'value', 'disabled'],
    },
  ],
  host: {
    '[class]': '_computedClass()',
  },
})
export class Tab {
  public readonly _class = input<ClassValue>('', { alias: 'class' })

  protected readonly _computedClass = computed(() =>
    cn(
      'cn-tabs-trigger focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring text-foreground/60 hover:text-foreground dark:text-muted-foreground dark:hover:text-foreground relative inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center whitespace-nowrap transition-all group-aria-[orientation=vertical]/tabs-list:w-full group-aria-[orientation=vertical]/tabs-list:justify-start focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
      'group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:aria-selected:bg-transparent dark:group-data-[variant=line]/tabs-list:aria-selected:border-transparent dark:group-data-[variant=line]/tabs-list:aria-selected:bg-transparent',
      'aria-selected:bg-background dark:aria-selected:text-foreground dark:aria-selected:border-input dark:aria-selected:bg-input/30 aria-selected:text-foreground',
      'after:bg-foreground after:absolute after:opacity-0 after:transition-opacity group-aria-[orientation=horizontal]/tabs-list:after:inset-x-0 group-aria-[orientation=horizontal]/tabs-list:after:bottom-[-5px] group-aria-[orientation=horizontal]/tabs-list:after:h-0.5 group-aria-[orientation=vertical]/tabs-list:after:inset-y-0 group-aria-[orientation=vertical]/tabs-list:after:-right-1 group-aria-[orientation=vertical]/tabs-list:after:w-0.5 group-data-[variant=line]/tabs-list:aria-selected:after:opacity-100',
      this._class(),
    ),
  )
}
