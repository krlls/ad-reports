import { App } from './modules/App'
import { serverConfig } from './config'

// eslint-disable-next-line no-console
App.listen(serverConfig.port, () => console.log(`✅  The server is running at http://localhost:${serverConfig.port}/`))
