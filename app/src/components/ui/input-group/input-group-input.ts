import { computed, Directive, input } from '@angular/core'
import { ClassValue } from 'clsx'
import { cn } from '../../../lib/utils'
import { Input } from '../input'

@Directive({
  selector: 'input[appInputGroupInput],app-input-group-input',
  hostDirectives: [Input],
  host: {
    'data-slot': 'input-group-control',
    '[class]': '_computedClass()',
  },
})
export class InputGroupTextarea {
  public readonly _class = input<ClassValue>('', { alias: 'class' })

  protected readonly _computedClass = computed(() =>
    cn('cn-input-group-input flex-1', this._class()),
  )
}
