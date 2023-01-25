// export library
export * from '../src/index-module'

// default export is Link class for convenience
import {WebUIRenderer} from '../src/index-module'
export default WebUIRenderer

// expose dependencies
export * from '@wharfkit/session'
