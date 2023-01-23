import * as pkg from './index'
const WharfKitWeb = pkg.default
for (const key of Object.keys(pkg)) {
    if (key === 'default') continue
    WharfKitWeb[key] = pkg[key]
}
export default WharfKitWeb
