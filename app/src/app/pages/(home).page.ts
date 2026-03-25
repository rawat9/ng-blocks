import { Component } from '@angular/core'
import { RouterLink } from '@angular/router'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { AnimateOnScrollDirective } from '../../directives'
import { lucideArrowRight, lucideCode } from '@ng-icons/lucide'
import { blocks } from '../../blocks/registry'
import { Button } from '../../components/ui/button'
import { Header } from '../../components/header/header'

@Component({
  selector: 'app-home',
  imports: [RouterLink, NgIcon, AnimateOnScrollDirective, Button, Header],
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
