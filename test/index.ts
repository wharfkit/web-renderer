// export library
export * from '../src/index-module'

// default export is Link class for convenience
import {WharfKitWeb} from '../src/index-module'
export default WharfKitWeb

// expose dependencies
export * from '@wharfkit/session'
