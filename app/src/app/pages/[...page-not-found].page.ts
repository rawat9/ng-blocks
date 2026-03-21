import type { RouteMeta } from '@analogjs/router'
import { Component } from '@angular/core'
import { RouterLink } from '@angular/router'
import { Button } from '../../components/ui/button'

export const routeMeta: RouteMeta = {
  title: 'Page not found',
}

@Component({
  selector: 'app-not-found',
  imports: [RouterLink, Button],
  host: {
    class: 'h-full flex flex-col items-center justify-center',
  },
  template: `
    <div class="-mt-[25%] mb-8 flex gap-4 items-center">
      <h1 class="text-4xl font-bold">404</h1>
      <p class="text-gray-500">This page could not be found</p>
    </div>
    <a routerLink="/" size="sm" appButton class="text-xs" variant="link"
      >Back home</a
    >
  `,
})
export default class PageNotFound {}
