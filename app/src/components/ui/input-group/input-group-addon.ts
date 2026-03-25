import { computed, Directive, input } from '@angular/core'
import { ClassValue } from 'clsx'
import { cn } from '../../../lib/utils'
import { cva, VariantProps } from 'class-variance-authority'

const inputGroupAddonVariants = cva(
  'cn-input-group-addon flex cursor-text items-center justify-center select-none',
  {
    variants: {
      align: {
        'inline-start': 'cn-input-group-addon-align-inline-start order-first',
        'inline-end': 'cn-input-group-addon-align-inline-end order-last',
        'block-start':
          'cn-input-group-addon-align-block-start order-first w-full justify-start',
        'block-end':
          'cn-input-group-addon-align-block-end order-last w-full justify-start',
      },
    },
    defaultVariants: {
      align: 'inline-start',
    },
  },
)

type InputGroupAddonVariants = VariantProps<typeof inputGroupAddonVariants>

@Directive({
  selector: '[appInputGroupAddon],app-input-group-addon',
  host: {
    'data-slot': 'input-group-addon',
    role: 'group',
    '[attr.data-align]': 'align()',
    '[class]': '_computedClass()',
  },
})
export class InputGroupAddon {
  public readonly align =
    input<InputGroupAddonVariants['align']>('inline-start')

  public readonly _class = input<ClassValue>('', { alias: 'class' })

  protected readonly _computedClass = computed(() =>
    cn(inputGroupAddonVariants({ align: this.align() }), this._class()),
  )
}
