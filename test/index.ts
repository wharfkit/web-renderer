// export library
export * from '../src/index'

// default export is WebUIRenderer class for convenience
import WebUIRenderer from '../src/index'
export default WebUIRenderer

// expose dependencies
export * from '@wharfkit/session'
export * from '@wharfkit/transact-plugin-autocorrect'
// export * from '@wharfkit/wallet-plugin-anchor'
export * from '@wharfkit/wallet-plugin-mock'
export * from '@wharfkit/wallet-plugin-privatekey'
export * from '@wharfkit/wallet-plugin-wax'
