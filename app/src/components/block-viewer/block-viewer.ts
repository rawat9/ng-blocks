import {
  lucideCopy,
  lucideFullscreen,
  lucideMonitor,
  lucideSmartphone,
  lucideTablet,
} from '@ng-icons/lucide'
import {
  Component,
  computed,
  inject,
  input,
  model,
  OnInit,
  signal,
} from '@angular/core'
import { blocks } from '../../blocks/registry'
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { Button } from '../ui/button'
import { Tab, TabList, TabPanel, Tabs } from '../ui/tabs'
import { AnimateOnScrollDirective } from '../../directives'
import { TabContent } from '@angular/aria/tabs'
import { codeToHtml } from 'shiki'
import { NgComponentOutlet } from '@angular/common'
import { HttpClient } from '@angular/common/http'

interface FileItem {
  path: string
  name: string
}

// Dynamic glob imports for all blocks - components and sources
const blockSources = import.meta.glob('../../blocks/**/*.ts', {
  query: '?source',
  eager: false,
}) as Record<string, () => Promise<{ default: string }>>

@Component({
  selector: 'app-block-viewer',
  imports: [
    NgIcon,
    AnimateOnScrollDirective,
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
export class BlockViewer implements OnInit {
  private readonly sanitizer = inject(DomSanitizer)

  block = input.required<string>()

  private readonly http = inject(HttpClient)

  viewport = signal<'desktop' | 'tablet' | 'mobile'>('desktop')
  selected = model('preview')

  code = signal<SafeHtml | string>('')
  files = signal<FileItem[]>([])
  selectedFile = signal<string | null>(null)

  private sourceModules: Record<string, () => Promise<{ default: string }>> = {}

  // Get block info from the registry
  components = computed(() => {
    const block = blocks.find((b) => b.title.toLowerCase() === this.block())

    if (!block) {
      throw new Error(`Block not found: ${this.block()}`)
    }

    return block.components
  })

  // Filter source files for the current block
  private getBlockSources(): Record<
    string,
    () => Promise<{ default: string }>
  > {
    const blockName = this.block()
    return Object.fromEntries(
      Object.entries(blockSources).filter(([path]) =>
        path.includes(`/blocks/${blockName}/`),
      ),
    )
  }

  async ngOnInit() {
    // Setup source files
    this.http.get('/api/v1/source/accordion').subscribe((res) => {
      console.log(res)
    })
    this.sourceModules = this.getBlockSources()

    const fileList: FileItem[] = Object.keys(this.sourceModules).map(
      (path) => ({
        path,
        name: this.getFileName(path),
      }),
    )

    this.files.set(fileList)

    if (fileList.length > 0) {
      await this.selectFile(fileList[0].path)
    }
  }

  async selectFile(path: string) {
    this.selectedFile.set(path)
    const module = await this.sourceModules[path]()
    const html = await this.highlightCode(module.default)
    this.code.set(html)
  }

  getFileName(path: string): string {
    return path.split('/').pop() || ''
  }

  openInNewTab() {
    window.open(`/blocks/${this.block()}/preview`, '_blank')
  }

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
              'no-scrollbar min-w-0 overflow-x-auto px-4 py-3.5 outline-none has-[[data-highlighted-line]]:px-0 has-[[data-line-numbers]]:px-0 has-[[data-slot=tabs]]:p-0 !bg-transparent'
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
}
