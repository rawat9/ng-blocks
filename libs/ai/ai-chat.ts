import { Component, input } from '@angular/core'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea
} from '../ui/input-group'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { lucideMicVocal, lucidePlusCircle } from '@ng-icons/lucide'

@Component({
  selector: 'app-ai-chat',
  standalone: true,
  providers: [
    provideIcons({
      lucidePlusCircle,
      lucideMicVocal
    })
  ],
  template: `
    <div class="w-75">
      <div appInputGroup>
        <textarea
          appInputGroupTextarea
          placeholder="Ask AI anything"
          class="min-h-24"
        ></textarea>
        <div appInputGroupAddon align="block-end">
          <div class="flex items-center gap-1">
            <button appInputGroupButton variant="ghost" size="icon-xs">
              <ng-icon name="lucidePlusCircle" size="16" />
            </button>
            <button appInputGroupButton variant="ghost" size="icon-xs">
              <ng-icon name="lucideMicVocal" size="16" />
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  imports: [
    InputGroupTextarea,
    InputGroup,
    InputGroupButton,
    InputGroupAddon,
    NgIcon
  ]
})
export class AiChat {
  /**
   * Text to display with the shimmer effect
   */
  public readonly text = input('Thinking')
}
