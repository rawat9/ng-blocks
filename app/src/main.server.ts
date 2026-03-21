import { render } from '@analogjs/router/server'
import '@angular/platform-server/init'

import { config } from './app.config.server'
import { App } from './app/app'

export default render(App, config)
