import { ChangeDetectionStrategy, Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { Header } from '../components/header/header'

@Component({
  imports: [Header, RouterOutlet],
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main class="h-full">
      <app-header></app-header>
      <router-outlet></router-outlet>
    </main>
  `,
})
export class App {}
