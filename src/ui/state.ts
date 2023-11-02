import {
    BrowserLocalStorage,
    Checksum256Type,
    LoginContext,
    PermissionLevelType,
    PromptArgs,
    TransactContext,
    UserInterfaceLoginResponse,
    CreateAccountContext,
    UserInterfaceAccountCreationResponse
} from '@wharfkit/session'
import type {Theme, TransitionDirection} from '../types'
import {get, writable, Writable} from 'svelte/store'

// Reset data in all stores
export function resetState() {
    active.set(false)

    router.set({...defaultUserInterfaceRouter})
    props.set({...defaultUserInterfaceProps})
    prompt.reset()

    cancelablePromises.set([])
    transactContext.set(undefined)

    loginContext.set(undefined)
    loginPromise.set(undefined)
    loginResponse.set({...defaultLoginResponse})

    errorDetails.set(undefined)
    backAction.set(undefined)
    transitionDirection.set(undefined)
}

/** Whether or not the interface is active in the browser */
export const active = writable<boolean>(false)

/** Whether or not the settings button should be visable/usable */
export const allowSettings = writable(false)

/** Persistent settings svelte store */
export interface UserInterfaceSettings {
    language: string
    theme: Theme | undefined
    animations: boolean
}

export const defaultUserInterfaceSettings: UserInterfaceSettings = {
    language: '',
    theme: undefined,
    animations: true,
}

export function makeSettingsStore(data = defaultUserInterfaceSettings) {
    const store = writable(data)
    const {subscribe, set} = store

    let storage
    if (typeof localStorage !== 'undefined') {
        storage = new BrowserLocalStorage('web.renderer')
        storage.read('settings').then((existing) => {
            if (existing) {
                set(JSON.parse(existing))
            }
        })
    }

    return {
        subscribe,
        set: (n) => {
            if (storage) {
                storage.write('settings', JSON.stringify(n))
            }
            set(n)
        },
        update: (cb) => {
            const updatedStore = cb(get(store))
            if (storage) {
                storage.write('settings', JSON.stringify(updatedStore))
            }
            set(updatedStore)
        },
    }
}

export const settings: Writable<UserInterfaceSettings> = makeSettingsStore()

/** The properties of the UserInterface */
export interface UserInterfaceProps {
    error?: Error
    title: string
    subtitle?: string
}

export const defaultUserInterfaceProps: UserInterfaceProps = {
    title: 'Wharf',
    subtitle: 'Status Message',
}

export const props = writable<UserInterfaceProps>(defaultUserInterfaceProps)

/** The router for the sections of the UserInterface */
export interface UserInterfaceRouter {
    path: string
    history: string[]
}

export const defaultUserInterfaceRouter: UserInterfaceRouter = {
    path: '',
    history: [],
}

export interface Router extends Writable<UserInterfaceRouter> {
    back: () => void
    push: (path: string) => void
}

export const initRouter = (): Router => {
    const {set, subscribe, update} = writable<UserInterfaceRouter>(defaultUserInterfaceRouter)
    return {
        // Method to go one back in history
        back: () =>
            update((current: UserInterfaceRouter) => ({
                ...current,
                path: current.history[current.history.length - 1],
                history: current.history.slice(0, -1),
            })),
        // Push a new path on to history
        push: (path: string) =>
            update((current) => ({
                ...current,
                path,
                history: [...current.history, current.path],
            })),
        set,
        subscribe,
        update,
    }
}

export const router = initRouter()

/** Cancelable promises that the router needs to track in order to cancel on quit */
type CancelCallback = (reason: string, silent: boolean) => void
export const cancelablePromises = writable<CancelCallback[]>([])

export const transactContext = writable<TransactContext | undefined>(undefined)

export type UserInterfacePrompt = {
    args: PromptArgs
    reject: (error: Error) => void
    resolve: (response: UserInterfaceLoginResponse) => void
}

export interface Prompt extends Writable<UserInterfacePrompt | undefined> {
    reset: () => void
}

export const initPrompt = (): Prompt => {
    const {set, subscribe, update} = writable<UserInterfacePrompt | undefined>(undefined)
    return {
        reset: () => set(undefined),
        set,
        subscribe,
        update,
    }
}

export const prompt = initPrompt()

export interface UserInterfaceLoginData {
    chainId?: Checksum256Type
    permissionLevel?: PermissionLevelType
    walletPluginIndex?: number
}

export interface LoginPromise {
    reject: (error: Error) => void
    resolve: (response: UserInterfaceLoginResponse) => void
}

export const defaultLoginResponse = {
    chainId: undefined,
    permissionLevel: undefined,
    walletPluginIndex: undefined,
}

export const loginContext = writable<LoginContext | undefined>(undefined)
export const loginPromise = writable<LoginPromise | undefined>(undefined)
export const loginResponse = writable<UserInterfaceLoginData>({ ...defaultLoginResponse })


// Account Creation

export interface AccountCreationPromise {
    reject: (error: Error) => void
    resolve: (response: UserInterfaceAccountCreationResponse) => void
}

export const defaultAccountCreationResponse = {
    chain: undefined,
    chains: [],
    pluginId: undefined,
}

export const accountCreationContext = writable<CreateAccountContext | undefined>(undefined)
export const accountCreationResponse = writable<UserInterfaceAccountCreationResponse>({ ...defaultAccountCreationResponse })
export const accountCreationPromise = writable<AccountCreationPromise | undefined>(undefined)

export const errorDetails = writable<string | undefined>(undefined)

export const backAction = writable<Function | undefined>(undefined)

export const transitionDirection = writable<TransitionDirection | undefined>(undefined)
