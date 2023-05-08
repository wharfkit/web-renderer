<script lang="ts">
    import Icon from '../components/Icon.svelte'

    export let name: string
    export let value: string | undefined
    export let checked: boolean
    export let group: string | undefined
    export let onChange: () => void
    export let hidden: boolean
    export let label
</script>

<label>
    <slot>
        <input type="radio" {name} {value} {checked} {hidden} {group} on:change={onChange} />

        {label}

        {#if checked}
            <div class="trailing">
                <Icon name={'check'} />
            </div>
        {/if}
    </slot>
</label>

<style>
    label {
        flex: 1;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
        padding-inline: var(--space-s);
    }
</style>
