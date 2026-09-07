import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  signal,
  viewChild
} from '@angular/core'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { lucidePause, lucidePlay } from '@ng-icons/lucide'
import { simpleAngular } from '@ng-icons/simple-icons'

@Component({
  selector: 'app-angular-blocks-3d',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIcon],
  viewProviders: [provideIcons({ simpleAngular, lucidePause, lucidePlay })],
  host: {
    '[class.animation-paused]': 'paused() || !visible()'
  },
  template: `
    <div class="blocks-visual">
      <div
        #scene
        class="scene"
        role="img"
        aria-label="Eight three-dimensional building blocks assemble into a cube, with the Angular logo on a cyan block."
      >
        <div class="ground-shadow" aria-hidden="true"></div>
        <div #rotation class="pointer-rotation" aria-hidden="true">
          <div class="assembly">
            @for (block of blocks; track $index) {
              <div
                class="cube"
                [class.angular-cube]="block.angular"
                [style.--x]="block.x + 'px'"
                [style.--y]="block.y + 'px'"
                [style.--z]="block.z + 'px'"
              >
                <div class="face front">
                  @if (block.angular) {
                    <ng-icon name="simpleAngular" size="52" />
                  }
                </div>
                <div class="face back"></div>
                <div class="face right"></div>
                <div class="face left"></div>
                <div class="face top"></div>
                <div class="face bottom"></div>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  `,
  styles: `
    :host {
      --cube-size: 92px;
      --cube-half: calc(var(--cube-size) / 2);
      --face-front: color-mix(in oklab, var(--background), var(--muted) 70%);
      --face-top: var(--background);
      --face-side: color-mix(in oklab, var(--muted), var(--foreground) 10%);
      --face-edge: color-mix(in oklab, var(--border), var(--foreground) 8%);
      --ground-shadow: color-mix(in oklab, var(--foreground), transparent 89%);
      display: block;
      min-width: 0;
    }

    :host-context(.dark) {
      --face-front: var(--muted);
      --face-top: color-mix(in oklab, var(--muted), var(--foreground) 12%);
      --face-side: color-mix(in oklab, var(--muted), var(--background) 40%);
      --face-edge: color-mix(in oklab, var(--muted), var(--foreground) 18%);
      --ground-shadow: color-mix(in oklab, var(--background), transparent 35%);
    }

    .blocks-visual {
      position: relative;
    }

    .scene {
      position: relative;
      height: 420px;
      perspective: 1100px;
    }

    .pointer-rotation {
      position: absolute;
      top: 46%;
      left: 50%;
      transform-style: preserve-3d;
    }

    .assembly {
      transform: rotateX(-24deg) rotateY(-35deg);
      transform-style: preserve-3d;
    }

    .cube {
      position: absolute;
      top: calc(-1 * var(--cube-half));
      left: calc(-1 * var(--cube-half));
      width: var(--cube-size);
      height: var(--cube-size);
      transform: translate3d(var(--x), var(--y), var(--z));
      transform-style: preserve-3d;
    }

    .face {
      position: absolute;
      inset: 0;
      display: grid;
      place-items: center;
      border: 1px solid var(--face-edge);
      border-radius: 4px;
      background: var(--face-front);
      backface-visibility: hidden;
      box-shadow: inset 0 0 0 3px
        color-mix(in oklab, var(--face-top), transparent 75%);
    }

    .front {
      transform: translateZ(var(--cube-half));
    }
    .back {
      transform: rotateY(180deg) translateZ(var(--cube-half));
    }
    .right {
      background: var(--face-side);
      transform: rotateY(90deg) translateZ(var(--cube-half));
    }
    .left {
      background: var(--face-side);
      transform: rotateY(-90deg) translateZ(var(--cube-half));
    }
    .top {
      background: var(--face-top);
      transform: rotateX(90deg) translateZ(var(--cube-half));
    }
    .bottom {
      background: var(--face-side);
      transform: rotateX(-90deg) translateZ(var(--cube-half));
    }

    .angular-cube {
      --face-front: var(--color-cyan-800);
      --face-top: var(--color-cyan-700);
      --face-side: var(--color-cyan-900);
      --face-edge: color-mix(
        in oklab,
        var(--color-cyan-900),
        var(--color-cyan-300) 20%
      );
      color: var(--color-cyan-50);
    }

    .ground-shadow {
      position: absolute;
      bottom: 50px;
      left: 15%;
      width: 70%;
      height: 38px;
      border-radius: 50%;
      background: radial-gradient(
        ellipse,
        var(--ground-shadow),
        transparent 70%
      );
    }

    .motion-control {
      position: absolute;
      right: 0;
      bottom: 0;
      color: var(--muted-foreground);
    }

    .motion-control:focus-visible {
      outline: 2px solid var(--foreground);
      outline-offset: 4px;
    }

    /* Separation reveals the individual blocks before they reconnect. */
    @keyframes assemble {
      0%,
      15%,
      85%,
      100% {
        transform: translate3d(var(--x), var(--y), var(--z));
      }
      45%,
      55% {
        transform: translate3d(
          calc(var(--x) * 1.5),
          calc(var(--y) * 1.5),
          calc(var(--z) * 1.5)
        );
      }
    }

    @keyframes turn {
      0%,
      15%,
      85%,
      100% {
        transform: rotateX(-24deg) rotateY(-35deg);
      }
      45%,
      55% {
        transform: rotateX(-20deg) rotateY(-43deg);
      }
    }

    @media (prefers-reduced-motion: no-preference) {
      .pointer-rotation {
        transform: rotateX(var(--pointer-x, 0deg))
          rotateY(var(--pointer-y, 0deg));
        transition: transform 220ms ease-out;
      }
      .cube {
        animation: assemble 9s cubic-bezier(0.45, 0, 0.2, 1) infinite;
      }
      .assembly {
        animation: turn 9s cubic-bezier(0.45, 0, 0.2, 1) infinite;
      }
      :host(.animation-paused) .cube,
      :host(.animation-paused) .assembly {
        animation-play-state: paused;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .motion-control {
        display: none;
      }
    }

    @media (max-width: 1023px) {
      .scene {
        height: 360px;
        perspective: 1400px;
      }
      .pointer-rotation {
        scale: 0.8;
      }
    }

    @media (max-width: 767px) {
      .scene {
        height: 340px;
      }
    }

    @media (max-width: 374px) {
      .pointer-rotation {
        scale: 0.65;
      }
    }
  `
})
export class AngularBlocks3d {
  protected readonly paused = signal(false)
  protected readonly visible = signal(false)
  protected readonly blocks = [-1, 1].flatMap((z) =>
    [-1, 1].flatMap((y) =>
      [-1, 1].map((x) => ({
        x: x * 51,
        y: y * 51,
        z: z * 51,
        angular: x === 1 && y === -1 && z === 1
      }))
    )
  )

  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef)
  private readonly scene = viewChild.required<ElementRef<HTMLElement>>('scene')
  private readonly rotation =
    viewChild.required<ElementRef<HTMLElement>>('rotation')
  private readonly destroyRef = inject(DestroyRef)

  constructor() {
    afterNextRender(() => {
      const scene = this.scene().nativeElement
      const rotation = this.rotation().nativeElement
      const hoverMotion = window.matchMedia(
        '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)'
      )
      let frame: number | undefined
      let pointerX = 0
      let pointerY = 0

      // Keep pointer updates outside Angular and compose them with the idle rotation.
      const updateRotation = () => {
        frame = undefined
        const bounds = scene.getBoundingClientRect()
        const x = Math.max(
          -1,
          Math.min(1, ((pointerX - bounds.left) / bounds.width) * 2 - 1)
        )
        const y = Math.max(
          -1,
          Math.min(1, ((pointerY - bounds.top) / bounds.height) * 2 - 1)
        )
        rotation.style.setProperty('--pointer-x', `${-y * 12}deg`)
        rotation.style.setProperty('--pointer-y', `${x * 20}deg`)
      }
      const onPointerMove = (event: PointerEvent) => {
        if (!hoverMotion.matches || event.pointerType === 'touch') return
        pointerX = event.clientX
        pointerY = event.clientY
        frame ??= window.requestAnimationFrame(updateRotation)
      }
      const resetRotation = () => {
        if (frame !== undefined) window.cancelAnimationFrame(frame)
        frame = undefined
        rotation.style.setProperty('--pointer-x', '0deg')
        rotation.style.setProperty('--pointer-y', '0deg')
      }

      scene.addEventListener('pointermove', onPointerMove, { passive: true })
      scene.addEventListener('pointerleave', resetRotation)
      scene.addEventListener('pointercancel', resetRotation)
      hoverMotion.addEventListener('change', resetRotation)

      const observer = new IntersectionObserver(([entry]) => {
        this.visible.set(entry.isIntersecting)
        if (!entry.isIntersecting) resetRotation()
      })
      observer.observe(this.element.nativeElement)
      this.destroyRef.onDestroy(() => {
        observer.disconnect()
        resetRotation()
        scene.removeEventListener('pointermove', onPointerMove)
        scene.removeEventListener('pointerleave', resetRotation)
        scene.removeEventListener('pointercancel', resetRotation)
        hoverMotion.removeEventListener('change', resetRotation)
      })
    })
  }
}
