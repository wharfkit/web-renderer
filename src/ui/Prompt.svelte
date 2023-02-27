<script lang="ts">
    import {ComponentType, createEventDispatcher, SvelteComponentTyped} from 'svelte'
    import {derived} from 'svelte/store'

    import Accept from './components/Accept.svelte'
    import Asset from './components/Asset.svelte'
    import Button from './components/Button.svelte'
    import Countdown from './components/Countdown.svelte'
    import Qr from './components/Qr.svelte'

    import {prompt} from './state'

    interface UIComponent {
        component: ComponentType<SvelteComponentTyped>
        props: Record<string, unknown>
    }

    const elements = derived(prompt, ($prompt) => {
        const components: UIComponent[] = []
        if ($prompt) {
            $prompt.args.elements.forEach((element) => {
                switch (element.type) {
                    case 'accept': {
                        components.push({
                            component: Accept,
                            props: {
                                data: element.data,
                            },
                        })
                        break
                    }
                    case 'asset': {
                        components.push({
                            component: Asset,
                            props: {
                                data: element.data,
                            },
                        })
                        break
                    }
                    case 'button': {
                        components.push({
                            component: Button,
                            props: {
                                data: element.data,
                            },
                        })
                        break
                    }
                    case 'qr': {
                        components.push({
                            component: Qr,
                            props: {
                                data: element.data,
                            },
                        })
                        break
                    }
                    case 'countdown': {
                        components.push({
                            component: Countdown,
                            props: {
                                data: element.data,
                            },
                        })
                        break
                    }
                    default: {
                        throw new Error(`Unknown element type: ${element.type}`)
                    }
                }
            })
        }
        return components
    })

    const dispatch = createEventDispatcher<{
        complete: void
        cancel: void
    }>()
</script>

<div>
    <h3>{$prompt?.args.title}</h3>
    <p>{$prompt?.args.body}</p>
    {#each $elements as component}
        <div>
            <svelte:component
                this={component.component}
                on:complete={() => dispatch('complete')}
                on:cancel={() => dispatch('cancel')}
                {...component.props}
            />
        </div>
    {/each}
</div>
