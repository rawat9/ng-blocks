import { computed, Directive, input } from '@angular/core'
import { ClassValue } from 'clsx'
import { cn } from '../../../lib/utils'
import { Textarea } from '../textarea'

@Directive({
  selector: 'textarea[appInputGroupTextarea],app-input-group-textarea',
  hostDirectives: [Textarea],
  host: {
    'data-slot': 'input-group-control',
    '[class]': '_computedClass()',
  },
})
export class InputGroupTextarea {
  public readonly _class = input<ClassValue>('', { alias: 'class' })

  protected readonly _computedClass = computed(() =>
    cn(
      'flex-1 resize-none rounded-none border-0 bg-transparent py-2 shadow-none ring-0 focus-visible:ring-0 disabled:bg-transparent aria-invalid:ring-0 dark:bg-transparent dark:disabled:bg-transparent',
      this._class(),
    ),
  )
}
