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
    <a href="#main-content" class="skip-link">Skip to content</a>

    <header class="border-border border-b">
      <div class="page-width flex h-18 items-center justify-between gap-6">
        <a routerLink="/" class="text-xl font-bold tracking-tight">ng-blocks</a>
        <nav
          aria-label="Blocks navigation"
          class="hidden items-center gap-7 md:flex"
        >
          @for (block of blocks; track block.route) {
            <a
              [routerLink]="block.route"
              class="text-muted-foreground hover:text-foreground text-sm"
              >{{ block.title }}</a
            >
          }
        </nav>
        <div class="flex items-center gap-2">
          <button
            appButton
            variant="ghost"
            size="icon"
            aria-label="Toggle color theme"
            (click)="toolbar.toggleTheme()"
          >
            <span class="dark:hidden">
              <ng-icon name="lucideMoon" size="17" aria-hidden="true" />
            </span>
            <span class="hidden dark:block">
              <ng-icon name="lucideSun" size="17" aria-hidden="true" />
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
              class="flex size-10 cursor-pointer list-none items-center justify-center rounded-md"
              aria-label="Blocks navigation"
            >
              <ng-icon name="lucideMenu" size="20" aria-hidden="true" />
            </summary>
            <nav aria-label="Mobile blocks navigation" class="mobile-nav">
              @for (block of blocks; track block.route) {
                <a
                  [routerLink]="block.route"
                  class="hover:bg-muted block rounded-md px-4 py-3 text-sm"
                  (click)="mobileMenu.open = false"
                  >{{ block.title }}</a
                >
              }
            </nav>
          </details>
        </div>
      </div>
    </header>

    <main id="main-content" class="page-width">
      <section aria-labelledby="hero-title" class="hero-grid">
        <div class="min-w-0">
          <p class="mb-5 text-sm font-medium text-cyan-800 dark:text-cyan-300">
            Built with Angular Aria
          </p>
          <h1 id="hero-title" class="hero-title">
            Angular blocks,<br />ready to build.
          </h1>
          <p
            class="text-muted-foreground mt-6 max-w-md text-base leading-relaxed sm:text-lg"
          >
            Accessible components, ready to copy into real products. Make them
            yours with Angular and Tailwind CSS.
          </p>
          <div class="mt-8 flex flex-wrap items-center gap-3">
            <a appButton size="lg" href="#collections" class="hero-cta">
              Explore the library
              <ng-icon name="lucideArrowRight" size="16" aria-hidden="true" />
            </a>
            <a
              appButton
              size="lg"
              variant="outline"
              class="hero-cta"
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

      <section aria-label="Install a component" class="install-strip">
        <div>
          <h2 class="text-sm font-semibold">One command. Your code.</h2>
          <p class="text-muted-foreground mt-1 text-sm">
            Add a block directly to your project.
          </p>
        </div>
        @if (activeComponent(); as component) {
          <div class="min-w-0">
            <div
              class="command-box"
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
        class="py-12 md:py-16"
      >
        <div class="mb-8">
          <h2
            id="collections-title"
            class="text-2xl font-semibold tracking-tight sm:text-3xl"
          >
            Find your next building block.
          </h2>
          <p class="text-muted-foreground mt-3 text-sm">
            {{ blocks.length }} collections. {{ components.length }} components.
            Pick what your project needs.
          </p>
        </div>
        <div class="collection-grid">
          @for (block of blocks; track block.route) {
            <a [routerLink]="block.route" class="collection-link">
              <div class="collection-copy">
                <h3 class="text-base font-semibold tracking-tight">
                  {{ block.title }}
                </h3>
                <p class="text-muted-foreground text-sm leading-relaxed">
                  {{ block.description }}
                </p>
              </div>
              <div class="collection-image">
                <img
                  [src]="block.image"
                  alt=""
                  width="600"
                  height="375"
                  loading="lazy"
                  class="h-full w-full object-contain dark:hidden"
                />
                <img
                  [src]="block.darkImage"
                  alt=""
                  width="600"
                  height="375"
                  loading="lazy"
                  class="hidden h-full w-full object-contain dark:block"
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
        class="page-width flex flex-col gap-2 py-7 text-sm sm:flex-row sm:items-center sm:justify-between"
      >
        <a routerLink="/" class="font-semibold tracking-tight">ng-blocks</a>
        <p class="text-muted-foreground">
          Built with Angular Aria and Tailwind CSS.
        </p>
      </div>
    </footer>
  `,
  styles: `
    :host {
      display: block;
    }

    .page-width {
      width: min(100% - 3rem, 1200px);
      margin-inline: auto;
    }

    a:focus-visible,
    button:focus-visible,
    summary:focus-visible {
      outline: 2px solid var(--foreground);
      outline-offset: 5px;
    }

    .skip-link {
      position: absolute;
      top: 1rem;
      left: 1rem;
      padding: 0.75rem 1rem;
      background: var(--background);
      transform: translateY(-200%);
      z-index: 2;
    }

    .skip-link:focus {
      transform: translateY(0);
    }

    /* The only overlay is the mobile menu; collection frames use nested radii. */
    .mobile-nav {
      position: absolute;
      top: 3rem;
      right: 0;
      z-index: 1;
      width: 15rem;
      padding: 0.5rem;
      border: 1px solid var(--border);
      border-radius: 12px;
      background: var(--background);
    }

    summary::-webkit-details-marker {
      display: none;
    }

    .hero-grid {
      display: grid;
      grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
      align-items: center;
      gap: 4rem;
      padding-block: 5rem;
    }

    .hero-title {
      font-size: clamp(2.5rem, 4.3vw, 3.75rem);
      font-weight: 650;
      letter-spacing: -0.055em;
      line-height: 1.08;
    }

    .hero-cta {
      min-height: 2.75rem;
      padding-inline: 1.1rem;
    }

    .install-strip {
      display: grid;
      grid-template-columns: minmax(0, 1fr) minmax(0, 2fr);
      align-items: center;
      gap: 2rem;
      padding-block: 1.75rem;
      border-block: 1px solid var(--border);
    }

    .command-box {
      display: flex;
      align-items: center;
      border: 1px solid var(--border);
      border-radius: 12px;
      background: var(--background);
    }

    #collections {
      scroll-margin-top: 2rem;
    }

    .collection-grid {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 1.5rem;
    }

    .collection-link {
      position: relative;
      display: flex;
      flex-direction: column;
      min-width: 0;
      overflow: hidden;
      padding: 3px;
      border: 1px solid var(--border);
      border-radius: 20px;
      background: var(--container);
    }

    .collection-link::before {
      position: absolute;
      inset: 3px;
      border: 1px solid var(--border);
      border-radius: 16px;
      content: '';
      pointer-events: none;
    }

    .collection-link:hover {
      border-color: var(--muted-foreground);
    }

    .collection-image {
      aspect-ratio: 1.45;
      margin-top: auto;
      overflow: hidden;
      border: 1px solid var(--border);
      border-radius: 14px;
      background: var(--container);
    }

    .collection-image img {
      padding: 1rem;
    }

    .collection-copy {
      min-height: 6rem;
      padding: 1rem 1.5rem;
    }

    @media (max-width: 1199px) {
      .collection-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }

    @media (prefers-reduced-motion: no-preference) {
      .collection-image img,
      .hero-cta {
        transition: transform 180ms ease-out;
      }
      .collection-link:hover img {
        transform: scale(1.025);
      }
      .hero-cta:active {
        transform: scale(0.98);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      *,
      *::before,
      *::after {
        animation: none !important;
        transition: none !important;
      }
    }

    @media (max-width: 1023px) {
      .hero-grid {
        gap: 2rem;
        padding-block: 3.5rem;
      }
      .install-strip {
        grid-template-columns: 1fr;
        gap: 1rem;
      }
    }

    @media (max-width: 767px) {
      .page-width {
        width: calc(100% - 2rem);
      }
      .hero-grid {
        grid-template-columns: 1fr;
        gap: 2.5rem;
        padding-block: 2.5rem;
      }
      .hero-title {
        font-size: clamp(2.25rem, 8vw, 3.5rem);
      }
      .collection-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }
    }
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
