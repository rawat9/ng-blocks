import { provideFileRouter, requestContextInterceptor } from '@analogjs/router'
import {
  provideHttpClient,
  withFetch,
  withInterceptors
} from '@angular/common/http'
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection
} from '@angular/core'
import { provideClientHydration } from '@angular/platform-browser'
import { withComponentInputBinding, withViewTransitions } from '@angular/router'
import { provideNgIconsConfig } from '@ng-icons/core'

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideFileRouter(withViewTransitions(), withComponentInputBinding()),
    provideClientHydration(),
    provideNgIconsConfig({
      size: '20px'
    }),
    provideHttpClient(
      withFetch(),
      withInterceptors([requestContextInterceptor])
    )
  ]
}
