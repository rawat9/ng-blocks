import { computed, Directive, input } from '@angular/core'
import { cn, type ClassValue } from 'cnfast'
import { Menu as NgMenu } from '@angular/aria/menu'

@Directive({
  selector: 'div[appMenu]',
  hostDirectives: [NgMenu],
  host: {
    'data-slot': 'menu',
    '[class]': 'menuClass()'
  }
})
export class Menu {
  public readonly _class = input<ClassValue>('', { alias: 'class' })

  protected readonly menuClass = computed(() =>
    cn(
      this._class(),
      "bg-popover relative flex origin-(--transform-origin) rounded-lg border shadow-lg/5 outline-none not-dark:bg-clip-padding not-[class*='w-']:min-w-32 before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] before:shadow-[0_1px_--theme(--color-black/4%)] focus:outline-none dark:before:shadow-[0_-1px_--theme(--color-white/6%)]"
    )
  )
}
