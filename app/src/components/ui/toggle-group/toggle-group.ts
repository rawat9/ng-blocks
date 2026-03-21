import { computed, Directive, input, numberAttribute } from '@angular/core'
import type { ClassValue } from 'clsx'
import { cn } from '../../../lib/utils'
import type { ToggleVariants } from '../toggle/toggle'

@Directive({
  selector: '[appNgToggleGroup]',
  host: {
    'data-slot': 'toggle-group',
    '[attr.data-variant]': 'variant()',
    '[attr.data-size]': 'size()',
    '[attr.data-spacing]': 'spacing()',
    '[style.--gap]': 'spacing()',
    '[class]': '_computedClass()',
  },
})
export class ToggleGroup {
  public readonly _class = input<ClassValue>('', { alias: 'class' })

  public readonly variant = input<ToggleVariants['variant']>('default')

  public readonly size = input<ToggleVariants['size']>('default')

  public readonly spacing = input(0, {
    transform: numberAttribute,
  })

  protected readonly _computedClass = computed(() =>
    cn(
      'cn-toggle-group group/toggle-group flex w-fit flex-row items-center gap-[--spacing(var(--gap))] data-vertical:flex-col data-vertical:items-stretch',
      this._class(),
    ),
  )
}
