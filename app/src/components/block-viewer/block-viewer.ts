import {
  lucideCopy,
  lucideFullscreen,
  lucideMonitor,
  lucideSmartphone,
  lucideTablet,
} from '@ng-icons/lucide'
import {
  Component,
  inject,
  input,
  model,
  resource,
  signal,
  Type,
} from '@angular/core'
import { DomSanitizer } from '@angular/platform-browser'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { Button } from '../ui/button'
import { Tab, TabList, TabPanel, Tabs } from '../ui/tabs'
import { TabContent } from '@angular/aria/tabs'
import { codeToHtml } from 'shiki'
import { NgComponentOutlet } from '@angular/common'
import { HttpClient } from '@angular/common/http'
import { File } from '../../lib/get-component-source'
import { firstValueFrom } from 'rxjs'

interface FileItem {
  path: string
  name: string
}

@Component({
  selector: 'app-block-viewer',
  imports: [
    NgIcon,
    Tabs,
    TabList,
    Tab,
    TabPanel,
    TabContent,
    Button,
    NgComponentOutlet,
  ],
  templateUrl: './block-viewer.html',
  providers: [
    provideIcons({
      lucideCopy,
      lucideMonitor,
      lucideTablet,
      lucideSmartphone,
      lucideFullscreen,
    }),
  ],
})
export class BlockViewer {
  private readonly sanitizer = inject(DomSanitizer)

  readonly path = input.required<string>()

  readonly block = input.required<string>()

  readonly title = input.required<string>()

  readonly component = input.required<Type<any>>()

  private readonly http = inject(HttpClient)

  private raw = signal('')

  viewport = signal<'desktop' | 'tablet' | 'mobile'>('desktop')

  readonly selectedTab = model<'preview' | 'code'>('preview')

  selectedFile = signal<string | null>(null)

  readonly code = resource({
    params: () => this.selectedTab() === 'code',
    loader: async () => {
      const { files } = await firstValueFrom(
        this.http.get<{ files: File[] }>(
          `/api/v1/source/${this.block().toLocaleLowerCase()}`,
        ),
      )

      const file = files.find((file) => file.filename === this.path())

      if (!file) {
        throw new Error(`File not found: ${this.title()}`)
      }

      this.raw.set(file.contents)

      const html = await this.highlightCode(file.contents)
      return html
    },
  })

  getFileName(path: string): string {
    return path.split('/').pop() || ''
  }

  // openInNewTab() {
  //   window.open(`/blocks/${this.block()}/preview`, '_blank')
  // }

  private async highlightCode(code: string) {
    const html = await codeToHtml(code, {
      lang: 'angular-ts',
      themes: {
        dark: 'vesper',
        light: 'github-light',
      },
      transformers: [
        {
          pre(node) {
            node.properties['class'] =
              'min-w-0 overflow-x-auto px-4 py-3.5 outline-none has-[[data-highlighted-line]]:px-0 has-[[data-line-numbers]]:px-0 has-[[data-slot=tabs]]:p-0 !bg-transparent'
          },
          code(node) {
            node.properties['data-line-numbers'] = ''
          },
          line(node) {
            node.properties['data-line'] = ''
          },
        },
      ],
    })

    return this.sanitizer.bypassSecurityTrustHtml(html)
  }

  copyCode() {
    navigator.clipboard.writeText(this.raw())
  }
}
