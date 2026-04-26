import { render } from '@analogjs/router/server'
import '@angular/platform-server/init'

import { config } from './app.config.server'
import Blocks from './app/pages/(blocks).page'

export default render(Blocks, config)
