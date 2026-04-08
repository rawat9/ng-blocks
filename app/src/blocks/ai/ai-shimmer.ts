import { Component, input } from '@angular/core'

@Component({
  selector: 'app-ai-shimmer',
  standalone: true,
  template: `
    <div class="inline-block relative overflow-hidden">
      <span
        class="shimmer-text text-4xl font-medium"
        [style.animation-duration.s]="duration()"
        >{{ text() }}</span
      >
    </div>
  `,
  styles: [
    `
      .shimmer-text {
        background: linear-gradient(
          90deg,
          #a0a0a0 0%,
          #e0e0e0 20%,
          #ffffff 40%,
          #e0e0e0 60%,
          #a0a0a0 100%
        );
        background-size: 200% auto;
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        animation: shimmer 4s linear infinite;
      }

      @keyframes shimmer {
        0% {
          background-position: 200% center;
        }
        100% {
          background-position: -200% center;
        }
      }
    `,
  ],
})
export class AiShimmer {
  /**
   * Text to display with the shimmer effect
   */
  public readonly text = input('Thinking')

  /**
   * Duration of the shimmer animation in seconds
   *
   * @default 4
   */
  public readonly duration = input(4)
}
