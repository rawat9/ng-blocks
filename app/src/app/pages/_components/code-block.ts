import { Component, effect, inject, input, signal } from '@angular/core'
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'
import { provideIcons } from '@ng-icons/core'
import { lucideCode } from '@ng-icons/lucide'
import { codeToHtml } from 'shiki'
import { CopyButton } from './copy-button'

@Component({
  selector: 'app-code-block',
  imports: [CopyButton],
  viewProviders: [
    provideIcons({
      lucideCode
    })
  ],
  template: ` <div>
    <figure data-rehype-pretty-code-figure="" class="border">
      <app-copy-button [code]="code()"></app-copy-button>
      <div [innerHTML]="htmlToRender()"></div>
    </figure>
  </div>`
})
export class CodeBlock {
  readonly htmlToRender = signal<SafeHtml | null>(null)

  readonly sanitizer = inject(DomSanitizer)

  public readonly code = input.required<string>()

  constructor() {
    effect(async () => {
      const code = await this.highlightCode(this.code())
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
              'no-scrollbar min-w-0 overflow-x-auto overflow-y-auto overscroll-x-contain overscroll-y-auto px-4 py-3.5 outline-none has-[[data-highlighted-line]]:px-0 has-[[data-line-numbers]]:px-0 has-[[data-slot=tabs]]:p-0 !bg-transparent'
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
