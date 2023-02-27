import {Name, PublicKey, Struct, UInt32, Weight} from '@wharfkit/session'

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
