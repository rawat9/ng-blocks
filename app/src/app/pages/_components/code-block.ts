import { afterNextRender, Component, inject, signal } from '@angular/core'
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'
import { codeToHtml } from 'shiki'

@Component({
  selector: 'app-code-block',
  viewProviders: [],
  template: `<div
    data-code-block
    data-line-numbers="false"
    class="relative text-sm w-full border border-border overflow-hidden bg-zinc-100 dark:bg-zinc-900/50 rounded-xl"
  >
    <div class="text-code-foreground flex min-h-0 min-w-0 flex-1 flex-col">
      <figure
        data-rehype-pretty-code-figure=""
        class="mx-0! mt-0 flex min-h-0 min-w-0 flex-1 overflow-hidden flex-col border-none w-full"
      >
        <figcaption
          class="text-code-foreground [&_ng-icon]:text-code-foreground flex h-12 shrink-0 items-center gap-2 border-neutral-200 dark:border-neutral-800 px-4 py-2 [&_ng-icon]:size-4 [&_ng-icon]:opacity-70"
          [attr.data-language]="'angular-ts'"
        >
          fiel.ts
        </figcaption>
        <div
          class="flex flex-1 min-h-0 min-w-0 overflow-auto scrollbar"
          [innerHTML]="htmlToRender()"
        ></div>
      </figure>
    </div>
  </div> `
})
export class CodeBlock {
  readonly htmlToRender = signal<SafeHtml | null>(null)

  readonly sanitizer = inject(DomSanitizer)

  constructor() {
    afterNextRender(async () => {
      const code = await this.highlightCode('console.log("Hello, World!");')
      this.htmlToRender.set(code)
    })
  }

  async highlightCode(code: string) {
    const html = await codeToHtml(code, {
      lang: 'angular-ts',
      themes: {
        dark: 'github-dark',
        light: 'github-light'
      },
      transformers: [
        {
          pre(node) {
            node.properties['class'] =
              'min-w-0 px-4 py-3.5 outline-none has-[[data-highlighted-line]]:px-0 has-[[data-line-numbers]]:px-0 has-[[data-slot=tabs]]:p-0 !bg-transparent'
          },
          code(node) {
            node.properties['data-line-numbers'] = ''
          },
          line(node) {
            node.properties['data-line'] = ''
          }
        }
      ]
    })

    return this.sanitizer.bypassSecurityTrustHtml(html)
  }
}
