import {
    Cancelable,
    LoginContext,
    Name,
    PromptArgs,
    PublicKey,
    Struct,
    UInt32,
    UserInterfaceLoginResponse,
    Weight,
} from '@wharfkit/session'

export type ErrorProps = {
    id: 'error'
    error: Error
}

export type LoginProps = {
    id: 'login'
    context: LoginContext
    reject: (error: Error) => void
    resolve: (response: UserInterfaceLoginResponse) => void
}

export type PromptProps = {
    id: 'prompt'
    prompt: PromptArgs
    reject: (error: Error) => void
    resolve: (response: UserInterfaceLoginResponse) => void
}

export type UserInterfaceStateProps = ErrorProps | LoginProps | PromptProps

export interface UserInterfaceState {
    active: boolean
    cancelablePromises: Cancelable<UserInterfaceLoginResponse>[]
    path: string
    previousPaths: string[]
    title?: string
    props?: UserInterfaceStateProps
}

@Struct.type('get_accounts_by_authorizers')
export class GetAccountsByAuthorizersRow extends Struct {
    @Struct.field(Name) declare account_name: Name
    @Struct.field(Name) declare permission_name: Name
    @Struct.field(PublicKey) declare authorizing_key: PublicKey
    @Struct.field(Weight) declare weight: Weight
    @Struct.field(UInt32) declare threshold: UInt32
}

@Struct.type('get_accounts_by_authorizers')
export class GetAccountsByAuthorizers extends Struct {
    @Struct.field(GetAccountsByAuthorizersRow, {array: true})
    declare accounts: GetAccountsByAuthorizersRow[]
}
