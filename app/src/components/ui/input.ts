import { computed, Directive, input } from '@angular/core'
import { ClassValue } from 'clsx'
import { cn } from '../../lib/utils'

@Directive({
  selector: 'input[appInput],app-input',
  host: {
    'data-slot': 'input',
    '[class]': '_computedClass()',
  },
})
export class Input {
  public readonly _class = input<ClassValue>('', { alias: 'class' })

  protected readonly _computedClass = computed(() =>
    cn(
      'cn-input w-full min-w-0 outline-none file:inline-flex file:border-0 file:bg-transparent file:text-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
      this._class(),
    ),
  )
}
