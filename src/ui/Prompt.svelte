<script lang="ts">
    import {ComponentType, createEventDispatcher, SvelteComponentTyped} from 'svelte'
    import {derived} from 'svelte/store'

    import Accept from './components/Accept.svelte'
    import Asset from './components/Asset.svelte'
    import Button from './components/Button.svelte'
    import Close from './components/Close.svelte'
    import Link from './components/Link.svelte'
    import Countdown from './components/Countdown.svelte'
    import Qr from './components/Qr.svelte'
    import Textarea from './components/Textarea.svelte'

    import {prompt} from './state'
    import BodyTitle from './components/BodyTitle.svelte'
    import BodyText from './components/BodyText.svelte'

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
                    case 'close': {
                        components.push({
                            component: Close,
                            props: {
                                label: element.label,
                            },
                        })
                        break
                    }
                    case 'link': {
                        components.push({
                            component: Link,
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
                    case 'textarea': {
                        components.push({
                            component: Textarea,
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
    <div class="text">
        <BodyTitle>{$prompt?.args.title}</BodyTitle>
        <BodyText>{$prompt?.args.body}</BodyText>
    </div>
    {#each $elements as component}
        <svelte:component
            this={component.component}
            on:complete={() => dispatch('complete')}
            on:cancel={() => dispatch('cancel')}
            {...component.props}
        />
    {/each}
</div>

<style>
    div {
        display: flex;
        flex-direction: column;
        gap: var(--space-m);
        gap: var(--space-l);
    }

    .text {
        gap: var(--space-s);
    }
</style>
