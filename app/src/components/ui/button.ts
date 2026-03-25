import { computed, Directive, input } from '@angular/core'

import { cva, VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'
import type { ClassValue } from 'clsx'

const buttonVariants = cva(
  'cn-button inline-flex items-center justify-center whitespace-nowrap transition-all disabled:pointer-events-none disabled:opacity-50 [&_ng-icon]:pointer-events-none shrink-0 [&_ng-icon]:shrink-0 outline-none group/button select-none',
  {
    variants: {
      variant: {
        default: 'cn-button-variant-default',
        outline: 'cn-button-variant-outline',
        secondary: 'cn-button-variant-secondary',
        ghost: 'cn-button-variant-ghost',
        destructive: 'cn-button-variant-destructive',
        link: 'cn-button-variant-link',
      },
      size: {
        default: 'cn-button-size-default',
        xs: 'cn-button-size-xs',
        sm: 'cn-button-size-sm',
        lg: 'cn-button-size-lg',
        icon: 'cn-button-size-icon',
        'icon-xs': 'cn-button-size-icon-xs',
        'icon-sm': 'cn-button-size-icon-sm',
        'icon-lg': 'cn-button-size-icon-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export type ButtonVariants = VariantProps<typeof buttonVariants>

@Directive({
  selector: 'button[appButton], a[appButton]',
  host: {
    'data-slot': 'button',
    '[class]': 'buttonClass()',
  },
})
export class Button {
  public readonly _class = input<ClassValue>('', { alias: 'class' })

  public readonly variant = input<ButtonVariants['variant']>('default')

  public readonly size = input<ButtonVariants['size']>('default')

  protected readonly buttonClass = computed(() =>
    cn(
      this._class(),
      buttonVariants({
        variant: this.variant(),
        size: this.size(),
      }),
    ),
  )
}
