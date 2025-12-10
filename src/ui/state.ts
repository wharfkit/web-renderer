import {
    BrowserLocalStorage,
    Checksum256Type,
    CreateAccountContext,
    LoginContext,
    PermissionLevelType,
    PromptArgs,
    TransactContext,
    UserInterfaceAccountCreationResponse,
    UserInterfaceLoginResponse,
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

    accountCreationContext.set(undefined)
    accountCreationPromise.set(undefined)
    accountCreationResponse.set({...defaultAccountCreationResponse})

    errorDetails.set(undefined)
    backAction.set(undefined)
    transitionDirection.set(undefined)

    // Session Key
    sessionKeyConsentData.set(undefined)
    sessionKeyConsentPromise.set(undefined)
    sessionKeyConflictData.set(undefined)
    sessionKeyConflictPromise.set(undefined)
    sessionKeyMismatchData.set(undefined)
    sessionKeyMismatchPromise.set(undefined)
    sessionKeyRemoveData.set(undefined)
    sessionKeyRemovePromise.set(undefined)
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
export const loginResponse = writable<UserInterfaceLoginData>({...defaultLoginResponse})

// Account Creation

export interface AccountCreationPromise {
    reject: (error: Error) => void
    resolve: (response: UserInterfaceAccountCreationResponse) => void
}

export const defaultAccountCreationResponse: UserInterfaceAccountCreationResponse = {
    chain: undefined,
    pluginId: undefined,
}

export const accountCreationContext = writable<CreateAccountContext | undefined>(undefined)
export const accountCreationResponse = writable<UserInterfaceAccountCreationResponse>({
    ...defaultAccountCreationResponse,
})
export const accountCreationPromise = writable<AccountCreationPromise | undefined>(undefined)

export const errorDetails = writable<string | undefined>(undefined)

export const backAction = writable<(() => void) | undefined>(undefined)

export const transitionDirection = writable<TransitionDirection | undefined>(undefined)

// Session Key

export interface SessionKeyConsentData {
    appName: string
    whitelist: Array<{contract: string; actions?: string[]}>
}

export interface SessionKeyConflictData {
    appName: string
    existingKeyCount: number
}

export interface SessionKeyMismatchData {
    appName: string
    added: Array<{contract: string; actions?: string[]}>
    removed: Array<{contract: string; actions?: string[]}>
}

export interface SessionKeyConsentPromise {
    reject: (error: Error) => void
    resolve: (approved: boolean) => void
}

export interface SessionKeyConflictPromise {
    reject: (error: Error) => void
    resolve: (choice: 'add' | 'replace' | 'cancel') => void
}

export interface SessionKeyMismatchPromise {
    reject: (error: Error) => void
    resolve: (choice: 'update' | 'dismiss') => void
}

export interface SessionKeyRemoveData {
    appName: string
}

export interface SessionKeyRemovePromise {
    reject: (error: Error) => void
    resolve: (confirmed: boolean) => void
}

export const sessionKeyConsentData = writable<SessionKeyConsentData | undefined>(undefined)
export const sessionKeyConsentPromise = writable<SessionKeyConsentPromise | undefined>(undefined)

export const sessionKeyConflictData = writable<SessionKeyConflictData | undefined>(undefined)
export const sessionKeyConflictPromise = writable<SessionKeyConflictPromise | undefined>(undefined)

export const sessionKeyMismatchData = writable<SessionKeyMismatchData | undefined>(undefined)
export const sessionKeyMismatchPromise = writable<SessionKeyMismatchPromise | undefined>(undefined)

export const sessionKeyRemoveData = writable<SessionKeyRemoveData | undefined>(undefined)
export const sessionKeyRemovePromise = writable<SessionKeyRemovePromise | undefined>(undefined)
