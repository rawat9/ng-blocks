import { bootstrapApplication } from '@angular/platform-browser'

import { appConfig } from './app.config'
import Blocks from './app/pages/(blocks).page'

bootstrapApplication(Blocks, appConfig).catch((err) => console.error(err))
