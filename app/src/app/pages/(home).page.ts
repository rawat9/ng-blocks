import { Component } from '@angular/core'
import { RouterLink } from '@angular/router'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { AnimateOnScrollDirective } from '../../directives'
import { lucideArrowRight, lucideCode } from '@ng-icons/lucide'
import { blocks } from '../../blocks/registry'
import { Button } from '../../components/ui/button'

@Component({
  selector: 'app-home',
  imports: [RouterLink, NgIcon, AnimateOnScrollDirective, Button],
  providers: [
    provideIcons({
      lucideArrowRight,
      lucideCode,
    }),
  ],
  templateUrl: './(home).page.html',
})
export default class HomeComponent {
  readonly blocks = blocks
}
