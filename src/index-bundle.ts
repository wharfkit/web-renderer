import * as pkg from './index'
const WebUIRenderer = pkg.default
for (const key of Object.keys(pkg)) {
    if (key === 'default') continue
    WebUIRenderer[key] = pkg[key]
}
export default WebUIRenderer
