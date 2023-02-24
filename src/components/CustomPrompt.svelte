<script lang="ts">
    import {ComponentType, createEventDispatcher, SvelteComponentTyped} from 'svelte'

    export let title: string
    export let body: string

    interface subcomponent {
        component: ComponentType<SvelteComponentTyped>
        props: Record<string, unknown>
    }

    export let components: subcomponent[]

    const dispatch = createEventDispatcher<{
        complete: void
        cancel: void
    }>()
</script>

<div>
    <h3>{title}</h3>
    <p>{body}</p>
    {#if components}
        {#each components as component}
            <div>
                <svelte:component
                    this={component.component}
                    on:complete={() => dispatch('complete')}
                    on:cancel={() => dispatch('cancel')}
                    {...component.props}
                />
            </div>
        {/each}
    {/if}
</div>
