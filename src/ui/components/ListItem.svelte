<script lang="ts">
    import type {ComponentProps} from 'svelte'
    import Icon from './Icon.svelte'

    export let label: string | undefined = undefined
    export let onClick: () => void = () => {}
    export let leadingIcon: ComponentProps<Icon>['name'] | undefined = undefined
    export let trailingIcon: ComponentProps<Icon>['name'] | undefined | null = 'chevron-right'
    export let logo: string | undefined = undefined
    export let value: string | undefined = undefined
</script>

<li>
    <slot>
        <button on:click={onClick}>
            <div class="leading">
                {#if logo}
                    <div class="logo">
                        <img src={logo} alt={`${label} logo`} />
                    </div>
                {:else if leadingIcon}
                    <div class="icon">
                        <Icon name={leadingIcon} />
                    </div>
                {/if}
            </div>

            <span class="label">{label}</span>

            {#if value}
                <span class="value">{value}</span>
            {/if}

            {#if trailingIcon}
                <div class="trailing">
                    <Icon name={trailingIcon} />
                </div>
            {/if}
        </button>
    </slot>
</li>

<style lang="scss">
    li {
        display: flex;
        height: calc(var(--space-l) * 2); // 48px
        align-items: center;
        color: var(--body-text-color);
        font-size: var(--fs-1);
        font-weight: 500;
    }

    li:not(:last-child) {
        border-bottom: 1px solid var(--list-divider-color);
    }

    button {
        flex: 1;
        height: 100%;
        display: flex;
        align-items: center;
        cursor: pointer;
        border: none;
        background: none;
        color: inherit;
        font-size: inherit;
        font-weight: inherit;
        margin: 0;
    }

    .leading > * {
        display: grid;
        place-content: center;
        inline-size: var(--space-xl);
    }

    .leading img {
        max-inline-size: 30px;
        max-block-size: 30px;
        object-fit: contain;
    }

    .trailing {
        opacity: 0.2;
        padding-inline-end: var(--space-s);
    }

    li:hover {
        background: var(--list-item-background-color-hover);

        & .trailing {
            opacity: 1;
        }
    }

    .label {
        flex: 1;
        text-align: start;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding-inline-start: var(--space-xs);
    }

    .value {
        font-weight: 400;
        padding-inline-end: var(--space-xs);
    }
</style>
