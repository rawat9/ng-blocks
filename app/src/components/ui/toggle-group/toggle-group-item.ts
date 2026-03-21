import { computed, Directive, input } from '@angular/core'
import type { ClassValue } from 'clsx'
import { cn } from '../../../lib/utils'
import { toggleVariants, ToggleVariants } from '../toggle/toggle'

@Directive({
  selector: '[appNgToggleGroupItem]',
  hostDirectives: [],
  host: {
    'data-slot': 'toggle-group-item',
    '[attr.data-variant]': 'variant()',
    '[attr.data-size]': 'size()',
    '[class]': '_computedClass()',
  },
})
export class ToggleGroupItem {
  public readonly _class = input<ClassValue>('', { alias: 'class' })

  public readonly variant = input<ToggleVariants['variant']>('default')

  public readonly size = input<ToggleVariants['size']>('default')

  protected readonly _computedClass = computed(() =>
    cn(
      toggleVariants({
        variant: this.variant(),
        size: this.size(),
      }),
      'cn-toggle-group-item shrink-0 focus:z-10 focus-visible:z-10 group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:border-l-0 group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:border-t-0 group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-l group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-t',
      this._class(),
    ),
  )
}
