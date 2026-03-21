import {
  afterNextRender,
  Component,
  inject,
  model,
  OnInit,
  signal,
} from '@angular/core'
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucideArrowLeft,
  lucideCopy,
  lucideFormInput,
  lucideFullscreen,
  lucideMonitor,
  lucideSmartphone,
  lucideTablet,
  lucideTextCursorInput,
} from '@ng-icons/lucide'
import { codeToHtml } from 'shiki'
import { RouterLink } from '@angular/router'
import { Tab, TabList, TabPanel, Tabs } from '../../src/components/ui/tabs'
import { TabContent } from '@angular/aria/tabs'
import { Button } from '../../src/components/ui/button'
import { Form1 } from '../../src/blocks/forms/form-1'
import { AnimateOnScrollDirective } from '../../src/directives'
import { BlocksNav } from '../../src/components/ui/blocks-nav'
import {
  ToggleGroup,
  ToggleGroupItem,
} from '../../src/components/ui/toggle-group'

interface FileItem {
  path: string
  name: string
}

@Component({
  selector: 'app-forms-page',
  imports: [
    NgIcon,
    RouterLink,
    TabPanel,
    TabContent,
    Tabs,
    TabList,
    Tab,
    Button,
    Form1,
    AnimateOnScrollDirective,
    BlocksNav,
    ToggleGroup,
    ToggleGroupItem,
  ],
  providers: [
    provideIcons({
      lucideCopy,
      lucideArrowLeft,
      lucideFormInput,
      lucideTextCursorInput,
      lucideMonitor,
      lucideTablet,
      lucideSmartphone,
      lucideFullscreen,
    }),
  ],
  templateUrl: 'forms.page.html',
})
export default class FormsPageComponent implements OnInit {
  private readonly sanitizer = inject(DomSanitizer)

  isLoaded = signal(false)
  selected = model('preview')
  viewport = signal<'desktop' | 'tablet' | 'mobile'>('desktop')

  code = signal<SafeHtml | string>('')

  files = signal<FileItem[]>([])
  selectedFile = signal<string | null>(null)

  private modules: Record<string, () => Promise<{ default: string }>> = {}

  constructor() {
    afterNextRender(() => {
      this.isLoaded.set(true)
    })
  }
  async ngOnInit() {
    this.modules = import.meta.glob('../../../../blocks/forms/**.ts', {
      query: '?source',
      eager: false,
    }) as Record<string, () => Promise<{ default: string }>>
    // let code = ''
    //
    // for (const path in modules) {
    //   const module = (await modules[path]()) as { default: string }
    //   code = module.default
    // }
    //
    // const html = await this.highlightCode(code)
    // this.code.set(html)

    const fileList: FileItem[] = Object.keys(this.modules).map((path) => ({
      path,
      name: this.getFileName(path),
    }))

    this.files.set(fileList)

    if (fileList.length > 0) {
      await this.selectFile(fileList[0].path)
    }
  }

  async selectFile(path: string) {
    this.selectedFile.set(path)
    const module = await this.modules[path]()
    const html = await this.highlightCode(module.default)
    this.code.set(html)
  }

  getFileName(path: string): string {
    return path.split('/').pop() || ''
  }

  openInNewTab() {
    window.open('/forms/preview', '_blank')
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
