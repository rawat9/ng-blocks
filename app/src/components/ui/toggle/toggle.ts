import { computed, Directive, input } from '@angular/core'
import type { ClassValue } from 'clsx'
import { cn } from '../../../lib/utils'
import { cva, VariantProps } from 'class-variance-authority'

export const toggleVariants = cva(
  'cn-toggle group/toggle hover:bg-muted inline-flex items-center justify-center whitespace-nowrap outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'cn-toggle-variant-default',
        outline: 'cn-toggle-variant-outline',
      },
      size: {
        default: 'cn-toggle-size-default',
        sm: 'cn-toggle-size-sm',
        lg: 'cn-toggle-size-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export type ToggleVariants = VariantProps<typeof toggleVariants>

@Directive({
  selector: 'button[appNgToggle]',
  host: {
    'data-slot': 'toggle',
    '[class]': '_computedClass()',
  },
})
export class Toggle {
  public readonly _class = input<ClassValue>('', { alias: 'class' })

  public readonly variant = input<ToggleVariants['variant']>('default')

  public readonly size = input<ToggleVariants['size']>('default')

  protected readonly _computedClass = computed(() =>
    cn(
      this._class(),
      toggleVariants({
        variant: this.variant(),
        size: this.size(),
      }),
    ),
  )
}
