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
import { cn } from '../../../lib/utils'
import { NgComponentOutlet } from '@angular/common'
import { Toolbar } from './_components/toolbar'
import { CodeViewer } from './_components/code-viewer'
import { httpResource } from '@angular/common/http'
import { File } from '../../../lib/get-component-source'
import { Clipboard } from '@angular/cdk/clipboard'
import {
  BlocksLayout,
  CodeBlock,
  InstallCommand,
  Section
} from '../_components'
import { injectResponse } from '@analogjs/router/tokens'

// TODO: refactor to use route data instead of hardcoding paths here
const ARROW_NAV_ROUTES = ['/ai', '/accordion', '/forms']

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
  template: `
    <app-blocks-layout
      [title]="getBlockInfo().title"
      [description]="getBlockInfo().description"
    >
      <div left-column>
        <app-section title="Installation" class="scroll-mt-20 pt-10">
          <app-install-command [block]="block()" />
        </app-section>
        <app-section title="Usage" class="pt-10 scroll-mt-20 gap-4">
          <app-code-block [code]="import()"></app-code-block>
          <app-code-block [code]="usage()"></app-code-block>
        </app-section>
        <app-section title="API Reference" class="pt-10 scroll-mt-20">
        </app-section>
      </div>
      <div
        right-column
        class="relative w-full h-full rounded-xl lg:rounded-2xl overflow-hidden bg-background flex flex-col"
        [class.animate-fade-in-up]="isLoaded()"
        [style.--animation-delay]="'150ms'"
      >
        <app-toolbar
          [(tab)]="activeTab"
          (copyCode)="handleCopyCode()"
        ></app-toolbar>

        <div
          appAnimateOnScroll
          [class]="cn('w-full overflow-auto flex no-scrollbar', 'h-full')"
        >
          @if (activeTab() === 'preview') {
            <div
              [class]="cn('w-full', 'p-10 flex items-center justify-center')"
            >
              @let component =
                getBlockInfo().components.find(
                  (c) => c === selectedComponent()
                );
              <div className="w-full h-full flex items-center justify-center">
                <ng-container
                  *ngComponentOutlet="component!.component"
                ></ng-container>
              </div>
            </div>
          } @else {
            @if (code.hasValue()) {
              <app-code-viewer [source]="code.value()"></app-code-viewer>
            } @else if (code.error()) {
              <div class="w-full h-full flex items-center justify-center">
                <p class="text-sm text-muted-foreground">Failed to load code</p>
              </div>
            } @else {
              <div class="w-full h-full flex items-center justify-center">
                <p class="text-sm text-muted-foreground">Loading code...</p>
              </div>
            }
          }
        </div>

        <!-- Component pills -->
        @if (activeTab() === 'preview') {
          <div
            class="absolute bottom-0 left-0 right-0 z-10 h-14 flex items-center"
          >
            <div
              class="flex items-center gap-1.5 px-3 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
              @for (c of getBlockInfo().components; track c.title) {
                <button
                  (click)="selectComponent(c)"
                  [class]="
                    cn(
                      'shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border',
                      selectedComponent() === c
                        ? 'bg-foreground text-background border-foreground'
                        : 'bg-white/90 dark:bg-zinc-900/90 text-zinc-600 dark:text-zinc-400 border-zinc-200/80 dark:border-zinc-700/80 hover:text-zinc-900 dark:hover:text-zinc-100'
                    )
                  "
                >
                  <span
                    [class]="
                      cn(
                        'w-1.5 h-1.5 rounded-full transition-colors',
                        'bg-zinc-400 dark:bg-zinc-500'
                      )
                    "
                  ></span>
                  {{ c.title }}
                </button>
              }
            </div>
          </div>
        }
      </div>
    </app-blocks-layout>
  `
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
    console.log('here')
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

  @HostListener('window:keydown.ArrowDown', ['$event'])
  navigateNext(event: Event): void {
    const current = ARROW_NAV_ROUTES.findIndex((r) =>
      this.router.url.startsWith(r)
    )
    if (current === -1) return
    event.preventDefault()
    const next = ARROW_NAV_ROUTES[(current + 1) % ARROW_NAV_ROUTES.length]
    this.router.navigateByUrl(next)
  }

  @HostListener('window:keydown.ArrowUp', ['$event'])
  navigatePrev(event: Event): void {
    const current = ARROW_NAV_ROUTES.findIndex((r) =>
      this.router.url.startsWith(r)
    )
    if (current === -1) return
    event.preventDefault()
    const prev =
      ARROW_NAV_ROUTES[
        (current - 1 + ARROW_NAV_ROUTES.length) % ARROW_NAV_ROUTES.length
      ]
    this.router.navigateByUrl(prev)
  }
}
