<script lang="ts">
    import type {ComponentProps} from 'svelte'
    import Icon from './Icon.svelte'

    export let label: string | undefined
    export let onClick
    export let leadingIcon: ComponentProps<Icon>['name'] | undefined = undefined
    export let trailingIcon: ComponentProps<Icon>['name'] | undefined = 'chevron-right'
    export let logo: string | undefined = undefined
</script>

<li>
    <button on:click={onClick}>
        {#if logo}
            <img class="logo leading" src={logo} alt={''} width="32" height="32" />
        {:else if leadingIcon}
            <div class="icon leading">
                <Icon name={leadingIcon} />
            </div>
        {/if}

        <span>{label}</span>

        {#if trailingIcon}
            <div class="icon trailing">
                <Icon name={trailingIcon} />
            </div>
        {/if}
    </button>
</li>

<style lang="scss">
    li {
        display: flex;
    }

    li:not(:last-child) button {
        border-bottom: 1px solid var(--list-divider-color);
    }

    li button {
        flex: 1;
        display: flex;
        align-items: center;
        gap: var(--space-s);
        cursor: pointer;
        border: none;
        background: none;
        color: var(--body-text-color);
        font-size: var(--fs-1);
        font-weight: 500;
        padding-block: var(--space-s);
    }

    :is(.icon, .logo).leading {
        flex-basis: var(--space-xl);
        display: grid;
        place-content: center;
    }

    .icon.trailing {
        opacity: 0.2;
    }

    li button:hover {
        background: var(--list-item-background-color-hover);

        & .icon.trailing {
            opacity: 1;
        }
    }

    span {
        flex: 1;
        text-align: start;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
</style>
