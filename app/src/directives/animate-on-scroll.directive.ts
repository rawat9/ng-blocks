import {
  Directive,
  ElementRef,
  inject,
  input,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  signal,
} from '@angular/core'
import { isPlatformBrowser } from '@angular/common'

@Directive({
  selector: '[appAnimateOnScroll]',
  host: {
    '[class.animate-visible]': 'isVisible()',
    '[style.--animation-delay]': 'delay()',
  },
})
export class AnimateOnScrollDirective implements OnInit, OnDestroy {
  private readonly el = inject(ElementRef)
  private readonly platformId = inject(PLATFORM_ID)
  private observer: IntersectionObserver | null = null

  /** Animation delay in milliseconds */
  delay = input('0ms')

  /** Threshold for triggering animation (0-1) */
  threshold = input(0.1)

  isVisible = signal(false)

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.isVisible.set(true)
            this.observer?.unobserve(entry.target)
          }
        })
      },
      { threshold: this.threshold() },
    )

    this.observer.observe(this.el.nativeElement)
  }

  ngOnDestroy(): void {
    this.observer?.disconnect()
  }
}
