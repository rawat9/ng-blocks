import { computed, Directive, input } from '@angular/core'
import { cn, type ClassValue } from 'cnfast'
import { MenuItem as NgMenuItem } from '@angular/aria/menu'

@Directive({
  selector: 'div[appMenuItem]',
  hostDirectives: [
    {
      directive: NgMenuItem,
      inputs: ['value']
    }
  ],
  host: {
    'data-slot': 'menu-item',
    '[class]': 'menuItemClass()'
  }
})
export class MenuItem {
  public readonly _class = input<ClassValue>('', { alias: 'class' })

  protected readonly menuItemClass = computed(() =>
    cn(
      this._class(),
      "flex min-h-8 cursor-default select-none items-center gap-2 rounded-sm px-2 py-1 text-base text-foreground outline-none data-disabled:pointer-events-none data-highlighted:bg-accent data-inset:ps-8 data-[variant=destructive]:text-destructive-foreground data-highlighted:text-accent-foreground data-disabled:opacity-64 sm:min-h-7 sm:text-sm [&>svg:not([class*='opacity-'])]:opacity-80 [&>svg:not([class*='size-'])]:size-4.5 sm:[&>svg:not([class*='size-'])]:size-4 [&>svg]:pointer-events-none [&>svg]:-mx-0.5 [&>svg]:shrink-0"
    )
  )
}
