import { Component, computed, input } from '@angular/core'
import { cva, VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'

export const inputVariants = cva(
  'h-8.5 w-full min-w-0 rounded-[inherit] px-[calc(--spacing(3)-1px)] leading-8.5 outline-none placeholder:text-muted-foreground/72 sm:h-7.5 sm:leading-7.5',
  {
    defaultVariants: {
      size: 'default',
    },
    variants: {
      size: {
        default: '',
        sm: 'h-7.5 px-[calc(--spacing(2.5)-1px)] leading-7.5 sm:h-6.5 sm:leading-6.5',
        lg: 'h-9.5 leading-9.5 sm:h-8.5 sm:leading-8.5',
      },
    },
  },
)

type InputVariants = VariantProps<typeof inputVariants>

@Component({
  selector: 'app-input',
  template: `
    <span
      class="relative inline-flex w-full rounded-lg border border-input bg-background bg-clip-padding text-base shadow-xs ring-ring/24 transition-shadow before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] not-has-disabled:not-has-focus-visible:not-has-aria-invalid:before:shadow-[0_1px_--theme(--color-black/4%)] has-focus-visible:has-aria-invalid:border-destructive/64 has-focus-visible:has-aria-invalid:ring-destructive/16 has-aria-invalid:border-destructive/36 has-focus-visible:border-ring has-disabled:opacity-64 has-[:disabled,:focus-visible,[aria-invalid]]:shadow-none has-focus-visible:ring-[3px] sm:text-sm dark:bg-input/32 dark:not-in-data-[slot=group]:bg-clip-border dark:has-aria-invalid:ring-destructive/24 dark:not-has-disabled:not-has-focus-visible:not-has-aria-invalid:before:shadow-[0_-1px_--theme(--color-white/8%)]"
    >
      <input [class]="inputClass()" />
    </span>
  `,
})
export class Input {
  public readonly type = input<InputVariants['size']>('default')

  public readonly size = input<InputVariants['size']>('default')

  protected readonly inputClass = computed(() =>
    cn(inputVariants({ size: this.size() })),
  )
}
