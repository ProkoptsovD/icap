/* Core */
import { tablesApi } from './api/tablesApi'
import { authApi } from './api/authApi'

const middleware = [tablesApi.middleware, authApi.middleware]

export { middleware }
