import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  linkedSignal,
  signal
} from '@angular/core'
import { File } from '../../../../lib/get-component-source'
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'
import { codeToHtml } from 'shiki'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { simpleTypescript } from '@ng-icons/simple-icons'
import { lucideFile } from '@ng-icons/lucide'

@Component({
  selector: 'app-code-viewer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIcon],
  viewProviders: [
    provideIcons({
      simpleTypescript,
      lucideFile
    })
  ],
  styles: `
    :host {
      display: flex;
      flex: 1 1 auto;
      min-width: 0;
      min-height: 0;
      width: 100%;
      overflow: hidden;
    }
  `,
  template: `
    <div class="flex h-full min-h-0 min-w-0 flex-1 w-full">
      <div class="text-code-foreground flex min-h-0 min-w-0 flex-1 flex-col">
        <figure
          data-rehype-pretty-code-figure=""
          class="mx-0! mt-0 flex min-h-0 min-w-0 flex-1 overflow-hidden flex-col border-none w-full"
        >
          <figcaption
            class="text-code-foreground [&_ng-icon]:text-code-foreground flex h-12 shrink-0 items-center gap-2 border-neutral-200 dark:border-neutral-800 px-4 py-2 [&_ng-icon]:size-4 [&_ng-icon]:opacity-70"
            [attr.data-language]="'angular-ts'"
          >
            <ng-icon
              [name]="getIconForFileType(selectedFile().fileType)"
              [size]="'14'"
            ></ng-icon>
            {{ selectedFile().filename }}
          </figcaption>
          <div
            class="flex flex-1 min-h-0 min-w-0 overflow-auto scrollbar"
            [innerHTML]="code()"
          ></div>
        </figure>
      </div>
    </div>
  `
})
export class CodeViewer {
  readonly source = input.required<File | File[]>()

  readonly selectedFile = linkedSignal(() => {
    const source = this.source()
    return Array.isArray(source) ? source[0] : source
  })

  private readonly sanitizer = inject(DomSanitizer)

  readonly code = signal<SafeHtml | null>(null)

  constructor() {
    afterNextRender(async () => {
      const code = await this.highlightCode(this.selectedFile().contents)
      this.code.set(code)
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

  getIconForFileType(fileType: string) {
    switch (fileType) {
      case 'ts':
        return 'simpleTypescript'
      default:
        return 'lucideFile'
    }
  }
}
