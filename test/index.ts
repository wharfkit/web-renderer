// export library
export * from '../src/index'

// default export is WebRenderer class for convenience
import WebRenderer from '../src/index'
export default WebRenderer

// expose dependencies
export * from '@wharfkit/session'
export * from '@wharfkit/transact-plugin-autocorrect'
export * from '@wharfkit/transact-plugin-cosigner'
export * from '@wharfkit/transact-plugin-explorerlink'
export * from '@wharfkit/transact-plugin-finality-callback'
export * from '@wharfkit/transact-plugin-finality-checker'
export * from '@wharfkit/transact-plugin-mock'
export * from '@wharfkit/transact-plugin-resource-provider'
export * from '@wharfkit/wallet-plugin-anchor'
export * from '@wharfkit/wallet-plugin-cleos'
export * from '@wharfkit/wallet-plugin-cloudwallet'
export * from '@wharfkit/wallet-plugin-mock'
export * from '@wharfkit/wallet-plugin-privatekey'
