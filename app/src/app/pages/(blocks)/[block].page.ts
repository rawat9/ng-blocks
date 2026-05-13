import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  HostListener,
  inject,
  input,
  linkedSignal,
  signal,
  viewChild
} from '@angular/core'
import { RouteMeta } from '@analogjs/router'
import { blocks, Block } from '../../../blocks/registry'
import { ActivatedRoute, Router } from '@angular/router'
import { AnimateOnScrollDirective } from '../../../directives'
import { cn } from '#lib/utils'
import { NgComponentOutlet } from '@angular/common'
import { Toolbar } from './_components/toolbar'
import { CodeViewer } from './_components/code-viewer'
import { httpResource } from '@angular/common/http'
import type { File } from '#lib/get-component-source'
import { Clipboard } from '@angular/cdk/clipboard'
import {
  BlocksLayout,
  CodeBlock,
  InstallCommand,
  Section
} from '../_components'
import { injectResponse } from '@analogjs/router/tokens'

export const routeMeta: RouteMeta = {
  title: (route) => {
    const block = route.paramMap.get('block')
    return block ? `ng-blocks / ${block}` : ''
  },
  canActivate: [
    async (route) => {
      const blockParam: string = route.params['block']
      const found = blocks.some(
        (b) => b.title.toLocaleLowerCase() === blockParam
      )

      if (!found) {
        const response = injectResponse()

        if (import.meta.env.SSR && response) {
          response.statusCode = 404
          response.end()
        }
      }
      return true
    }
  ]
}

@Component({
  selector: 'app-block-page',
  imports: [
    AnimateOnScrollDirective,
    NgComponentOutlet,
    Toolbar,
    CodeViewer,
    Section,
    CodeBlock,
    InstallCommand,
    BlocksLayout
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './[block].page.html'
})
export default class BlockPage {
  public readonly block = input.required<string>()

  readonly codeViewer = viewChild.required(CodeViewer)

  private readonly router = inject(Router)

  private readonly route = inject(ActivatedRoute)

  readonly selectedComponent = linkedSignal(
    () => this.getBlockInfo().components[0]
  )

  readonly import = computed(() => {
    return this.getBlockInfo().import.trim()
  })

  readonly usage = computed(() => this.getBlockInfo().usage.trim())

  readonly cn = cn

  readonly activeTab = signal<'preview' | 'code'>('preview')

  readonly isLoaded = signal(false)

  constructor() {
    afterNextRender(() => {
      this.isLoaded.set(true)

      // Restore selected component from URL fragment
      const fragment = this.route.snapshot.fragment
      if (fragment) {
        const match = this.getBlockInfo().components.find(
          (c) => this.toSlug(c.title) === fragment
        )
        if (match) {
          this.selectedComponent.set(match)
        }
      }
    })
  }

  selectComponent(c: Block['components'][number]) {
    this.selectedComponent.set(c)
    this.router.navigate([], {
      fragment: this.toSlug(c.title),
      replaceUrl: true
    })
  }

  private toSlug(title: string): string {
    return title.toLowerCase().replace(/\s+/g, '-')
  }

  readonly getBlockInfo = computed(() => {
    const block = blocks.find(
      (b) => b.title.toLocaleLowerCase() === this.block()
    )

    if (!block) {
      return {
        title: 'Block Not Found',
        description: 'The requested block does not exist in the registry.',
        route: '',
        image: '',
        components: [],
        import: '',
        usage: ''
      }
    }

    return block
  })

  readonly path = computed(
    () => `${this.block().toLocaleLowerCase()}/${this.selectedComponent().path}`
  )

  readonly code = httpResource<File | File[]>(() => ({
    url: `/api/source`,
    method: 'GET',
    params: {
      path: this.path()
    }
  }))

  private readonly clipboard = inject(Clipboard)

  handleCopyCode() {
    const raw = this.codeViewer().selectedFile().contents
    this.clipboard.copy(raw)
  }

  private readonly blockRoutes = blocks.map((b) => b.route)

  @HostListener('window:keydown.ArrowDown', ['$event'])
  navigateNext(event: Event): void {
    const current = this.blockRoutes.findIndex((r) =>
      this.router.url.startsWith(r)
    )
    if (current === -1) return
    event.preventDefault()
    const next = this.blockRoutes[(current + 1) % this.blockRoutes.length]
    this.router.navigateByUrl(next)
  }

  @HostListener('window:keydown.ArrowUp', ['$event'])
  navigatePrev(event: Event): void {
    const current = this.blockRoutes.findIndex((r) =>
      this.router.url.startsWith(r)
    )
    if (current === -1) return
    event.preventDefault()
    const prev =
      this.blockRoutes[
        (current - 1 + this.blockRoutes.length) % this.blockRoutes.length
      ]
    this.router.navigateByUrl(prev)
  }
}
