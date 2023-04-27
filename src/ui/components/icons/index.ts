import Copy from './Copy.svelte'
import Check from './Check.svelte'
import Close from './CloseIcon.svelte'
import FileCode from './FileCode.svelte'
import Wharf from './Wharf.svelte'
import Login from './LogIn.svelte'
import ChevronRight from './ChevronRight.svelte'
import ChevronLeft from './ChevronLeft.svelte'
import Wallet from './Wallet.svelte'
import Expand from './Expand.svelte'

const icons = {
    copy: Copy,
    check: Check,
    close: Close,
    'file-code': FileCode,
    wharf: Wharf,
    login: Login,
    'chevron-right': ChevronRight,
    'chevron-left': ChevronLeft,
    wallet: Wallet,
    expand: Expand,
}

export type Icon = keyof typeof icons
export default icons
