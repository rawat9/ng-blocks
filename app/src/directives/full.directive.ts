import { computed, Directive, input } from '@angular/core'

@Directive({
  selector: '[appFull]',
  host: {
    '[class]': '_class()'
  }
})
export class FullDirective {
  readonly centered = input(true)

  readonly _class = computed(() =>
    this.centered()
      ? 'w-full h-full flex items-center justify-center'
      : 'w-full h-full'
  )
}
