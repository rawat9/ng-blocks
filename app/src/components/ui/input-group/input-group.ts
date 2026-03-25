import { computed, Directive, input } from '@angular/core'
import { ClassValue } from 'clsx'
import { cn } from '../../../lib/utils'

@Directive({
  selector: '[appInputGroup],app-input-group',
  host: {
    'data-slot': 'input-group',
    role: 'group',
    '[class]': '_computedClass()',
  },
})
export class InputGroup {
  public readonly _class = input<ClassValue>('', { alias: 'class' })

  protected readonly _computedClass = computed(() =>
    cn(
      'group/input-group cn-input-group relative flex w-full min-w-0 items-center outline-none has-[>textarea]:h-auto',
      this._class(),
    ),
  )
}
