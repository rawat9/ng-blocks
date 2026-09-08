import {
  afterNextRender,
  ChangeDetectionStrategy,
  computed,
  Component,
  DestroyRef,
  inject,
  signal
} from '@angular/core'
import { RouterLink } from '@angular/router'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucideArrowRight,
  lucideCheck,
  lucideCopy,
  lucideMenu,
  lucideMoon,
  lucidePause,
  lucidePlay,
  lucideSun
} from '@ng-icons/lucide'
import { simpleGithub } from '@ng-icons/simple-icons'
import { Button } from '#/ui/button'
import { blocks } from '#lib/registry'
import { ToolbarService } from '#services/toolbar.service'
import { AngularBlocks3d } from '../_components/angular-blocks-3d'

@Component({
  selector: 'app-blocks-root',
  imports: [RouterLink, NgIcon, Button, AngularBlocks3d],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  viewProviders: [
    provideIcons({
      lucideArrowRight,
      lucideCheck,
      lucideCopy,
      lucideMenu,
      lucideMoon,
      lucidePause,
      lucidePlay,
      lucideSun,
      simpleGithub
    })
  ],
  template: `
    <a
      href="#main-content"
      class="bg-background focus-visible:outline-foreground absolute top-4 left-4 z-2 -translate-y-[200%] px-4 py-3 focus:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-5 focus-visible:outline-solid"
      >Skip to content</a
    >

    <header>
      <div
        class="mx-auto flex h-18 w-[calc(100%-2rem)] items-center justify-between gap-6 md:w-[min(100%-3rem,1200px)]"
      >
        <a
          routerLink="/"
          class="focus-visible:outline-foreground text-xl font-bold tracking-tight focus-visible:outline-2 focus-visible:outline-offset-5 focus-visible:outline-solid"
          >ng-blocks</a
        >
        <div class="flex items-center">
          <button
            appButton
            variant="ghost"
            size="icon"
            class="focus-visible:outline-foreground focus-visible:outline-2 focus-visible:outline-offset-5 focus-visible:outline-solid motion-reduce:animate-none! motion-reduce:transition-none!"
            aria-label="Toggle color theme"
            (click)="toolbar.toggleTheme()"
          >
            <span class="flex dark:hidden">
              <ng-icon name="lucideMoon" size="18" aria-hidden="true" />
            </span>
            <span class="hidden dark:flex">
              <ng-icon name="lucideSun" size="18" aria-hidden="true" />
            </span>
          </button>
          <details
            #mobileMenu
            class="relative md:hidden"
            tabindex="-1"
            (keydown.escape)="mobileMenu.open = false; mobileMenuButton.focus()"
          >
            <summary
              #mobileMenuButton
              class="focus-visible:outline-foreground flex size-10 cursor-pointer list-none items-center justify-center rounded-md focus-visible:outline-2 focus-visible:outline-offset-5 focus-visible:outline-solid [&::-webkit-details-marker]:hidden"
              aria-label="Blocks navigation"
            >
              <ng-icon name="lucideMenu" size="20" aria-hidden="true" />
            </summary>
            <nav
              aria-label="Mobile blocks navigation"
              class="border-border bg-background absolute top-12 right-0 z-1 w-60 rounded-[12px] border p-2"
            >
              @for (block of blocks; track block.route) {
                <a
                  [routerLink]="block.route"
                  class="hover:bg-muted focus-visible:outline-foreground block rounded-md px-4 py-3 text-sm focus-visible:outline-2 focus-visible:outline-offset-5 focus-visible:outline-solid"
                  (click)="mobileMenu.open = false"
                  >{{ block.title }}</a
                >
              }
            </nav>
          </details>
        </div>
      </div>
    </header>

    <main
      id="main-content"
      class="mx-auto w-[calc(100%-2rem)] md:w-[min(100%-3rem,1200px)]"
    >
      <section
        aria-labelledby="hero-title"
        class="grid grid-cols-1 items-center gap-10 py-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:gap-8 md:py-14 lg:gap-16 lg:py-20"
      >
        <div class="min-w-0">
          <p class="mb-5 text-sm font-medium text-cyan-800 dark:text-cyan-300">
            Built with Angular Aria
          </p>
          <h1
            id="hero-title"
            class="text-[clamp(2.25rem,8vw,3.5rem)] leading-[1.08] font-[650] tracking-[-0.055em] md:text-[clamp(2.5rem,4.3vw,3.75rem)]"
          >
            Angular blocks,<br />ready to build.
          </h1>
          <p
            class="text-muted-foreground mt-6 max-w-md text-base leading-relaxed sm:text-lg"
          >
            Accessible components, ready to copy into real products. Make them
            yours with Angular and Tailwind CSS.
          </p>
          <div class="mt-8 flex flex-wrap items-center gap-3">
            <a
              appButton
              size="lg"
              href="#collections"
              class="focus-visible:outline-foreground min-h-11 px-[1.1rem] focus-visible:outline-2 focus-visible:outline-offset-5 focus-visible:outline-solid motion-safe:transition-[transform] motion-safe:duration-180 motion-safe:ease-[ease-out] motion-safe:active:[transform:scale(0.98)] motion-reduce:animate-none! motion-reduce:transition-none!"
            >
              Explore the library
              <ng-icon name="lucideArrowRight" size="16" aria-hidden="true" />
            </a>
            <a
              appButton
              size="lg"
              variant="outline"
              class="focus-visible:outline-foreground min-h-11 px-[1.1rem] focus-visible:outline-2 focus-visible:outline-offset-5 focus-visible:outline-solid motion-safe:transition-[transform] motion-safe:duration-180 motion-safe:ease-[ease-out] motion-safe:active:[transform:scale(0.98)] motion-reduce:animate-none! motion-reduce:transition-none!"
              href="https://github.com/rawat9/ng-blocks"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ng-icon name="simpleGithub" size="16" aria-hidden="true" />
              View source
            </a>
          </div>
        </div>

        <app-angular-blocks-3d />
      </section>

      <section
        aria-label="Install a component"
        class="border-border grid grid-cols-1 items-center gap-4 border-y py-7 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-8"
      >
        <div>
          <h2 class="text-sm font-semibold">One command. Your code.</h2>
          <p class="text-muted-foreground mt-1 text-sm">
            Add a block directly to your project.
          </p>
        </div>
        @if (activeComponent(); as component) {
          <div class="min-w-0">
            <div
              class="border-border bg-background flex items-center rounded-[12px] border"
              (mouseenter)="commandHovered.set(true)"
              (mouseleave)="commandHovered.set(false)"
              (focusin)="commandFocused.set(true)"
              (focusout)="commandFocused.set(false)"
            >
              <code
                class="min-w-0 flex-1 overflow-x-auto py-4 pl-4 text-xs leading-6 sm:text-sm"
              >
                <span class="whitespace-nowrap">npx shadcn&#64;latest add </span
                ><wbr /><span class="whitespace-nowrap"
                  >rawat9/ng-blocks/<span
                    class="text-cyan-800 dark:text-cyan-300"
                    >{{ component.slug }}</span
                  ></span
                >
              </code>
              <div class="flex shrink-0 items-center gap-1 px-2">
                <button
                  appButton
                  variant="ghost"
                  size="icon"
                  class="focus-visible:outline-foreground focus-visible:outline-2 focus-visible:outline-offset-5 focus-visible:outline-solid motion-reduce:animate-none! motion-reduce:transition-none!"
                  [attr.aria-label]="
                    rotationPaused()
                      ? 'Resume component rotation'
                      : 'Pause component rotation'
                  "
                  (click)="rotationPaused.set(!rotationPaused())"
                >
                  <ng-icon
                    [name]="rotationPaused() ? 'lucidePlay' : 'lucidePause'"
                    size="14"
                    aria-hidden="true"
                  />
                </button>
                <button
                  appButton
                  variant="ghost"
                  size="icon"
                  class="focus-visible:outline-foreground focus-visible:outline-2 focus-visible:outline-offset-5 focus-visible:outline-solid motion-reduce:animate-none! motion-reduce:transition-none!"
                  aria-label="Copy install command"
                  (click)="copyCommand()"
                >
                  <ng-icon
                    [name]="
                      copyState() === 'copied' ? 'lucideCheck' : 'lucideCopy'
                    "
                    size="15"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>
            <p class="sr-only" role="status">
              {{
                copyState() === 'copied'
                  ? 'Install command copied. Component rotation paused.'
                  : ''
              }}
            </p>
            @if (copyState() === 'error') {
              <p role="alert" class="text-destructive mt-2 text-sm">
                Could not copy. Select the command and copy it manually.
              </p>
            }
          </div>
        } @else {
          <p class="text-muted-foreground text-sm">
            Install commands will appear when components are available.
          </p>
        }
      </section>

      <section
        id="collections"
        aria-labelledby="collections-title"
        class="scroll-mt-8 py-12 md:py-16"
      >
        <div class="mb-8">
          <h2
            id="collections-title"
            class="text-2xl font-semibold tracking-tight sm:text-3xl"
          >
            Find your next building block.
          </h2>
          <p class="text-muted-foreground mt-3 text-sm">
            Pick what your project needs.
          </p>
        </div>
        <div
          class="grid grid-cols-1 gap-6 md:grid-cols-2 min-[75rem]:grid-cols-4"
        >
          @for (block of blocks; track block.route) {
            <a
              [routerLink]="block.route"
              class="group/collection border-border before:border-border focus-visible:outline-foreground relative flex min-w-0 flex-col overflow-hidden rounded-[20px] border p-[3px] before:pointer-events-none before:absolute before:inset-[3px] before:rounded-[16px] before:border before:content-[''] focus-visible:outline-2 focus-visible:outline-offset-5 focus-visible:outline-solid"
            >
              <div class="min-h-24 px-6 py-4">
                <h3 class="text-base font-semibold tracking-tight">
                  {{ block.title }}
                </h3>
                <p class="text-muted-foreground text-sm leading-relaxed">
                  {{ block.description }}
                </p>
              </div>
              <div
                class="border-border bg-container mt-auto aspect-[1.45] overflow-hidden rounded-[14px] border"
              >
                <img
                  [src]="block.image"
                  alt=""
                  width="600"
                  height="375"
                  loading="lazy"
                  class="h-full w-full object-contain p-4 motion-safe:transition-[transform] motion-safe:duration-180 motion-safe:ease-[ease-out] motion-safe:group-hover/collection:[transform:scale(1.025)] dark:hidden"
                />
                <img
                  [src]="block.darkImage"
                  alt=""
                  width="600"
                  height="375"
                  loading="lazy"
                  class="hidden h-full w-full object-contain p-4 motion-safe:transition-[transform] motion-safe:duration-180 motion-safe:ease-[ease-out] motion-safe:group-hover/collection:[transform:scale(1.025)] dark:block"
                />
              </div>
            </a>
          } @empty {
            <p class="text-muted-foreground py-8">
              No collections yet. Check back for new Angular blocks.
            </p>
          }
        </div>
      </section>
    </main>

    <footer class="border-border border-t">
      <div
        class="mx-auto flex w-[calc(100%-2rem)] flex-col gap-2 py-7 text-sm sm:flex-row sm:items-center sm:justify-between md:w-[min(100%-3rem,1200px)]"
      >
        <a
          routerLink="/"
          class="focus-visible:outline-foreground font-semibold tracking-tight focus-visible:outline-2 focus-visible:outline-offset-5 focus-visible:outline-solid"
          >ng-blocks</a
        >
        <p class="text-muted-foreground">
          Built with Angular Aria and Tailwind CSS.
        </p>
      </div>
    </footer>
  `
})
export default class Blocks {
  readonly blocks = blocks
  readonly components = blocks.flatMap((block) => block.components)
  readonly activeComponentIndex = signal(0)
  readonly activeComponent = computed(
    () => this.components[this.activeComponentIndex()]
  )
  readonly rotationPaused = signal(false)
  readonly commandHovered = signal(false)
  readonly commandFocused = signal(false)
  readonly copyState = signal<'idle' | 'copied' | 'error'>('idle')
  readonly toolbar = inject(ToolbarService)

  private readonly destroyRef = inject(DestroyRef)

  constructor() {
    afterNextRender(() => {
      const reducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      )
      this.rotationPaused.set(reducedMotion.matches)
      const onMotionChange = () => {
        if (reducedMotion.matches) this.rotationPaused.set(true)
      }
      reducedMotion.addEventListener('change', onMotionChange)
      const interval = window.setInterval(() => {
        if (
          this.components.length < 2 ||
          this.rotationPaused() ||
          this.commandHovered() ||
          this.commandFocused() ||
          document.hidden
        )
          return

        this.activeComponentIndex.update(
          (index) => (index + 1) % this.components.length
        )
        this.copyState.set('idle')
      }, 3500)

      this.destroyRef.onDestroy(() => {
        window.clearInterval(interval)
        reducedMotion.removeEventListener('change', onMotionChange)
      })
    })
  }

  async copyCommand() {
    this.rotationPaused.set(true)
    this.copyState.set('idle')
    const component = this.activeComponent()
    if (!component || !navigator.clipboard) {
      this.copyState.set('error')
      return
    }

    try {
      await navigator.clipboard.writeText(
        `npx shadcn@latest add rawat9/ng-blocks/${component.slug}`
      )
      this.copyState.set('copied')
    } catch {
      this.copyState.set('error')
    }
  }
}
