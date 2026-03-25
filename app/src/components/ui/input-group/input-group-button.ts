import { computed, Directive, input } from '@angular/core'
import { ClassValue } from 'clsx'
import { cn } from '../../../lib/utils'
import { cva, VariantProps } from 'class-variance-authority'
import { Button } from '../button'

const inputGroupButtonVariants = cva(
  'flex items-center gap-2 text-sm shadow-none',
  {
    variants: {
      size: {
        xs: "h-6 gap-1 rounded-[calc(var(--radius)-3px)] px-1.5 [&>ng-icon:not([class*='size-'])]:size-3.5",
        sm: '',
        'icon-xs':
          'size-6 rounded-[calc(var(--radius)-3px)] p-0 has-[>ng-icon]:p-0',
        'icon-sm': 'size-8 p-0 has-[>ng-icon]:p-0',
      },
    },
    defaultVariants: {
      size: 'xs',
    },
  },
)

type InputGroupButtonVariants = VariantProps<typeof inputGroupButtonVariants>

@Directive({
  selector: 'button[appInputGroupButton]',
  hostDirectives: [{ directive: Button, inputs: ['variant'] }],
  host: {
    '[attr.data-size]': 'size()',
    '[type]': 'type()',
  },
})
export class InputGroupButton {
  public readonly _class = input<ClassValue>('', { alias: 'class' })

  public readonly type = input<'button' | 'submit' | 'reset'>('button')

  public readonly size = input<InputGroupButtonVariants['size']>('xs')

  protected readonly _computedClass = computed(() =>
    cn(inputGroupButtonVariants({ size: this.size() }), this._class()),
  )
}
